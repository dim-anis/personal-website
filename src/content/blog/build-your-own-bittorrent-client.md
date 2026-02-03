---
tags: ["bittorrent", "p2p", "network-protocols"]
pubDate: 2026-02-03
description: "I decided to stop treating BitTorrent like a black box and started building my own. Here is a deep dive into how I tackled the Peer Wire Protocol, managed a lot of binary data, and finally downloaded that first file through code I wrote myself."
title: Build Your Own BitTorrent Client
---

_Note: I've included a lot of code snippets, but not all of the code. This guide is already very comprehensive. You can find the full implementation here <a href="https://github.com/dim-anis/bittorrent-client" target="_blank">here</a>._

## The Backstory

I've been using torrents since I was 12, mainly for Linux ISOs. Yet, up until this point I've only had a very vague idea of how the protocol works.

The best way to learn how something works is to build it, and that is why I decided to build my own BitTorrent client from scratch. While doing research I've stumbled on Allen Kim's <a href="https://allenkim67.github.io/programming/2016/05/04/how-to-make-your-own-bittorrent-client.html#introduction" target="_blank">How to make your own BitTorrent client</a> guide. It is a great starting point as it goes over the basic building blocks of the BitTorrent protocol explaining how the communication between you and the peers happens, the types of messages that exist within the protocol and shows you how to build those messages and how to parse responses from peers.

It isn't perfect though. This article was written almost 10 years ago and it shows - Node.js has evolved a lot since 2016. Some features that required third-party dependencies back then are now part of the core runtime (e.g. `BigInt` support).

But above all the code doesn't actually result in a working client without significant modifications. It contains several bugs and typos and some crucial parts such as piece verification and proper block handling at file boundaries are completely overlooked.

This project builds on that foundation by fixing these issues and completing the implementation. At least in as far as allowing you to actually download a torrent.

Before we proceed I suggest we familiarize ourselves with the somewhat confusing BitTorrent vocabulary.

**Key BitTorrent Terms**

- **BitTorrent**: Name of the protocol itself.
- **BitTorrent client**: What we're building in this guide, essentially a wrapper around the BitTorrent protocol (you might be familiar with GUI clients like <a href="https://v2.utorrent.com/" target="_blank">µTorrent</a>, <a href="https://www.qbittorrent.org/" target="_blank">qBittorrent</a>).
- **BitTorrent tracker** (server): Provides a list of files available for transfer and allows the client to find peer users to download the files from.
- `.torrent`: File containing information about a particular torrent.
- **torrenting**: The act of downloading and uploading data via BitTorrent.

## BitTorrent Protocol in a Nutshell

BitTorrent is a peer-to-peer file sharing protocol. Users can upload and download files from each other. The fact that there is no one central server that could limit bandwidth makes the downloads faster.

Here is roughly what we need to do in order to download a torrent:

- obtain a `.torrent` file and parse it to get the tracker URL (among other things)
- connect to the tracker URL specified in the `.torrent` file
- obtain a list of peers from the tracker
- request pieces from peers
- assemble the file/files from pieces and disconnect from the network (or stay connected and seed the files)

I'll try to follow the steps in the given order, but occasionally I will most likely have to take brief detours to explain the reasoning for my decisions.

## Getting the List of Peers

We need a `.torrent` file to obtain a list of peers. If you are reading this article than you probably already know where you can get a `.torrent` file. What I should mention, however, is that there are two ways to obtain a list of peers - through a `.torrent` file or a magnet URI, which is kind of like a `.torrent` file in a URI form. In this guide we'll be using a `.torrent` file, but just know that it isn't the only way.

### Parsing `.torrent`

`.torrent` files use the Bencode file format which is just a way to organize the data in a terse format. There is most likely a bencode parsing library in your language of choice. I'll be using <a href="https://www.npmjs.com/package/bencode" target="_blank">bencode - npm</a>.

Parsed `.torrent` is a dictionary. Read more about Bencode and the structure of the bencoded dictionary here <a href="https://wiki.theory.org/BitTorrentSpecification#Bencoding" target="_blank">BitTorrentSpecification - TheoryOrg</a>.

The two keys we are interested in are the `announce` and `announce-list`. `announce` key is a string containing the URL of the tracker. `announce-list` is an extension to the official BitTorrent specification and is a list of lists of strings that contain the URL of the tracker.

We'll also take note of the `info` key, which we'll later use to generate an `info_hash`. Another value that we generate on our side is `peer_id` which we'll use to identify our client on a BitTorrent network. We'll take a closer look at both later in the article.

### Connecting to the Tracker

Once we have all these pieces we're ready to connect to the tracker and request the list of peers. The tracker expects us to follow a <a href="https://www.bittorrent.org/beps/bep_0015.html" target="_blank">UDP Tracker Protocol</a>:

1. Send a connection request
2. Receive the connection response, parse it and extract the `connectionId`
3. Send an announce request (we use `connectionId` from above to build the request)
4. Receive the announce response and extract the list of peers

The `getPeers` method of the `TrackerClient` below follows the protocol to a T.

```ts
class TrackerClient {
  // some code omitted
  async getPeers(url: URL, torrent: any) {
    const connectResponse = await this.connect(url);
    let { connectionId } = parseConnResp(connectResponse);
    const announceResp = await this.announce(connectionId, url, torrent);
    return parseAnnounceResp(announceResp);
  }
}
```

Let's walk through this method line by line. We're sending the connection request first. `connectResponse` will contain `connectionId`. We parse the response and get the value we need. `connectionId` is sent with the `announce` request. What we receive back is an announce response which will contain, among other things, a list of peers we're looking for.

#### A Note on Buffers

When interacting with the tracker we use buffers of data instead of a more human readable format like `JSON`. This is done for performance and efficiency. It is a good idea to familiarize yourself with buffers if you've never worked with them since building a BitTorrent client is essentially an exercise in building and parsing buffers. <a href="https://allenkim67.github.io/programming/2016/05/17/nodejs-buffer-tutorial.html" target="_blank">Node.js Buffer Tutorial</a> is a nice and brief intro to buffers from Allen Kim.

Briefly a buffer is a container for raw bytes. If you create an empty buffer and allocate 16 bytes to it here what it'll look like:

```typescript
const buf = Buffer.alloc(16);

console.log(buf); // <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
```

Yes, all zeroes. It is an empty buffer.

You can write things to buffers:

```typescript
const buf = Buffer.alloc(16);
buf.write("hello, world", 0);

console.log(buf); // <Buffer 68 65 6c 6c 6f 2c 20 77 6f 72 6c 64 00 00 00 00>
```

