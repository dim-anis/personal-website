---
title: "Building a Keyboard-Driven Development Environment"
description: "One of the single most powerful boosters for my productivity as a developer was ditching the mouse. In this article I talk about how and why a keyboard driven development approach can make you a more productive and happier developer."
subtitle: ""
pubDate: "Mar 22 2024"
updatedDate: "Mar 22 2024"
tags: ["tools", "productivity", "macos", "vim"]
publish: false
---

After switching to [Neovim](https://neovim.io/) as my primary code editor and realizing the benefits of being able to manipulate code without ever touching the pointing device I started asking myself if the same keyboard-centric workflow can be achieved outside of the editor. Turns out it is possible and there are plenty of apps, tools and extensions built with heavy keyboard shortcut use in mind.

In this article I will talk about why and how to migrate to a more keyboard centric workflow. Towards the end I'll share a list of helpful tools that greatly enhance my productivity and, more importantly, make the process of working a lot more fun.

## Why?

But why, you may ask? Why would I give up using the mouse? I love using my mouse. I love the clickety-click sounds it makes. And that's a totally fair point. To be clear I'm not arguing that you should throw away the mouse or stop using the touchpad for good. It is the right tool for a significant number of tasks. Besides there are tons of apps that are at best inconvenient and at worst simply unusable without a pointing device (AutoCAD or Photoshop come to mind).

My main argument is that you should consider a more keyboard oriented workflow because it can make all of these hours you spend in front of your computer more fulfilling and fun while at the same time improving your productivity.

I write for devs primarily. If you're not one - congratulations, looks like you might be able to keep your job a little longer until our AI overlords completely take over. All jokes aside, if you too primarily work with text you will still find most of the advice applicable. Here are some reasons to at least consider a keyboard oriented workflow.

### State of Flow

There is no better feeling than being in the flow state. One of the largest obstacles to reaching this state is losing focus. In fact being able to maintain an intense focus is the most important requirement in reaching flow, everything else stems from it.

What happens when you're in your editor and let's say you want to go to a definition of a function. You might perform the following set of steps:

1. Reach for the mouse or touchpad
2. Navigate the cursor to the function
3. Right click the symbol
4. Find 'Go to definition'
5. Click 'Go to definition'

Compare this to a keyboard-first workflow:

1. `gd` in Neovim with telescope and you're there (if your cursor is on the symbol)

How many more opportunities to lose focus did you count in the former approach?

<video loop="true" muted="true" controls='true' title="go to definition in vscode vs neovim" src="./../../../public/building-a-keyboard-driven-development-environment/vscode-vs-vim-gd.mp4"></video>

> Yes, I have explicitly written out some steps that could be counted as parts of one for a more impressive 'wow' effect, but still. Don't forget you also have to navigate back to the keyboard and make sure you've placed your fingers on the home row, while in the latter case the fingers had to travel at most a couple of keys. And I'm not even talking about navigating back to where you started from (psst, it's `Ctrl - O` in Vim).

Having that immediate feedback just feels so good. You feel more efficient. You ARE more efficient.

Every time you shift your attention from one task to another you're hurting your focus. Moving your hand from the keyboard to the mouse creates an opportunity to hurt the flow state. Moving your fingers away from the home row and then bringing them back takes a little bit of effort. This adds up. It also breaks that feeling of having your keyboard as an extension of your hands.

It's much easier to stay completely concentrated on a task if you can feel the feedback and see the results instantaneously. Keyboard-first interface allows to minimize the time between thinking of performing an action on your computer and actually doing it.

This of course is a question of practice. Someone might say that they can achieve similar results using a mouse or a touchpad as fast as you can with your shortcuts and that may be true depending on your skill level with either one, but I just have a really hard time believing that hitting a `Cmd - S` is not faster than opening a menu and clicking on 'Save' using a mouse given that you're used to using shortcuts.

### Keymap Ubiquity (Learning Hotkeys Might Be Easier Than You Think)

It's not a coincidence that a lot of the tools use similar keymaps by default. For example you'll find that opening and closing a tab in say VSCode or Obsidian works the same way it does in the browser. We'll leave behind the fact that both of the previously mentioned tools are essentially browsers. It's besides the point.

