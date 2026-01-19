---
title: "SMTP Manual Testing: Telnet vs. Netcat Line Endings"
description: "Learn why SMTP interactions fail when switching from Telnet to Netcat. Discover the CRLF newline quirk and how to manually send escape sequences on macOS."
subtitle: ""
pubDate: "2026-01-17"
tags: ["blog", "nc", "telnet", "smtp", "computer-networking"]
publish: true
---

As a part of my commitment to 'getting cracked' in the face of AI, I'm brushing up on the fundamentals of networking with <a href="https://www.amazon.com/Computer-Networking-Top-Down-Approach-7th/dp/0133594149" target="_blank">Computer Networking: A Top-Down Approach: Kurose, James, Ross, Keith: 9780133594140: Amazon.com: Books</a>. I'm currently going through the chapter on Application Layer protocols. One of the protocols covered in the chapter is SMTP. Authors propose readers try and communicate with a SMTP server directly from the terminal.

## Setting up an SMTP Server

First thing we'll need is an SMTP server to send requests to. After some research I decided to go with `mailpit`. Lets run the container:

```bash
docker run -d \
--name=mailpit \
--restart unless-stopped \
-p 8025:8025 \
-p 1025:1025 \
axllent/mailpit
```

`mailpit` exposes the SMTP server at port `1025`. Lets test it:

```bash
❯ nc localhost 1025
# 220 456747c77a22 Mailpit ESMTP Service ready
```

## HELO, World

Seems to be working. Lets try issuing some commands:

```txt
HELO user
250 456747c77a22 greets user
MAIL FROM: <user@example.com>
250 2.1.0 Ok
RCPT TO: <you@example.com>
250 2.1.5 Ok
DATA
354 Start mail input; end with <CR><LF>.<CR><LF>
Subject: How are you?

How is it going?
.
# nothing happens...
```

Everything works, except I can't end the message. The end of the message is indicated by a line containing a single period i.e. the following sequence of characters `\r\n.\r\n`. What should follow is:

```txt
250 2.0.0 Ok: queued as ...
```

Piping the message sequence as a string works:

```bash
echo -ne "HELO user\r\nMAIL FROM:<user@example.com>\r\nRCPT TO:<you@example.com>\r\nDATA\r\nSubject: How are you?\r\n\r\nHow is it going?\r\n.\r\nQUIT\r\n" | nc -v localhost 1025
```

> I'm cheating a bit here by passing the `-ne` flags to echo. And if you know what they do, this should give you an idea about where this is all going.
>
> - `-n` means _no newline_, otherwise `echo` appends a newline character to the string
> - `-e` means _please interpret backslash escapes_, otherwise characters like `\n` are treated as literal '\\' and 'n' characters instead of Line Feed

We can see the email in the web interface at `http://localhost:8025/`:

![New email tag in MailPit web interface](/talking-to-smtp-telnet-vs-netcat/mailpit-smtp-20260116165457.png)

## `telnet` vs `nc` (netcat) for communicating with SMTP

The example given in the textbook uses `telnet`. `telnet` hasn't been available on MacOS since version 10.13 (High Sierra), so I opted for the available alternative `nc`. Is using `nc` instead of `telnet` really the culprit?

Turns out it is. In `telnet` pressing 'Enter' or 'Return' key automatically sends the `\r\n` sequence whereas in `nc` it sends `\n`. So with `nc` as far as the server is concerned we're simply sending new line characters so it sees it as the continuation of the body of the message.

What is happening here is this. `telnet` was specifically designed to handle NVT (Network Virtual Terminal) protocol. This protocol forces _any_ line end characters to be compliant with the Internet standard by translating them to `\r\n`. So if you hit Enter in your terminal and it sends `\n`, `telnet` will translate that to `\r\n`.

`nc`, on the other hand, will simply send bytes exactly as they are. Because on Unix and macOS `\n` is used as the new line character, `nc` is simply transmitting a literal `\n`.

Supposedly `-c` flag should solve the problem:

```bash
# from man nc
-c      Send CRLF as line-ending
```

I wasn't able to make it work on my machine. Passing `-c` to `nc` doesn't seem to make any difference. This might have something to do with how `zsh` handles ends of lines.

## The solution

So here are some ways to solve this problem:

- send formatted string with `printf` or `echo -ne`
- tell the terminal to not interpret the next character we type with `Ctrl + V` and then send `\r` manually with `Ctrl + M`

Here is what it looks like:

```txt
220 456747c77a22 Mailpit ESMTP Service ready
HELO user
250 456747c77a22 greets user
MAIL FROM: <user@example.com>
250 2.1.0 Ok
RCPT TO: <you@example.com>
250 2.1.5 Ok
DATA
354 Start mail input; end with <CR><LF>.<CR><LF>
Subject: How are you?

How is it going?^M
.^M
250 2.0.0 Ok: queued as 8ooop4VMjtjRiHgLMhEoYh
QUIT
221 2.0.0 456747c77a22 Mailpit ESMTP Service closing transmission channel
```