Here we're writing the string `hello, world` to an empty buffer, starting at offset 0. As you can see the first 12 bytes of the buffer are no longer `00`. Conincindentally 12 is the length of the string `hello, world`. Now the first byte is `0x68` which is `01101000` in hexadecimal which is `104` in decimal and `104` maps to `h` in ASCII.

#### Build Connection Request

Here is what the connection request should look like according to <a href="https://www.bittorrent.org/beps/bep_0015.html" target="_blank">UDP Tracker Protocol</a>:

| Offset | Size           | Name           | Value         |
| ------ | -------------- | -------------- | ------------- |
| 0      | 64-bit integer | connection_id  | 0x41727101980 |
| 8      | 32-bit integer | action         | 0             |
| 12     | 32-bit integer | transaction_id | ?             |

Let's build our connection request. We're starting with an empty 16 byte long buffer. The first thing we write to it is a connection ID. It's value should be `0x41727101980` as specified in the <a href="https://www.bittorrent.org/beps/bep_0015.html" target="_blank">UDP Tracker Protocol</a>. Connection ID is followed by `action` which is 0 (connect) in this case. Finally we write a randomly generated 4 byte long `transaction_id`.

Here is the code:

```typescript
function buildConnReq() {
  const buf = Buffer.alloc(16);

  // connectionId
  const connId = (0x417n << 32n) | 0x27101980n;
  buf.writeBigUint64BE(connId, 0);
  // action
  buf.writeUInt32BE(0, 8);
  // transaction id
  const transactionId = crypto.randomBytes(4).readUint32BE(0);
  buf.writeUint32BE(transactionId, 12);

  return { transactionId, buf };
}
```

#### Send Connection Request

Let's now focus on sending the request. `connect` method calls `sendRequest` which accepts a `url`, our connection request buffer that we've just built and a `transactionId` and returns a `Promise` object. We store this `Promise`'s `resolve` and `reject` handlers in `pendingRequests` using `transactionId` as key. Then we send the request over UDP using `socket` connection.

One more thing worth mentioning here is that we drop requests if they aren't resolved after the specified timeout (15 seconds seems reasonable), assuming that the tracker is unavailable.

```typescript
class TrackerClient {
  // some code omitted
  sendRequest(
    url: URL,
    requestBuffer: Buffer<ArrayBuffer>,
    transactionId: number,
    timeoutMs = 15000,
  ): Promise<Buffer<ArrayBuffer>> {
    const { port = "6881", hostname } = url;

    return new Promise((resolve, reject) => {
      this.pendingRequests.set(transactionId, {
        resolve,
        reject,
      });

      this.socket.send(requestBuffer, Number(port), hostname);

      setTimeout(() => {
        if (this.pendingRequests.has(transactionId)) {
          this.pendingRequests
            .get(transactionId)
            ?.reject(new Error("connect timeout"));
          this.pendingRequests.delete(transactionId);
        }
      }, timeoutMs);
    });
  }

  connect(url: URL): Promise<Buffer<ArrayBuffer>> {
    const { buf: connReq, transactionId } = buildConnReq();
    return this.sendRequest(url, connReq, transactionId);
  }
}
```

We resolve the `Promise` when we receive a `connect` message response from the tracker and we delete the request from the `pendingRequests` map.

```typescript
class TrackerClient {
  // some code omitted
  setupSocketListeners() {
    this.socket.on("message", (msg, _) => {
      const transactionId = msg.readUint32BE(4);
      const handler = this.pendingRequests.get(transactionId);
      if (!handler) return;

      const type = respType(msg);

      try {
        if (type === "connect") {
          handler.resolve(msg);
        } else if (type === "announce") {
          handler.resolve(msg);
        }
      } catch (e) {
        this.socket.close();
        handler.reject(e);
      } finally {
        this.pendingRequests.delete(transactionId);
      }
    });

    this.socket.on("error", (err) => {
      for (const { reject } of this.pendingRequests.values()) {
        reject(err);
      }
      this.pendingRequests.clear();
    });
  }
}
```

The connection response contains a `connectionId`, which we'll use to build the announce request. We parse the connection response and extract the `connectionId`.

```typescript
function parseConnResp(res: Buffer<ArrayBuffer>) {
  return {
    action: res.readUInt32BE(0),
    transactionId: res.readUInt32BE(4),
    connectionId: res.readBigUint64BE(8),
  };
}
```

If previously we were writing to a buffer, then now we're reading from it. I told you - building a BitTorrent client is all about writing and reading buffers. Again, we're following the protocol here:

| Offset | Size           | Name           | Value                  |
| ------ | -------------- | -------------- | ---------------------- |
| 0      | 32-bit integer | action         | 0 (connect)            |
| 4      | 32-bit integer | transaction_id | <transaction_id_value> |
| 8      | 64-bit integer | connection_id  | <connection_id_value>  |

#### Build Announce Request

Building the announce request is slightly more code, but nothing we haven't done before:

```typescript
function buildAnnounceReq(
  connId: bigint,
  torrent: Uint8Array<ArrayBuffer>,
  port = 6881,
) {
  const buf = Buffer.allocUnsafe(98);

  // connectionId
  buf.writeBigUint64BE(connId, 0);
  // action (1 means "announce")
  buf.writeUInt32BE(1, 8);
  // transactionId
  const transactionId = crypto.randomBytes(4).readUint32BE(0);
  buf.writeUint32BE(transactionId, 12);
  // info hash
  torrentParser.infoHash(torrent).copy(buf, 16);
  // peerId
  util.genId().copy(buf, 36);
  // downloaded
  Buffer.alloc(8).copy(buf, 56);
  // left
  buf.writeBigUint64BE(BigInt(size(torrent)), 64);
  // uploaded
  Buffer.alloc(8).copy(buf, 72);
  // event
  buf.writeUInt32BE(0, 80);
  // ip address
  buf.writeUInt32BE(0, 84);
  // key
  crypto.randomBytes(4).copy(buf, 88);
  // num want
  buf.writeInt32BE(-1, 92);
  // port
  buf.writeUInt16BE(port, 96);

  return { buf, transactionId };
}
```

I'll omit showing the exact specification (again, you can find it <a href="https://www.bittorrent.org/beps/bep_0015.html" target="_blank">here</a>), yet even without referring to it you can see that there are quite a few more pieces we need to communicate to the tracker.

Crucially we're again attaching a randomly generated `transactionId` to be able to identify responses, `infoHash` to identify the torrent we want to receive peers for and a `peerId` to uniquely identify our client. All of these are generated by the client (us).