> Fun fact: if opening a new tab with `Cmd - T` makes sense because [T]ab, then the one used for closing a tab... well, not so much. [This stackexchange user](https://superuser.com/a/721652) argues that `Cmd - W` comes from back in time when the concept of tabs in the browser didn't yet exist and the hotkey meant "Close the current [W]indow".

What this means for us is that there aren't that many keymaps to learn. A lot of them repeat between different pieces of software. It also means that thrown in an unfamiliar environment you'll most likely be able to guess the most common hotkeys intuitively.

As we saw earlier we can often use mnemonics and associate the hotkey with a verb or a noun (e.g. `W` - window, `T` - tab). It doesn't always work, but when it does it really sticks in your memory. You may employ other associations that make sense to you.

But wait there is more. If you're using or have tried using Vim you'll find that it's key bindings are fairly ubiquitous and are natively supported by many applications or can be added with third party extensions (browser extensions, VSCode extensions). Same applies to other commonly used editor key bindings like Emacs.

And it goes beyond just working with code in the editor. Most popular browsers will have an extension or several centered around the idea of Vim key bindings. I'm sure the same exists for Emacs and other popular tools.

### Feels Good, Man

It may be subjective but pressing a keyboard button feels much more satisfying to me compared to clicking a mouse. Besides isn't it how they portray all of the hackers in movies? I mean the most typical movie scene showing a hacker at work is a person intensely bashing the keys of their laptop with borderline autistic levels of concentration. Now you can look like that too! If that's what you're after of course.

It also feels liberating not being dependent on your pointing device as much. A lot of people prefer using a mouse to a trackpad and what this means is that you need one less device in your carry bag because for these few times when you must use a pointing device you can probably get away with just a touchpad.

> Net change in the number of devices in your backpack is zero if you (inevitably) fall into the mechanical keyboard rabbit hole.

## How?

Ok, I'm sold. So how do I start using my keyboard more?

As with many drastic changes to your routine I'd suggest to start small. Perhaps the app you're using daily already has some built-in shortcuts. If yes then start by learning hotkeys for the most commonly used operations. For example if you open and close new browser tabs using a mouse try using hotkeys for that.

> <Cmd - T\> - to open a new tab
> <Cmd - W\> - to close a tab

In general my advice would be to think of the actions you perform most often and see if there is a shortcut for that. If there isn't a hotkey perhaps there is an extension that will allow you to map this action to a hotkey. These most common actions will give you the highest return on your investment and you'll quickly start seeing the benefits.

Stick to performing those actions only using your keyboard. Every time you reach for the mouse or the touchpad, make a mental note of it. At first your natural instinct will be to reach for the mouse, but you have to be conscious of that and choose to use the hotkey instead. With time it'll become second nature. As a more extreme measure consider disabling the touchpad or hiding the mouse.

Another piece of advice would be to try to create similar mappings across different applications if the custom key bindings are allowed. If not see if you can mentally map the available keymaps to hotkeys that you already know. The goal is to minimize the number of key combinations you have to memorize.

Be prepared that your productivity will take a hit at first. It'll take you some time to remember which hotkey you need to use for a particular action, but the more you use them the easier it gets. For that reason I wouldn't recommend making the switch during a particularly eventful week at work or when you have responsibilities that rely on you bringing your usual level of productivity. You don't need any extra stress on top of learning a new behavior and making new neural connections. Longer holidays are a perfect time to start the transition.

## Final Thoughts

This post isn't meant to completely denounce the use of a pointing device. There are plenty of uses for a mouse or a touchpad, but I'd also argue that a lot of the interactions are much faster, more efficient and simply more enjoyable with a keyboard instead. And sure, it takes effort to relearn the habits you've had for most of your life, but think of all of the benefits you may be missing out on. If any of the arguments I've made sound even remotely interesting, just give it a try. You can always go back. But you won't, I promise.

## Keyboard-Centric Software

A lot of the tools you're already using have predefined shortcuts. Sometimes you can even remap them. Some tools can be extended with third party add-ons. Some tools were created with heavy keyboard users in mind in the first place.

Here is a list of tools I use on a daily basis split in categories. I use these on macOS, but even if some of the tools mentioned below aren't available for your OS, there is definitely an alternative. Yes, even on Windows.

### Text Editors, IDEs

Some of these are ment to be used with a keyboard only. That's how much developers like to use their keyboards. In fact that's how many other pieces of software got their hotkeys.

- [Neovim](https://Neovim.io/), the one and only. An immensely popular text editor developed to be used with only a keyboard.
- [VSCode](https://code.visualstudio.com/) has built-in hotkeys and can be extended with a Vim-like keybindings.
- [VSCode Neovim](https://marketplace.visualstudio.com/items?itemName=asvetliakov.vscode-Neovim) is a VSCode extension that brings Vim keybinding to VSCode. The best one currently as far I know.

### Tiling Window Managers

Switch between workspaces using hotkeys, move windows across the screen and between workspaces, resize windows and automatically open them in a predefined layout all with just a few key strokes.

- [yabai](https://github.com/koekeishiya/yabai/blob/c5d3b271c6e122b770088adf6a1118559989f596/examples/skhdrc) + [skhd](https://github.com/koekeishiya/skhd)
- [i3 - improved tiling wm](https://i3wm.org/)

I also wrote about it in [My Developer Setup on MacOS > Window Management](https://www.dmitryanisov.com/blog/developer-setup-on-macos/#window-management).

### Browser Extensions

Browsers too natively support hotkeys, but there are extensions that allow you to greatly increase the amount of things you can do in the browser with just a keyboard. I'm talking about things like copying (yanking) text, clicking links and buttons, copying links in markdown format with just a couple of keys pressed and more.

- [Vimium](https://github.com/philc/Vimium) - brings vim motions to the browser
- [Surfingkeys](https://github.com/brookhong/Surfingkeys) - same, but a lot more extendable
  - [b0o/surfingkeys-conf](https://github.com/b0o/surfingkeys-conf) - config that you can use as an inspiration for what is possible with Surfingkeys

### PDF Viewers

You can view PDFs in the browser and use the previously mentioned browser extensions to interact with the built-in viewer, however I prefer using a standalone application.

- [sioyek](https://github.com/ahrm/sioyek) - a tool I've found while looking for a PDF viewer for reading technical literature on the laptop. I'll usually have my terminal open next to it for taking notes and writing code. Switching between the two windows and using same keys for navigating is just amazing.

### Web Versions of the Tools You're Already Using

Don't forget that a lot of the tools you're using as standalone apps can also be used on the web. What that means for us is that we can again use browser extensions to bring in keyboard control over the UI. It works with varying success, but it's better than nothing.

- [Telegram Web](https://web.telegram.org/) - the UI is very rich, using it with Vim keybindings is tough
- [Spotify Web](https://open.spotify.com/) - better, but still too many navs and scrolling them with the keyboard is tough

---

Please share your favorite keyboard-first applications, tools and workflows! You can reach out to me using any of the links below in the footer.