`infoHash` is a `sha-1` hash of the `info` field of the `.torrent` file.

```typescript
export function infoHash(torrent: any) {
  const info = bencode.encode(torrent["info"]);
  return crypto.createHash("sha1").update(info).digest();
}
```

`peerId` can be any random 20-byte string, but usually follows this <a href="https://www.bittorrent.org/beps/bep_0020.html" target="_blank">convention</a>.

```typescript
// id is generated once
let id: Buffer<ArrayBuffer> | null = null;

export function genId() {
  if (!id) {
    id = crypto.randomBytes(20);
    Buffer.from("-DA0001-").copy(id, 0);
  }

  return id;
}
```

Another piece that is torrent specific is the `left` field which is simply the size of the torrent file/files. This information is also available on the `.torrent` file. If the `files` field is present we're dealing with a multiple file torrent and we need to combine their sizes.

```typescript
// should probably handle BigInt if building a production ready torrent client
export function size(torrent: any): number {
  const size = torrent.info.files
    ? torrent.info.files.reduce((total, file) => (total += file.length), 0)
    : torrent.info.length;

  return size;
}
```

#### Send Announce Request

Sending the announce request is done the same way as with the connection request and now you understand why we're checking for `connect` and `announce` when listening for socket messages.

Here is how we parse the response:

```typescript
function parseAnnounceResp(res: Buffer<ArrayBuffer>) {
  function group(iterable: Buffer<ArrayBuffer>, groupSize: number) {
    let groups: Buffer<ArrayBuffer>[] = [];
    for (let i = 0; i < iterable.length; i += groupSize) {
      groups.push(iterable.subarray(i, i + groupSize));
    }
    return groups;
  }

  return {
    action: res.readUInt32BE(0),
    transactionId: res.readUInt32BE(4),
    interval: res.readUInt32BE(8),
    leechers: res.readUInt32BE(12),
    seeders: res.readUInt32BE(16),
    peers: group(res.subarray(20), 6).map((address) => {
      return {
        ip: [...address.subarray(0, 4)].join("."),
        port: address.readUInt16BE(4),
      };
    }),
  };
}
```

As you may expect we get a variable number of peers - some torrents are more popular, some are less. Peer addresses start from offset 20 and come in groups of 6 bytes. We `.subarray()` the part of the buffer that starts from offset 20 and group this chunk into groups of 6 bytes, iterate over each of these groups, split them into `ip` and `port` and map them to an object of type `{ip: string, port: number}`.

Voilà, we've got the peers!

We might have more than one tracker available so we want to repeat this for each of them. At this point I should say that there are both `UDP` and `HTTP` trackers and the latter would be handled differently. In this guide I'm only working with `UDP` trackers.

```typescript
async function getAllPeers(torrent: Buffer<ArrayBufferLike>): Promise<
  {
    status: "fulfilled" | "rejected";
    value: { peers: { ip: string; port: number }[] };
  }[]
> {
  const socket = dgram.createSocket("udp4");
  const client = new TrackerClient(socket);

  client.setupSocketListeners();

  const decoder = new TextDecoder();
  const urls = torrent["announce-list"]
    .map(([tracker]) => new URL(decoder.decode(tracker)))
    // only handle udp trackers for now
    .filter((url) => url.protocol === "udp:");
  const promises = urls.map((url) => client.getPeers(url, torrent));

  return Promise.allSettled(promises).finally(() => socket.close());
}
```

This function filters for UDP trackers, maps them to `getPeers()` promises, and awaits their completion using `Promise.allSettled()`. This ensures that a single failed tracker doesn't interrupt the discovery process for others.

We close the socket in the `finally` close because we've got what we needed from the tracker and this connection can be safely closed.

## Downloading from Peers

Just like I did earlier I'd like to start with giving an overview of what we'll try to accomplish in the next part of the guide. We've just received the list of peers and next we want to:

- Create a `TCP` connection with each peer
- Exchange some messages following the protocol and start requesting `pieces` of files
- Once a `piece` is downloaded we verify it's hash
- If the hash is valid we write the `piece` to disk, otherwise we reject it and try downloading it again

**What are pieces?**

> Torrent files are split into 32KB to 16MB pieces which we later assemble into a whole video, picture, executable or whatever it is you're trying to download. The exact piece size is specified in the torrent file and we will be using this value later.

Now onto downloading from peers. `Promise.allSettled()` resolves with an array of `fulfilled` or `rejected` results for each promise. `fulfilled` promises will have a `data` field containing the peers and the rejected promises will have a `reason` field containing the reason for rejection.

```typescript
export default async (torrent: any, downloadDir = "downloads") => {
  const peers = await getAllPeers(torrent);
  const availablePeers = peers.flatMap((res) =>
    res.status === "fulfilled" ? res.value.peers : [],
  );

  // const fileHandler = new FileHandler(torrent.info, downloadDir);
  // const pieces = new PieceManager(torrent, fileHandler);

  availablePeers.forEach((peer) => download(peer, torrent, pieces));
};
```

I'm iterating over the results and filtering only the `fulfilled` ones and then I'm spreading the `peers` arrays into a single array named `availablePeers`. I am then creating a connection with each of them. The more peers you connect to the faster you can download your files.

We're going to ignore the `PieceManager` and the `FileHandler` for now and focus on the `download` function.

```typescript
function download(
  peer: Peer,
  torrent: Buffer<ArrayBufferLike>,
  pieces: PieceManager,
) {
  const socket = new net.Socket();

  socket.setTimeout(30000);

  socket.on("error", () => {
    console.log(`could not handshake with "${peer.ip}:${peer.port}"`);
  });
  socket.on("timeout", () => {
    console.log("connection timeout");
    socket.destroy();
  });

  socket.connect(peer.port, peer.ip, () => {
    socket.write(buildHandshake(torrent));
  });

  const queue = new BlockQueue(torrent);
  onWholeMessage(socket, (msg) =>
    msgHandler(msg, socket, pieces, queue, torrent),
  );
}
```

So far we've been using `UDP` to connect to the trackers, but we connect to peers over `TCP`. Inside of our `download` function we're creating a new `TCP` socket instance and connect to a peer.

Once the connection is established we send a `handshake` message as a part of the BitTorrent protocol.

### Handshake with a peer

Connection to the peer starts with a `handshake`, which is a required message and must be the first message transmitted by the client. `handshake` is just another binary message that is described by the BitTorrent protocol, we've done that before:

```typescript
function buildHandshake(torrent: Buffer<ArrayBufferLike>) {
  const buf = Buffer.alloc(68);
  // pstr length
  buf.writeUInt8(19, 0);
  // pstr
  buf.write("BitTorrent protocol", 1);
  // reserved
  buf.writeUInt32BE(0, 20);
  buf.writeUInt32BE(0, 24);
  // info hash
  infoHash(torrent).copy(buf, 28);
  // peer id
  utils.genId().copy(buf, 48);

  return buf;
}
```

<a href="https://wiki.theory.org/BitTorrentSpecification#Handshake" target="_blank">BitTorrentSpecification - Handshake</a> describes the handshake in detail. I'll just say that apart from the familiar `infoHash` and `peerId` we're also writing a string "BitTorrent protocol" which is called `pstr` (protocol string) and `pstrlen` which is the length of the `pstr` (19).

`handshake` is only one of the messages that can be exchanged with a peer. The full list includes: `keep-alive`, `choke`, `unchoke`, `interested`, `not interested`, `have`, `bitfield`, `request`, `piece`, `cancel` and `port`.

Almost all of these messages have the following structure:

```txt
<length prefix><message ID><payload>
```

`length prefix` is a 4-byte integer indicating the length of the message. `message ID` is a single byte used to indicate message ID (numbered 0-9, excluding the `keep-alive`). The rest of the buffer is the `payload` and has a variable length, depending on the message.

There is nothing new about building these messages and I'm choosing not to include them in the article for the sake of brevity. Just know that you can find them in the <a href="https://github.com/dim-anis/bittorrent-client/blob/main/src/message.ts" target="_blank">source code</a>.

### Grouping Messages

You might've been wondering why prepend each message with it's length? Can't we just do something like `buffer.length()`? Turns out we can't and the reason for it is that the data doesn't necessarily come in whole messages. We receive a continuous stream of bytes instead and it is up to us (i.e. application layer) to divide that stream into messages. That is exactly why each message is prepended with it's length. Once you know the length of the incoming message you can start counting bytes and stop once you reach the expected length.

<img src="/build-your-own-bittorrent-client/tcp-message-acc.svg" alt="A string on its way from sender to receiver in 4 byte chunks">

Dotted blocks designate packets which are either in-flight or not yet sent, and the solid line block is the block that has already been received.

Of course in the real world a 12 byte string 'hello, world' would be sent in a single packet, but for the sake of this example lets imagine that the TCP packets can be at most 4 bytes in length. When we receive the first packet we read the first 4 bytes as an integer and see that it has a value of 12. This means that the message that will follow is 12 bytes long. In other words we shouldn't try to interpret the message until we accumulate all 12 bytes (+4 bytes taken by its length, so 16 bytes in total).

Let's now see how we can implement this in code:

```typescript
function onWholeMessage(
  socket: net.Socket,
  cb: (data: Buffer<ArrayBuffer>) => void,
) {
  let savedBuf = Buffer.alloc(0);
  let handshake = true;

  socket.on("data", (recvBuf: Buffer<ArrayBufferLike>) => {
    // write chunk to buf
    savedBuf = Buffer.concat([savedBuf, recvBuf]);

    let msgLength: number;

    while (true) {
      if (handshake) {
        msgLength = HANDSHAKE_LENGTH;
      } else {
        // length prefix is 4 bytes
        if (savedBuf.length < 4) break;

        const payloadSize = savedBuf.readUInt32BE(0);

        // handle Keep-Alive
        if (payloadSize === 0) {
          savedBuf = savedBuf.subarray(4);
          continue;
        }

        msgLength = payloadSize + 4;
      }

      if (savedBuf.length >= msgLength) {
        cb(savedBuf.subarray(0, msgLength));
        savedBuf = savedBuf.subarray(msgLength);
        handshake = false;
      } else {
        break;
      }
    }
  });
}
```

There is a lot to unpack here. First of all we're wrapping a `socket.on('data')` listener. We create two variables - `savedBuf` to write bytes we receive and `handshake` boolean to be able to differentiate between a handshake message and other types of messages.

We expect to receive the handshake message first and so we initialize it as `true`. This is just what BitTorrent protocol tells us.

Most of the action happens in the callback to `data` events. First we append the data that we receive to the current contents of the `savedBuf`. `msgLength` depends on the specific message we're receiving, except when we're dealing with a `handshake` message which has a fixed length `HANDSHAKE_LENGTH`. We read first 4 bytes of the message to get it's length. Once our `savedBuf` is larger than or of the same length as the `msgLength` we pass it to the callback function, update our `savedBuf` to the extra bytes that we wrote when writing the last chunk of the message and continue all over again.

Here is what I'd ask myself after looking at this code:

- Why break out of the loop if `savedBuf.length < 4`?
  **Answer**: `<length_prefix>` is a 4-byte integer. At this point the message is too short to be able to determine it's length, which means it's too short to do anything else with it so we keep building.
- What is up with `Keep-Alive`?
  **Answer**: `Keep-Alive` is a special kind of message with zero bytes, specified with the `<length_prefix>` set to zero. We essentially ignore it by setting `savedBuf` to `savedBuf.subarray(4)`.
- Why `msgLength = payloadSize + 4;`?
  **Answer**: `<length_prefix>` itself is not included into the length of the message, but it is included into the `savedBuf`. If we don't add these 4 bytes to the `msgLength` then the `savedBuf.length >= msgLength` check will fail, even though the whole message is already in the buffer.

### Parsing Peer Messages

Here are the messages we expect to receive from the peer:

```typescript
function msgHandler(
  msg: Buffer<ArrayBuffer>,
  socket: net.Socket,
  pieces: PieceManager,
  queue: BlockQueue,
  fileHandler: FileHandler,
  torrent: any,
) {
  if (isHandshake(msg, torrent)) {
    socket.write(buildInterested());
  } else {
    const message = parseMessage(msg);

    switch (message.type) {
      case "choke":
        chokeHandler(socket);
        break;
      case "unchoke":
        unchokeHandler(socket, pieces, queue);
        break;
      case "have":
        haveHandler(socket, pieces, queue, message.pieceIndex);
        break;
      case "bitfield":
        bitfieldHandler(socket, pieces, queue, message.bitfield);
        break;
      case "piece":
        pieceHandler(socket, pieces, queue, fileHandler, message);
        break;
    }
  }
}
```

Before we can handle the message we must first parse it. `parseMessage` receives a whole message and identifies its type by reading the first few bytes. We know from `onWholeMessage` that the first 4 bytes describe the length. The 5th byte gives us the `id`. Not all messages contain a `payload`, but for the ones that do we save it into a variable so that we can later pass it along with the rest of the parsed data.

```typescript
export function parseMessage(msg: Buffer<ArrayBuffer>): Message {
  const id = msg.length > 4 ? msg.readUInt8(4) : -1;
  const size = msg.length > 4 ? msg.readUint32BE(0) : 0;
  let payloadBuffer = msg.length > 5 ? msg.subarray(5) : Buffer.alloc(0);

  let baseMessage = { id, size };

  if (id === 0) {
    return { ...baseMessage, type: "choke" };
  } else if (id === 1) {
    return { ...baseMessage, type: "unchoke" };
  } else if (id === 4) {
    return {
      ...baseMessage,
      type: "have",
      pieceIndex: payloadBuffer.readUint32BE(0),
    };
  } else if (id === 5) {
    return {
      ...baseMessage,
      type: "bitfield",
      bitfield: payloadBuffer,
    };
  } else if (id === 7) {
    return {
      ...baseMessage,
      type: "piece",
      index: payloadBuffer.readUint32BE(0),
      begin: payloadBuffer.readUint32BE(4),
      block: payloadBuffer.subarray(8),
    };
  } else {
    return {
      ...baseMessage,
      type: "unknown",
      buffer: payloadBuffer,
    };
  }
}
```

Our client won't be implementing the seeding functionality, so I only care about select messages and parse the other ones as 'unknown' (you could also simply ignore them). You can find message types in the <a href="https://github.com/dim-anis/bittorrent-client/blob/main/src/message.ts" target="_blank">source code</a>.

### The Unchoking Sequence

#### Validating the Handshake Message

Recall, that the first message we've sent to the peer was a `handshake` message. Naturally we should be expecting some kind of response. This response is a `handshake` message from the peer which is identical to the `handshake` message we have sent to the peer earlier.

We need to make sure that the `handshake` message follows the protocol (e.g. starts with the correct `pstr length` and the `pstr` itself is "BitTorrent protocol"). One last sanity check is to make sure that the data we're about to start requesting is actually the data we want. We can do that by comparing the `info hash` that the peer has sent us in the `handshake` message to the `info hash` of our `.torrent`. Needless to say they must be identical.

```typescript
function isHandshake(msg: Buffer<ArrayBuffer>, torrent: any) {
  const isCorrectLength = msg.length === msg.readUint8(0) + 49;
  const isCorrectPstr = msg.toString("utf8", 1, 20) === "BitTorrent protocol";
  const ourInfoHash = infoHash(torrent);
  const theirInfoHash = msg.subarray(28, 48);
  const isInfoHashValid = ourInfoHash.equals(theirInfoHash);

  return isCorrectLength && isCorrectPstr && isInfoHashValid;
}
```

`handshake` message is immediately followed by the `bitfield` message.

#### Bitfield Message

What follows the completion of this handshake dance is the `bitfield` message from the peer. This message has an `id=5`, it informs our client about the pieces this particular peer can offer us and has the following structure:

```text
bitfield: <len=0001+X><id=5><bitfield>
```

The most interesting part of this message is the `bitfield` part which is represented by a... bitfield. Here is what it may look like:

```txt
<30 F7>
```

But it is better to look at it in binary:

```text
<0011 0000 1111 0111>
```

This hypothetical torrent file consists of 16 pieces which is also the number of bits in the example. We read it from left to right and the presence of a piece is indicated by a set bit (1). After looking at this example we can say that the peer has pieces number 3, 4, 9, 10 and so on.

#### Moving the Peer State to Interested

We're almost ready to start requesting data from the peer! We can't just do it, though. The client first must tell the peer that it wants to download the pieces that the peer has. This is one of the requirements that must be satisfied before the client can start downloading data.

The second requirement is that our client is `unchoked`. The terminology here is slightly confusing, but essentially our client is in the `choked` state by default. By informing the peer that we're interested in the pieces it has, we're telling it to consider `unchoking` us. This `choke`/`unchoke` mechanism is what BitTorrent uses to enforce reciprocity between peers and prevent free-riding.

Imagine a peer that intentionally sends an empty `bitfield`, effectively saying that it has nothing to contribute to the network. Instead, it only leeches from other peers. It would be beneficial to have a mechanism to punish such behavior; this is what choking does. I now realize **punish** may be a bit of a strong word. 'Punishment' here is simply the refusal to upload until the peer proves it has something to offer.

#### Unchoke Means Go

Once we've sent the `interested` message, we can expect an `unchoke` message, which is a green light for us to start requesting data:

```typescript
function unchokeHandler(
  socket: net.Socket,
  pieces: PieceManager,
  queue: BlockQueue,
) {
  queue.choked = false;
  requestPiece(socket, pieces, queue);
}
```

### From Pieces to Blocks

It is time we talk about the pieces again and more specifically about how we're going to manage downloading them.

Once again, in BitTorrent files are broken down into pieces of equal length (except for the last piece) and these pieces are what peers download from each other. Let's take a look at the structure of the `piece` message:

```txt
piece: <len=0009+X><id=7><index><begin><block>
```

What we're interested in here is the last part of the payload `<block>`. Even though the message is called `piece` the payload that it carries is called `block`. So the actual transmission units are blocks and not pieces. Somewhat confusing, if you ask me, and whenever things start to seem confusing I always draw:

<img src="/build-your-own-bittorrent-client/file-piece-block.svg" alt="File divided into chunks divided into blocks">

Pieces are further subdivided into blocks of equal length (16KB). Thats why the rest of the payload includes `index` (piece index) and `begin` (offset within the piece) parts - so that we can assemble them later on into pieces.

To sum up, here is what we need to do:

1. Download blocks
2. Assemble blocks into pieces
3. Assemble pieces into files

#### Downloading Blocks

We can learn which pieces a peer has by looking at the `bitfield` message which it sends immediately after the `handshake` message:

```typescript
function bitfieldHandler(
  socket: net.Socket,
  pieces: PieceManager,
  blockQueue: BlockQueue,
  bitfield: Buffer<ArrayBuffer>,
) {
  const queueEmpty = blockQueue.length() === 0;

  for (let i = 0; i < bitfield.length; i++) {
    const byte = bitfield[i];
    for (let j = 0; j < 8; j++) {
      const pieceIndex = i * 8 + j;
      if (byte & (1 << (7 - j))) {
        blockQueue.queue(pieceIndex);
      }
    }
  }

  if (queueEmpty) {
    requestPiece(socket, pieces, blockQueue);
  }
}
```

We'll look at the `BlockQueue` very shortly, but lets first focus on the nested for loop.

This is that same `bitfield` message example I showed you earlier. The payload is an array of bytes. Each byte is 8 bits and therefore represents 8 pieces of the torrent. We compare each bit of every byte to the mask `byte & (1 << (7 - j))` and if the bit is set (1) then we queue the piece for download.

This may take some time to grok if you're not comfortable with bit manipulation. Lets take a look at a concrete example. Say we're:

- on the first iteration of the outer loop (looking at the first byte, `i = 0`)
- on the third iteration of the inner loop `j = 2`
- checking if the 3rd bit of the current byte is set `byte & (1 << (7 - 2))` (indexing from the leftmost bit)

Then we have:

```txt
  1110 0100  (The Byte)
& 0010 0000  (The Mask)
-----------
  0010 0000  (Result is > 0, so Piece 3 is PRESENT)
```

#### Block Queue

The `BlockQueue` is where we store the pieces available for download from a peer. If a peer has a piece we add it to the `BlockQueue` by breaking it down into a number of piece blocks:

```typescript
export type PieceBlock = {
  index: number;
  begin: number;
  length: number;
};

export class BlockQueue {
  #torrent: any;
  #queue: PieceBlock[];
  choked: boolean;
  requestCount: number;

  constructor(torrent: any) {
    this.#torrent = torrent;
    this.#queue = [];
    this.choked = true;
    this.requestCount = 0;
  }

  queue(pieceIndex: number) {
    const nBlocks = blocksPerPiece(this.#torrent, pieceIndex);
    for (let i = 0; i < nBlocks; i++) {
      const pieceBlock: PieceBlock = {
        index: pieceIndex,
        begin: i * BLOCK_LEN,
        length: blockLength(this.#torrent, pieceIndex, i),
      };

      this.#queue.push(pieceBlock);
    }
  }

  // some code omitted
}
```

We can find out exactly how many piece blocks are in a particular piece by dividing its size by the size of the block (16KB). `blocksPerPiece` takes care of that:

```typescript
export const BLOCK_LEN = Math.pow(2, 14);

export function pieceLength(torrent: any, pieceIndex: number) {
  const totalLength = size(torrent);
  const pieceLength = torrent.info["piece length"];

  const lastPieceLength = totalLength % pieceLength;
  const lastPieceIndex = Math.floor(totalLength / pieceLength);

  return pieceIndex === lastPieceIndex ? lastPieceLength : pieceLength;
}

export function blocksPerPiece(torrent: any, pieceIndex: number) {
  const pLength = pieceLength(torrent, pieceIndex);
  return Math.ceil(pLength / BLOCK_LEN);
}

export function blockLength(
  torrent: any,
  pieceIndex: number,
  blockIndex: number,
) {
  const pLength = pieceLength(torrent, pieceIndex);

  const lastBlockLength = pLength % BLOCK_LEN;
  const lastBlockIndex = Math.floor(pLength / BLOCK_LEN);

  return blockIndex === lastBlockIndex ? lastBlockLength : BLOCK_LEN;
}
```

I've mentioned that torrent files are divided into pieces of equal size and that these sizes are powers of two. As you can imagine files aren't always a perfect multiple of a piece size. The last piece contains the remainder, e.g. it is typically smaller. Same applies to blocks as they're also powers of two. Both `pieceLength` and `blockLength` account for that.

#### Pipelining and Parallelism

Imagine the first peer we connect to has all of the pieces. We should download all of them immediately. Sounds like a dream, except it goes directly against the idea of peer-to-peer networks. Efficient load distribution between peers is what makes BitTorrent and other similar networks fast and resilient. By downloading all pieces from just one single peer we lose both.

We need to somehow prevent that from happening. The idea that Allan proposed in his original guide I've referred to earlier is simple and straightforward - request one piece at a time and only request a new piece when we get the response. This way we'll be requesting from a variety of peers and the ones with higher bandwidth will come back for more blocks more often than the slow peers.

While it solves the parallelism problem, this 'stop-and-wait' approach won't let us realize the full potential of the bandwidth between the client and the peer, resulting in very low download speeds. If we wait for each request to fulfill we spend way too much time on round trips, much more than it takes to download a single block. So apart from downloading from multiple peers at the same time, we also want to keep a number of pending requests in a backlog for each peer, i.e. pipelining.

<img src="/build-your-own-bittorrent-client/pipeline-trucks.svg" alt="Comparison of network efficiency: Top shows one truck on a 4-lane road (low usage); bottom shows 12 trucks filling all lanes (high parallelism and pipelining)" title="Parallelism and Pipelining: Single vs. Multi-Lane Data Transfer">

A typical torrent client allows around 5 to 10 pending requests per connection, while newer clients use adaptive queue size. Increasing the value of outgoing requests is likely to improve performance up to a point, but eventually this 'pipe' becomes congested and blocks get dropped. Another reason to limit the number of outgoing requests is to avoid requesting stale data. If you send 100 requests at once, the later ones might be fulfilled by other peers before the original peer can even respond.

With that said I'm going with 10 outstanding requests:

```typescript
const MAX_PIPELINE = 10;

function requestPiece(
  socket: net.Socket,
  pieces: PieceManager,
  blockQueue: BlockQueue,
) {
  if (blockQueue.choked) {
    return null;
  }

  while (blockQueue.length() && blockQueue.requestCount < MAX_PIPELINE) {
    const pieceBlock = blockQueue.deque() as PieceBlock;
    if (!pieces.isBlockComplete(pieceBlock)) {
      blockQueue.requestCount++;
      socket.write(buildRequest(pieceBlock));
      pieces.markBlockRequested(pieceBlock);
    }
  }
}
```

`requestPiece` is called in `bitfield`, `piece` and `have` message handlers. We've seen `bitfield` and `piece`, but `have` is new. This message is sent when a peer finishes downloading a piece and is ready to share it with other peers.

Whenever `requestPiece` is called we check if we're choked and if yes we simply return, otherwise we check if there are still jobs in the queue and if the number of outstanding requests is lower than the `MAX_PIPELINE` limit. We then deque a piece block from the queue, increment the request count for the connection and send a `request` message.

Here is what what this message looks like:

```typescript
export function buildRequest(payload: PieceBlock) {
  const buf = Buffer.alloc(17);
  // length
  buf.writeUInt32BE(13, 0);
  // id
  buf.writeUInt8(6, 4);
  // piece index
  buf.writeUInt32BE(payload.index, 5);
  // begin
  buf.writeUInt32BE(payload.begin, 9);
  // length
  buf.writeUInt32BE(payload.length, 13);

  return buf;
}
```

You'll also notice that we've marked the block as requested. This, however, is handled by the `PieceManager` which we'll focus on next.

#### Managing Pieces

If you look back at the `download` function you'll see that in contrast to `BlockQueue` we maintain _one_ global instance of `PieceManager` class to manage pieces. Lets take a closer look at this class:

```typescript
class Piece {
  state: "idle" | "inProgress" | "finished";
  blocks: BlockState[];
  buffer: Buffer<ArrayBuffer>;

  constructor(blocks: BlockState[], pieceLength: number) {
    this.state = "idle";
    this.blocks = blocks ? blocks : [];
    this.buffer = Buffer.alloc(pieceLength);
  }
}

export class PieceManager {
  pieces: Piece[];
  fileHandler: FileHandler;
  #torrent: any;

  constructor(torrent: any, fileHandler: FileHandler) {
    this.#torrent = torrent;
    this.fileHandler = fileHandler;
    this.pieces = [];
    const nPieces = torrent.info.pieces.length / 20;
    for (let i = 0; i < nPieces; i++) {
      const pl = pieceLength(this.#torrent, i);
      this.pieces.push(
        new Piece(new Array(blocksPerPiece(torrent, i)).fill(0), pl),
      );
    }
  }
  // some code omitted
}
```

First, we initialize the `pieces` array to the number of pieces in the torrent. Where do we find the total number of pieces you ask? We have the `piece length` property on the `.torrent` file so we could theoretically divide the torrent size by `piece length` to get the total number of pieces, but we'd have to be careful with the remainder (remember the last piece isn't necessarily the same length as the rest of the pieces).

Instead we can use a much more reliable `torrent.info.pieces` which is a string of 20-byte long hashes of all of the pieces concatenated together. These are the same hashes that we'll be using later to verify the pieces that we've downloaded. Thus, to get the total number of pieces we can simply divide the length of this string by 20.

Each piece is either waiting to be downloaded, is currently being downloaded or is already downloaded which is represented by the `state` property. Each piece also has an associated array of piece blocks. `buffer` contains the bytes of the piece. We'll use it to verify the hash of the downloaded piece against the hash in the `.torrent` file.

```typescript
export class PieceManager {
  // some code omitted
  markBlockRequested(pieceBlock: PieceBlock): void {
    const blockIndex = pieceBlock.begin / BLOCK_LEN;
    this.pieces[pieceBlock.index].blocks[blockIndex] = BlockState.inProgress;
  }
  // some code omitted
```

Bits flip and checksums fail, peers constantly enter and exit the swarm, in other words there are many opportunities for a poor little block to arrive damaged or even not arrive at all. For this reason we need to make sure we're able to re-request blocks if needed and that is exactly why we mark them requested and don't automatically assume that if a block is requested it is necessarily downloaded. You could also keep two bitmaps: one for requested and one for downloaded pieces. I might refactor my implementation later.

`markBlockFinished` is where most of the heavy lifting happens.

```typescript
export class PieceManager {
  // some code omitted

  markBlockFinished(pieceBlock: PieceMessage): void {
    if (this.pieces[pieceBlock.index].state === "finished") {
      return;
    }

    const blockIndex = pieceBlock.begin / BLOCK_LEN;
    this.pieces[pieceBlock.index].blocks[blockIndex] = BlockState.finished;
    const blockLen = pieceBlock.block.length;

    const pieceBuffer = this.pieces[pieceBlock.index].buffer;
    pieceBlock.block.copy(pieceBuffer, pieceBlock.begin, 0, blockLen);

    if (this.isPieceComplete(pieceBlock.index)) {
      if (!this.isHashValid(pieceBlock.index)) {
        this.resetPiece(pieceBlock.index);
        return;
      }

      this.pieces[pieceBlock.index].state = "finished";
      this.fileHandler.writePieceToDisk(pieceBlock.index, pieceBuffer);

      // clear buffer after writing piece to disk
      this.pieces[pieceBlock.index].buffer = Buffer.alloc(0);
    }
  }

  isBlockComplete(pieceBlock: PieceBlock) {
    const blockIndex = pieceBlock.begin / BLOCK_LEN;
    return (
      this.pieces[pieceBlock.index].blocks[blockIndex] === BlockState.finished
    );
  }

  isTorrentComplete(): boolean {
    return this.pieces.every((piece) => piece.state === "finished");
  }

  isPieceComplete(pieceIndex: number) {
    return this.pieces[pieceIndex].blocks.every(
      (block) => block === BlockState.finished,
    );
  }

  resetPiece(pieceIndex: number) {
    this.pieces[pieceIndex].state = "idle";
    this.pieces[pieceIndex].blocks.fill(BlockState.idle);
  }

  isHashValid(pieceIndex: number): boolean {
    const hash = crypto.createHash("sha1");
    const pieceBuffer = this.pieces[pieceIndex].buffer;
    hash.update(pieceBuffer);
    const targetHash = this.getPieceHash(pieceIndex);
    const calculatedHash = hash.digest();

    return calculatedHash.equals(targetHash);
  }

  getPieceHash(pieceIndex: number) {
    const hashLength = 20;
    const startIndex = pieceIndex * hashLength;
    const endIndex = startIndex + hashLength;
    return this.#torrent.info.pieces.subarray(startIndex, endIndex);
  }
}
```

`markBlockFinished` accepts `PieceMessage` which contains the actual block data:

```typescript
interface PieceMessage extends BaseMessage<"piece"> {
  index: number;
  begin: number;
  block: Buffer<ArrayBuffer>;
}
```

We mark block as finished. Then we write this block's data to the corresponding piece's buffer. After that we check if we've downloaded all of the blocks of the piece and if yes, we verify it's hash. If all is good we mark piece as downloaded and write it to disk.

Other notable methods are `getPieceHash` and `isHashValid`. I think they're pretty self-explanatory, but I'll just mention that if our hash verification fails we need to reset the entire piece and therefore all of its blocks, so that they can be requested again.

`markBlockFinished` is called in `piece` message handler. `piece` message is the message that contains the actual block data for the block we've requested. This is also where we can decrement the outstanding request count of the connection.

```typescript
function pieceHandler(
  socket: net.Socket,
  pieces: PieceManager,
  blockQueue: BlockQueue,
  pieceResp: PieceMessage,
) {
  blockQueue.requestCount--;
  pieces.markBlockFinished(pieceResp);

  if (pieces.isTorrentComplete()) {
    pieces.finalizeDownload();
    socket.end();
    console.log("Download finished");
  } else {
    requestPiece(socket, pieces, blockQueue);
  }
}
```

If the block was the last block of the last pieces we needed to download our torrent is complete. This means that after writing the block to disk we can close file descriptors, close connections and call it a day.

## Writing Pieces to Disk

One notable omission in Allen's guide is that it assumes you are downloading a single-file torrent. In reality, that is rarely the case. Things actually get a lot more interesting if your torrent contains multiple files. Interesting or complicated, whatever you prefer.

### Single File Mode vs Multiple File Mode

Depending on whether the torrent you're downloading is a single file or a mutliple file the `info` dictionary will contain the following information:

```typescript
type SingleFileTorrent = {
  name: string;
  length: number;
  md5sum?: string;
};

type MutlipleFileTorrent = {
  name: string;
  files: [
    {
      length: number;
      path: string[]; // ["dir1", "dir2", "file.ext"]
      md5sum?: string;
    },
  ];
};
```

### Single File Torrents

Writing single file torrents to disk is pretty straightforward. Recall, that even though we request blocks, we later assemble them into pieces to verify their hashes. This verified chunk of data is what we write to disk. Each piece has an `index` and a `length`. Having all of that data we can calculate the `pieceStart` offset and write it to disk like so:

```typescript
const pieceStart = pieceIndex * pieceLength;
fs.writeSync(file, verifiedBuffer, 0, verifiedBuffer.length, pieceStart);
```

### Mutliple File Torrents

Here is a single file torrent:

```text
< ... 21 fe 31 43 72 65 61 74 65 64 20 77 69 74 68 ... >
```

And here is a multiple file torrent:

```text
< ... 65 6e 64 2e 0a 48 65 6c 6c 6f 2c 20 77 6f 72 ... >
```

As you can see, there are no spaces, no gaps of any kind between files. Just bytes all the way.

A torrent is a concatenation of file pieces, a sequence of bytes if you will. This holds true even if your torrent contains multiple files. There is no explicit separation between the files and it is your job to find where one file ends and another begins. The fact that this sequence of bytes is split into an arbitrary number of pieces also means that the same piece can contain both the last bytes of one file and the first bytes of another.

Thats why writing a multiple file torrent to disk is a bit more involved. When you're handed a piece you have to figure out which file this piece belongs to (of course to actually assemble a piece you have to go through a similar dance with blocks). It is also possible that the same piece belongs to more than one file.

Lets see how I handle writing to disk in `FileHandler`:

```typescript
type File = {
  fd: number;
  size: number;
  sizeWritten: number;
  byteRange: [number, number];
};

export class FileHandler {
  pieceLength: number;
  files: File[] = [];

  constructor(torrentInfo: any, downloadDir = "downloads") {
    this.pieceLength = torrentInfo["piece length"];

    const torrentRootDir = new TextDecoder().decode(torrentInfo.name);
    let currentOffset = 0;

    for (let i = 0; i < torrentInfo.files.length; i++) {
      const joinPath = torrentInfo.files[i].path
        .map((segment: Buffer<ArrayBuffer>) =>
          new TextDecoder().decode(segment),
        )
        .join("/");

      const { dir, base } = path.parse(joinPath);
      const fullDirPath = `${downloadDir}/${torrentRootDir}${dir ? `/${dir}` : ""}`;
      const filePath = `${fullDirPath}/${base}`;

      fs.mkdirSync(fullDirPath, {
        recursive: true,
      });

      const fd = fs.openSync(filePath, "w");
      const fileLength = torrentInfo.files[i].length;
      const startIndex = currentOffset;
      const endIndex = currentOffset + fileLength;

      this.files.push({
        fd,
        size: endIndex - startIndex,
        sizeWritten: 0,
        byteRange: [startIndex, endIndex],
      });

      currentOffset += fileLength;
    }
  }
}
```

In the constructor I'm recreating the torrent folder and file structure based on the information provided by the `path` fields of the `files` array. For each file I also calculate `size` and `byteRange`. `byteRange` is an array of two numbers, containing the `fileStart` and `fileEnd` offsets. I also open files with write priviledges for each of the files I'm about to download and pass the file descriptors to `File` objects.

Now, whenever I'm ready to write a piece to disk I can look at it's `pieceStart` and `pieceEnd` offsets, check if they fall within a files offsets and if they do I know this piece belongs to this particular file. The only thinng left to do before we can write piece to disk is to check if it overlaps multiple files. Here is the complete `writePieceToDisk` method:

```typescript
class FileHandler {
  writePieceToDisk(pieceIndex: number, verifiedBuffer: Buffer<ArrayBuffer>) {
    const pieceStart = pieceIndex * this.pieceLength;
    const pieceEnd = pieceStart + verifiedBuffer.length;

    for (const file of this.files) {
      const [fileStart, fileEnd] = file.byteRange;

      if (pieceStart < fileEnd && pieceEnd > fileStart) {
        const overlapStart = Math.max(pieceStart, fileStart);
        const overlapEnd = Math.min(pieceEnd, fileEnd);

        const bufferOffset = overlapStart - pieceStart;
        const writeLength = overlapEnd - overlapStart;
        const fileOffset = overlapStart - fileStart;

        file.sizeWritten += writeLength;

        fs.writeSync(
          file.fd,
          verifiedBuffer,
          bufferOffset,
          writeLength,
          fileOffset,
        );

        this.logProgress();
      }
    }
  }
}
```

In my `piece` handler I check whether the torrent is complete and if it is I call `PieceManager`'s' `finalizeDownload` which calls `closeDescriptors` on the `FileHandler`.

```typescript
class FileHandler {
  // some code omitted

  closeDescriptors() {
    for (const file of this.files) {
      try {
        fs.closeSync(file.fd);
      } catch (error) {}
    }
  }
}
```

And thats it! We now have a working BitTorrent client that actually allows you to download torrents, including multi-file torrents. Test it on your totally legal Linux ISOs.

P.S. This client only supports UDP trackers, doesn't support magnet links and it only downloads (no uploads). It is better to test it with a public tracker, where choking isn't as strictly enforced (or not enforced at all).

## Bonus: Visualizing Progress

I've written some code to display current download progress. This function is called on every piece write to disk through `FileHandler`s `.logProgress()`.

```typescript
const barSettings = {
  width: 100,
  filledChar: "#",
  emptyChar: "-",
};

export function showProgressBar(totalItems: number, downloadedItems: number) {
  const percentage = Math.floor((downloadedItems / totalItems) * 100);
  const filled = Math.floor((percentage / 100) * barSettings.width);
  const empty = barSettings.width - filled;
  const bar = `[${barSettings.filledChar.repeat(filled)}${barSettings.emptyChar.repeat(empty)}] ${percentage}%`;

  process.stdout.write("\r");
  process.stdout.write(bar);
}
```
