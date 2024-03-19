---
title: "My Developer Setup on MacOS"
description: "Join me on the journey of transforming my macOS machine into a development powerhouse!"
subtitle: ""
pubDate: "Jul 20 2023"
updatedDate: "Mar 19 2024"
tags: ["tools", "productivity", "macos"]
publish: true
---

I've been a Windows user for most of my life but switched to Linux when I delved into development. Eventually, I got my hands on the MacBook Pro M1 (2021). While it's a fantastic computer with outstanding performance and battery life, recreating my familiar Linux development environment turned out to be more challenging than expected.

In this article, I aim to share my ongoing journey of transforming a macOS machine into a true development powerhouse. Join me as I navigate through the adjustments, tweaks, and setups that have helped me tailor this device to suit my development needs.

## macOS System Settings

One of macOS's most prominent features is its sleek design, which most people, myself included, appreciate for its aesthetics.

However, what matters even more to me is responsiveness, performance, and a clutter-free environment that allows me to stay focused and productive. To achieve this, I apply a couple of tweaks to macOS System Settings that suit my needs best.

### Maximizing Screen Real Estate

I've noticed that I barely ever use the Dock. I launch my apps using Spotlight or hotkeys instead. That is an opportunity to free up some space on the screen.

One of the first solutions is to reduce it's size in the settings:

> System Settings > Desktop & Dock > Size (move the slider until you're satisfied)

...but I go a step further and place it on the right of the screen and enable the setting to automatically hide it:

> System Settings > Desktop & Dock > Position on screen: right

> System Settings > Desktop & Dock > Automatically hide and show the Dock ✅

That way it never gets in the way when I don't need it and if I do need it, all I need to do is hover the pointer over the right edge of the screen, and it slides out.

### Turning Off Animations

I use keyboard shortcuts to move between workspaces and I've found that enabling the **Reduce Motion** setting really helps with making the transitions instantaneous.

> System Settings > Accessibility > Display > Reduce motion ✅

What really happens when you enable it is all of those beautiful macOS transitions are turned off. I much prefer it this way.

Seriously, give it a try.

### Finder Settings

In all honesty, I find the default Finder experience quite underwhelming. I dare say, I'd actually prefer File Explorer over it.

But hey, no worries! With just a few simple tweaks, we can turn it into a much more usable tool. Let's dive in and customize it to our liking.

#### Default Finder Window

By default, whenever you open a new Finder window it shows you your recently opened files. What I've found is that when I open Finder I'm instead looking for some specific location on my hard drive.

Instead, in my view, it makes more sense to start with your home directory.

> Finder Settings > General > New Finder windows show: \{your home dir}

#### Remove Tags

I personally don't use them, so I don't want them to pollute the sidebar.

> Finder Settings > Tags > select and '-' to remove each tag

#### Remove Airdrop

I've never used it, and I probably won't.

> Finder Settings > Sidebar > Airdrop ❌

Here you can also select any favorite locations you want to appear on the sidebar.

#### Show File Extensions

I want to be able to see exactly what file extension I'm dealing with when opening a directory so enable this too.

> Finder Settings > Advanced > Show all filename extensions ✅

#### Show Path

I feel like it should be enabled by default, but if you want to be able to see where you are on your hard drive, you may want to enable this option:

> Finder > View > Show Path Bar

## Homebrew Package Manager

One thing you never miss when switching from Windows to Linux is not having a package manager. Its just so convenient to have one central place for downloading and updating all (ok, almost all) of the software on your machine.

Luckily, macOS has something to offer here. [brew](https://brew.sh/) is the most popular package manager on macOS and it was an easy choice.

Install [brew](https://brew.sh/) on your machine by pasting this command in your shell:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then, installing anything is as easy as:

```bash
brew install --cask firefox
```

> Use the `--cask` flag when installing desktop applications like Firefox or Discord. Otherwise simply run `brew install {name}`

To check whether the app you're looking for is available in brew I usually just google something like `{application name} brew`.

Upgrade your **cli-tools** with:

```bash
brew upgrade
```

Upgrade your **GUI apps** with:

```bash
brew upgrade --cask
```

> Some **casks** don't have versioning information and some of them have a buil-in upgrade mechanism (e.g. Chrome), in that case you may need to run the upgrade with a `--greedy` flag.

Besides apps and cli utilities, brew can also be used to **install fonts**, which I think is a much more convenient way to do that.

### Installing Node

I use [brew](https://brew.sh/) to install almost all of my software, but there is one exception - yes, I'm talking about [NodeJS](https://nodejs.org/en). If you want to avoid countless permission errors, then perhaps you may be interested in using a version manager for [NodeJS](https://nodejs.org/en) .

Two of the most popular ones are [nvm](https://github.com/nvm-sh/nvm) and [fnm](https://github.com/Schniz/fnm). I use the latter because its faster.

Install it with a bash script:

```bash
curl -fsSL https://fnm.vercel.app/install | bash
```

After that, the usage is as simple as:

```bash
# install the latest node version
fnm install
# install the latest node lts version
fnm install --lts
# use a specific node version
fnm use {version}
```

## Terminal

I currently switch between [iTerm2](https://iterm2.com/) and [kitty](https://sw.kovidgoyal.net/kitty/). I like how snappy kitty is, but sometimes it gives me some weird graphical artifacts when running `neovim` in `tmux`. I don't use almost any of the bells and whistles of kitty, so for me the transition between the two is easy.

Both can be installed with [brew]().

Install [iTerm2](https://iterm2.com/):

```bash
brew install --cask iterm2
```

Install [kitty](https://sw.kovidgoyal.net/kitty/):

```bash
brew install --cask kitty
```

## Shell

`zsh` is the default shell on modern versions of macOS and I see no reason to switch to something else.

In general I try to keep things as minimal as possible when it comes to customization. For this reason I avoid [Oh My Zsh](https://ohmyz.sh/), which is a very popular configuration manager for `zsh`.

**Pros:** simple configuration

**Cons:** comes bundled with a bunch of stuff you'll probably never use, which can slow down starting time

### zap + p10k

My current setup consists of two pieces:

- [zap](https://www.zapzsh.org/) - plugin manager
- [p10k](https://github.com/romkatv/powerlevel10k) - current theme

Both prioritize speed and simplicity and work very well together.

I have very few `zsh` plugins installed and I can manage them by adding or removing a single line in my `.zshrc`.

## Window Management

This is a polarizing topic, but I personally prefer tiling window managers to floating windows. I haven't used floating windows since the Windows days and I don't want to go back. I also try to use my mouse (touchpad) as little as possible to avoid excessive context switching and be **blazingly fast**.

Yes, I do know that you can tile windows to left and right in macOS natively, but:

1. Its manual
2. At most you can have two windows tiled next to each other

### yabai

That's where [yabai](https://github.com/koekeishiya/yabai) comes in. [Yabai](https://github.com/koekeishiya/yabai) is a tilling window manager based on binary space partitioning, which means that every time you open a new window it doesn't put it on top of the previous one, but splits the space previously occupied by a single window in two and places it next to the previous one in a recursive manner.

Perhaps it'll make more sense visually.

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1279.5587350268365 869.0875953931832" width="100%" height="300px">
  <rect x="0" y="0" width="100%" height="869.0875953931832" fill="transparent"></rect><g stroke-linecap="round"><g transform="translate(10.074969089664535 46.21232521459649) rotate(0 307.6484375 0)"><path d="M0.91 -1.12 C103.75 -1.05, 514.19 -0.66, 616.4 -0.38 M-0.07 0.91 C102.76 1.22, 513.28 1.36, 616.03 0.97" stroke="currentColor" stroke-width="1" fill="none"></path></g></g><mask></mask><g stroke-linecap="round" transform="translate(10.074969089664535 10) rotate(0 305.44921875 204.30356332159153)"><path d="M32 0 M32 0 C237.19 -2.79, 443.25 -2.27, 578.9 0 M32 0 C149.13 -0.36, 266.88 0.14, 578.9 0 M578.9 0 C599.62 1.63, 608.96 12.03, 610.9 32 M578.9 0 C599.29 1.26, 611.41 9.6, 610.9 32 M610.9 32 C611.77 137.24, 611.31 240.93, 610.9 376.61 M610.9 32 C612.39 141.15, 611.76 251.57, 610.9 376.61 M610.9 376.61 C611.37 396.37, 600.14 408.08, 578.9 408.61 M610.9 376.61 C612.9 399.96, 599.57 408.27, 578.9 408.61 M578.9 408.61 C453.91 409.44, 329.92 409.52, 32 408.61 M578.9 408.61 C422.66 408.59, 266.54 408.35, 32 408.61 M32 408.61 C10.76 410.25, -1.38 395.96, 0 376.61 M32 408.61 C9.32 408.81, -0.98 398.61, 0 376.61 M0 376.61 C-0.27 279.08, -0.38 180.58, 0 32 M0 376.61 C1.85 295.56, 1.66 214.22, 0 32 M0 32 C-0.54 9.69, 10.11 -1.05, 32 0 M0 32 C-1.37 8.89, 10.8 -0.19, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(28.832517951545924 20.04704581449323) rotate(0 287.31121826171875 8.932015566575188)"><text x="0" y="0" font-family="monospace" font-size="14px" fill="currentColor" text-anchor="start" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge"> File Edit Insert                               ᯤ Thu 20 Jul 15:23</text></g><g stroke-linecap="round" transform="translate(27.206601164918425 58.85043832159158) rotate(0 288.5 172.5)"><path d="M32 0 M32 0 C182.93 0.24, 335.44 0.15, 545 0 M32 0 C144.06 0.06, 256.46 0.57, 545 0 M545 0 C566.33 0.08, 576.65 10.14, 577 32 M545 0 C567.95 -2.03, 578.39 8.57, 577 32 M577 32 C574.22 115.08, 574.93 195.29, 577 313 M577 32 C575.57 93.61, 575.72 156.36, 577 313 M577 313 C576.57 333.32, 567.18 343.23, 545 345 M577 313 C575.49 335.58, 568.34 345.19, 545 345 M545 345 C366.75 344.51, 188.18 344.14, 32 345 M545 345 C369.78 346.55, 195.2 346.77, 32 345 M32 345 C9.98 344.16, 1.3 332.44, 0 313 M32 345 C9.68 344.9, -0.01 333.45, 0 313 M0 313 C-1.76 216.56, -0.53 121.48, 0 32 M0 313 C0.63 221.41, 0.63 128.87, 0 32 M0 32 C1.33 9.92, 12.48 0.33, 32 0 M0 32 C0.23 10.23, 12.93 -1.18, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(310.82860281286764 208.85043832159158) rotate(0 4.877998352050781 22.5)"><text x="4.877998352050781" y="0" font-family="Epilogue" font-size="36px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">1</text></g><g stroke-linecap="round"><g transform="translate(653.2025647804776 46.2123252145966) rotate(0 307.64843750000006 0)"><path d="M0.17 1.12 C102.68 1.2, 511.62 1.01, 614.21 0.99 M-1.19 0.66 C101.73 0.39, 513.62 -0.36, 616.36 -0.62" stroke="currentColor" stroke-width="1" fill="none"></path></g></g><mask></mask><g stroke-linecap="round" transform="translate(653.2025647804776 10) rotate(0 305.44921875000006 204.30356332159153)"><path d="M32 0 M32 0 C204.67 2.29, 376.66 1.59, 578.9 0 M32 0 C172.02 -0.66, 312.57 -0.42, 578.9 0 M578.9 0 C602.04 0.15, 611.72 9.54, 610.9 32 M578.9 0 C602.44 2.27, 609.93 12.95, 610.9 32 M610.9 32 C611.34 131.02, 612.85 227.7, 610.9 376.61 M610.9 32 C609.89 108.57, 610.16 185.01, 610.9 376.61 M610.9 376.61 C612.04 396.77, 599.49 407.35, 578.9 408.61 M610.9 376.61 C609.71 397.77, 602.27 407.2, 578.9 408.61 M578.9 408.61 C421.13 409.82, 264.76 409.84, 32 408.61 M578.9 408.61 C468.45 410.63, 357.85 410.49, 32 408.61 M32 408.61 C10.52 408.61, -1.15 398.09, 0 376.61 M32 408.61 C8.37 407.56, 0.12 398.75, 0 376.61 M0 376.61 C1.39 241.23, 1.7 103.58, 0 32 M0 376.61 C-0.82 284.86, -1.14 194.25, 0 32 M0 32 C1.29 12.38, 9.04 -1.02, 32 0 M0 32 C-0.91 8.91, 10.25 0.6, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(671.960113642359 20.04704581449323) rotate(0 287.31121826171875 8.932015566575188)"><text x="0" y="0" font-family="monospace" font-size="14px" fill="currentColor" text-anchor="start" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge"> File Edit Insert                               ᯤ Thu 20 Jul 15:23</text></g><g stroke-linecap="round" transform="translate(670.3341968557314 60.15317269659158) rotate(0 140.5 172.5)"><path d="M32 0 M32 0 C104.73 -0.05, 179.34 0.49, 249 0 M32 0 C85.48 0.04, 137.74 -0.52, 249 0 M249 0 C272.25 1.97, 280.16 12.65, 281 32 M249 0 C270 1.08, 281.2 9.57, 281 32 M281 32 C281.24 127.87, 283.29 225.72, 281 313 M281 32 C282.88 131.69, 282.16 231.8, 281 313 M281 313 C279.97 334.19, 272.11 343.78, 249 345 M281 313 C280.71 333.39, 272.42 343.24, 249 345 M249 345 C203.12 342.68, 162.36 344.38, 32 345 M249 345 C190.54 343.73, 131.7 343.8, 32 345 M32 345 C8.67 344.09, 0.11 335.03, 0 313 M32 345 C12.87 344.41, -1.72 335.75, 0 313 M0 313 C-2.35 207.31, -0.4 100.58, 0 32 M0 313 C1.35 240.96, 0.23 167.21, 0 32 M0 32 C-0.79 9.14, 10.3 0.52, 32 0 M0 32 C-1.2 12.56, 8.58 1.38, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(805.9561985036806 210.15317269659158) rotate(0 4.877998352050781 22.5)"><text x="4.877998352050781" y="0" font-family="Epilogue" font-size="36px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">1</text></g><g stroke-linecap="round" transform="translate(965.6766301612632 60.15317269659158) rotate(0 140.5 172.5)"><path d="M32 0 M32 0 C115.39 -2.28, 196.71 0.96, 249 0 M32 0 C105.87 -0.48, 179.47 -1.37, 249 0 M249 0 C271 1.82, 279.9 10.91, 281 32 M249 0 C269.25 -1.75, 280.45 10.72, 281 32 M281 32 C278.67 91.97, 280.69 151.55, 281 313 M281 32 C281.36 129.79, 281.03 229.42, 281 313 M281 313 C281.28 332.93, 271.63 346.32, 249 345 M281 313 C280.14 335.88, 268.79 342.73, 249 345 M249 345 C191.74 346.5, 135.91 343.91, 32 345 M249 345 C165.96 343.74, 84.05 345.22, 32 345 M32 345 C11.16 344.13, -1.18 332.75, 0 313 M32 345 C9.01 344.66, -0.52 334.3, 0 313 M0 313 C1.73 250.02, 0.12 188.7, 0 32 M0 313 C1.31 223.79, 1.99 135.45, 0 32 M0 32 C1.44 11.77, 9.67 -1.95, 32 0 M0 32 C-1.18 9.29, 10.32 2.08, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(1093.360635898568 210.15317269659158) rotate(0 12.815994262695312 22.5)"><text x="12.815994262695312" y="0" font-family="Epilogue" font-size="36px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">2</text></g><g stroke-linecap="round"><g transform="translate(10.632025085575947 486.69279396459666) rotate(0 307.6484375 0)"><path d="M0.69 0.07 C103.35 -0.19, 513.16 -0.4, 615.61 -0.49 M-0.4 -0.94 C102.16 -0.53, 512.31 0.54, 614.83 0.8" stroke="currentColor" stroke-width="1" fill="none"></path></g></g><mask></mask><g stroke-linecap="round" transform="translate(10.632025085575947 450.48046875000006) rotate(0 305.44921875 204.30356332159153)"><path d="M32 0 M32 0 C227.26 -0.49, 422.84 -0.53, 578.9 0 M32 0 C141.77 -1.64, 251.17 -1.31, 578.9 0 M578.9 0 C602.02 -1.92, 611.54 9.67, 610.9 32 M578.9 0 C599.64 -1.75, 608.72 9.34, 610.9 32 M610.9 32 C608.53 118.52, 608.79 204.35, 610.9 376.61 M610.9 32 C612.45 147.49, 611.83 262.32, 610.9 376.61 M610.9 376.61 C610.92 398.96, 599.12 407.51, 578.9 408.61 M610.9 376.61 C609.34 398.35, 601.26 407.3, 578.9 408.61 M578.9 408.61 C428.38 408.21, 279.02 407.49, 32 408.61 M578.9 408.61 C414.44 410.42, 250.87 410.07, 32 408.61 M32 408.61 C11.11 407.9, -0.6 399.28, 0 376.61 M32 408.61 C10.85 410.45, 1.53 398.53, 0 376.61 M0 376.61 C0.23 250.39, 1.25 123.49, 0 32 M0 376.61 C-1.16 296.15, -1.41 214.21, 0 32 M0 32 C-0.88 9.48, 10.48 1.84, 32 0 M0 32 C0.37 9.86, 12.33 0.45, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(29.389573947457393 460.5275145644933) rotate(0 287.31121826171875 8.932015566575188)"><text x="0" y="0" font-family="monospace" font-size="14px" fill="currentColor" text-anchor="start" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge"> File Edit Insert                               ᯤ Thu 20 Jul 15:23</text></g><g stroke-linecap="round" transform="translate(27.76365716082978 500.63364144659164) rotate(0 140.5 172.5)"><path d="M32 0 M32 0 C97.71 -1.78, 168.13 0.36, 249 0 M32 0 C93.44 -2.02, 153.6 -1.62, 249 0 M249 0 C269.82 -1.52, 279.11 9.51, 281 32 M249 0 C269.15 -1.59, 281.01 9.28, 281 32 M281 32 C280.65 133.87, 281.41 235.99, 281 313 M281 32 C281.07 120.32, 280.63 207.44, 281 313 M281 313 C279.65 334.69, 271.22 343.86, 249 345 M281 313 C280.42 333.77, 269.55 344.21, 249 345 M249 345 C174.33 343.94, 100.85 342.99, 32 345 M249 345 C167.6 344.48, 85.55 345.37, 32 345 M32 345 C10.82 346.6, 1.33 334.84, 0 313 M32 345 C12.25 344.49, -0.83 333.86, 0 313 M0 313 C-2.21 211.28, -0.35 107.66, 0 32 M0 313 C1.63 202.39, 1.89 93.39, 0 32 M0 32 C0.32 9.97, 12.11 0.39, 32 0 M0 32 C1.62 9.29, 8.98 1.18, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(163.385658808779 650.6336414465916) rotate(0 4.877998352050781 22.5)"><text x="4.877998352050781" y="0" font-family="Epilogue" font-size="36px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">1</text></g><g stroke-linecap="round" transform="translate(323.876579261385 500.63364144659164) rotate(0 140.5 82)"><path d="M32 0 M32 0 C76.08 -1.21, 121.97 1.04, 249 0 M32 0 C76.06 0.28, 119.75 0.44, 249 0 M249 0 C269.31 -1.38, 281.01 9.46, 281 32 M249 0 C271.72 -0.94, 282.59 11.47, 281 32 M281 32 C282.11 66.09, 280.38 100.09, 281 132 M281 32 C279.77 67.26, 280.89 101.59, 281 132 M281 132 C280.49 152.84, 269.65 163.31, 249 164 M281 132 C282.02 155.11, 269.26 164.01, 249 164 M249 164 C187.46 164.4, 123.07 163.16, 32 164 M249 164 C191.65 165.96, 134.73 165.49, 32 164 M32 164 C12.04 163.56, -0.72 152.92, 0 132 M32 164 C12.14 165.3, 1.73 151.84, 0 132 M0 132 C1.28 96.61, -1.36 64, 0 32 M0 132 C0.25 107.57, 0.82 84.03, 0 32 M0 32 C1.41 9.47, 9.2 1.03, 32 0 M0 32 C-0.07 11.44, 10.9 -1.4, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(451.5605849986897 560.1336414465916) rotate(0 12.815994262695312 22.5)"><text x="12.815994262695312" y="0" font-family="Epilogue" font-size="36px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">2</text></g><g stroke-linecap="round" transform="translate(323.876579261385 680.1785633215916) rotate(0 140.5 82)"><path d="M32 0 M32 0 C115.03 -0.55, 194.87 -0.97, 249 0 M32 0 C115.56 -1.49, 197.79 -0.64, 249 0 M249 0 C269.38 -0.03, 281.21 9.52, 281 32 M249 0 C270.32 -1.81, 280.47 10.52, 281 32 M281 32 C280.42 52.98, 283.01 75.14, 281 132 M281 32 C281.24 54.92, 281.25 78.18, 281 132 M281 132 C279.87 151.74, 269.11 165.44, 249 164 M281 132 C283.28 154.63, 272.6 163.2, 249 164 M249 164 C183.18 164.23, 119.12 162.52, 32 164 M249 164 C203.44 165.95, 157.23 165.99, 32 164 M32 164 C10.86 165.17, -1.83 151.87, 0 132 M32 164 C10.28 162.46, 1.92 153.14, 0 132 M0 132 C-0.4 100.44, -1.26 67.14, 0 32 M0 132 C0.92 93.65, -0.24 54.48, 0 32 M0 32 C-0.51 9.19, 9.63 -0.47, 32 0 M0 32 C-1.43 10.04, 11.31 -1.31, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(452.11858365591627 739.6785633215916) rotate(0 12.25799560546875 22.5)"><text x="12.25799560546875" y="0" font-family="Epilogue" font-size="36px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">3</text></g><g stroke-linecap="round"><g transform="translate(653.6334231639355 486.69279396459666) rotate(0 307.64843749999994 0)"><path d="M-0.68 0.84 C101.92 0.84, 512.47 1.07, 614.98 0.85 M1.17 0.23 C103.63 -0.17, 511.26 -0.89, 613.86 -0.83" stroke="currentColor" stroke-width="1" fill="none"></path></g></g><mask></mask><g stroke-linecap="round" transform="translate(653.6334231639355 450.48046875000006) rotate(0 305.44921874999994 204.30356332159153)"><path d="M32 0 M32 0 C165.85 -0.03, 298.25 -0.03, 578.9 0 M32 0 C175.49 0.63, 318.61 0.67, 578.9 0 M578.9 0 C599.18 1.89, 612.5 11.54, 610.9 32 M578.9 0 C602.45 -0.99, 612.97 9.56, 610.9 32 M610.9 32 C610.22 109.79, 610.17 187.15, 610.9 376.61 M610.9 32 C611.25 168.95, 611.24 306.61, 610.9 376.61 M610.9 376.61 C609.52 396.15, 598.88 409.02, 578.9 408.61 M610.9 376.61 C609.6 398.21, 600.29 408.21, 578.9 408.61 M578.9 408.61 C365.81 407.29, 152.83 406.69, 32 408.61 M578.9 408.61 C418.07 407.99, 256.32 407.97, 32 408.61 M32 408.61 C10.46 406.99, -0.79 399.37, 0 376.61 M32 408.61 C10.95 406.77, -1.91 398.05, 0 376.61 M0 376.61 C0.28 252.93, 0.97 126.41, 0 32 M0 376.61 C-0.36 240.98, -0.66 105.51, 0 32 M0 32 C0.29 10.9, 11.19 -1.33, 32 0 M0 32 C-1.62 11.06, 8.89 0.09, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(672.390972025817 460.5275145644933) rotate(0 287.31121826171875 8.932015566575188)"><text x="0" y="0" font-family="monospace" font-size="14px" fill="currentColor" text-anchor="start" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge"> File Edit Insert                               ᯤ Thu 20 Jul 15:23</text></g><g stroke-linecap="round" transform="translate(670.7650552391893 500.63364144659164) rotate(0 140.5 172.5)"><path d="M32 0 M32 0 C79.76 2.63, 128.2 1.9, 249 0 M32 0 C86.93 1.46, 143.47 1.02, 249 0 M249 0 C272.26 -0.86, 282.8 9.7, 281 32 M249 0 C268.6 -1.08, 279.9 11.34, 281 32 M281 32 C283.05 124.07, 280.78 214.02, 281 313 M281 32 C278.98 105.14, 278.99 179.8, 281 313 M281 313 C279.87 334.57, 270.38 344.65, 249 345 M281 313 C283.07 334.78, 269.08 345.63, 249 345 M249 345 C187.35 343.78, 125.53 344.65, 32 345 M249 345 C193.19 343.39, 137.22 344.72, 32 345 M32 345 C10.91 343.4, -1.66 334.43, 0 313 M32 345 C12.11 343.4, -0.73 332.06, 0 313 M0 313 C2.42 201.33, -0.12 89.25, 0 32 M0 313 C0.82 229.43, 0.9 145.17, 0 32 M0 32 C-1.41 11.01, 9.12 0.08, 32 0 M0 32 C-0.19 12.45, 8.94 2.27, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(806.3870568871386 650.6336414465916) rotate(0 4.877998352050781 22.5)"><text x="4.877998352050781" y="0" font-family="Epilogue" font-size="36px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">1</text></g><g stroke-linecap="round" transform="translate(966.8779773397447 500.63364144659164) rotate(0 140.5 82)"><path d="M32 0 M32 0 C111.09 -1.16, 191.16 -1.41, 249 0 M32 0 C118.44 -1.2, 203.99 -1.25, 249 0 M249 0 C268.83 -0.94, 280.04 11.25, 281 32 M249 0 C270.93 0.59, 281.41 12.92, 281 32 M281 32 C279.75 64.11, 281.18 97.63, 281 132 M281 32 C279.76 53.17, 280.35 73.93, 281 132 M281 132 C282.8 153.72, 269.25 164.55, 249 164 M281 132 C280.62 154.92, 268.22 163.88, 249 164 M249 164 C176.7 164.2, 105.08 165.32, 32 164 M249 164 C201.54 164.66, 153.15 165.4, 32 164 M32 164 C11.92 162.61, -0.64 151.35, 0 132 M32 164 C12.93 162.94, -0.45 155.48, 0 132 M0 132 C0.68 99.41, 1.12 68.42, 0 32 M0 132 C-0.97 100.98, -1.04 69.66, 0 32 M0 32 C-0.16 12.22, 9.17 1.97, 32 0 M0 32 C0.66 9.28, 9.38 -1.88, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(1094.5619830770493 560.1336414465916) rotate(0 12.815994262695312 22.5)"><text x="12.815994262695312" y="0" font-family="Epilogue" font-size="36px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">2</text></g><g stroke-linecap="round" transform="translate(966.8779773397447 679.1434070715916) rotate(0 68 82)"><path d="M32 0 M32 0 C52.74 1.98, 70.58 2.31, 104 0 M32 0 C49.76 -0.12, 68.54 0.64, 104 0 M104 0 C125.85 0.51, 136.36 12.63, 136 32 M104 0 C126.14 -1.16, 134.44 9.81, 136 32 M136 32 C134.55 53.7, 136.76 76.98, 136 132 M136 32 C136.93 63.36, 135.48 94.61, 136 132 M136 132 C135.67 154.71, 123.5 163.89, 104 164 M136 132 C136.68 152.86, 127.16 163.01, 104 164 M104 164 C86.15 163.14, 72.96 164.17, 32 164 M104 164 C88.78 163.34, 72 163.04, 32 164 M32 164 C12.64 163.08, -0.39 155.2, 0 132 M32 164 C11.11 162.32, 0.29 153.28, 0 132 M0 132 C0.04 105.8, -1.53 77.13, 0 32 M0 132 C0.69 101.06, 0.02 69.56, 0 32 M0 32 C0.58 9.46, 9.54 -1.64, 32 0 M0 32 C-0.92 9.12, 11.41 2.22, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(1022.6199817342759 738.6434070715916) rotate(0 12.25799560546875 22.5)"><text x="12.25799560546875" y="0" font-family="Epilogue" font-size="36px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">3</text></g><g stroke-linecap="round" transform="translate(1112.9957450488096 679.1434070715916) rotate(0 68 82)"><path d="M32 0 M32 0 C55.52 -0.34, 77.89 0.2, 104 0 M32 0 C52.95 -0.29, 73.1 -0.36, 104 0 M104 0 C125.9 -0.38, 134.65 11.73, 136 32 M104 0 C124.19 1.86, 133.8 12.95, 136 32 M136 32 C136.74 69, 135.65 108.35, 136 132 M136 32 C136.59 71.22, 136.02 110.61, 136 132 M136 132 C135.25 155.15, 127.01 164.88, 104 164 M136 132 C134.55 152.13, 127.1 164.05, 104 164 M104 164 C76.35 164.36, 45.74 165.67, 32 164 M104 164 C76.05 165.16, 47.96 163.76, 32 164 M32 164 C11.53 163.39, 0.61 152.49, 0 132 M32 164 C8.73 163.43, 1.05 155.16, 0 132 M0 132 C-0.05 93.59, -2.02 56.97, 0 32 M0 132 C0.6 102.45, 1.12 74.44, 0 32 M0 32 C-0.97 8.98, 11.63 -1.85, 32 0 M0 32 C-2.04 10.42, 11.51 1.53, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(1169.4757484057432 738.6434070715916) rotate(0 11.519996643066406 22.5)"><text x="11.519996643066406" y="0" font-family="Epilogue" font-size="36px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">4</text></g>
</svg>

### skhd

But having your window manager be able to do this kind of thing is not enough, you need to be able to trigger some commands to control these windows, move them around, resize them or even move them from one workspace to another.

[skhd](https://github.com/koekeishiya/skhd) a simple hotkey daemon for macOS created by the developer of [yabai](https://github.com/koekeishiya/yabai) is exactly the tool we need. I mostly just use the example config, but you can extend it to your liking and set hotkeys to launch desired apps.

I have `cmd - return` hotkey set to open my terminal. Here's what it looks like in my `.skhdrc`:

```txt
cmd - return : /Applications/kitty.app/Contents/MacOS/kitty --single-instance -d ~
```

My setup is quite simple. I have four workspaces, each dedicated to a particular task (e.g. workspace1: web, workspace2: code).

Typically, I have only one window open per workspace, occasionally having two windows side by side. Rarely, I may have more than two windows on a single workspace, but I find comfort in knowing exactly where each newly opened window belongs. This setup allows me to stay organized and focused on the task at hand.

### Spaceman

Because I like to assign each workspace a particular role, knowing which workspace I'm on currently is very helpful. macOs surprisingly doesn't have this feature, but I have found a tool that helps with just that.

The only thing [Spaceman](https://github.com/Jaysce/Spaceman) does is it shows which workspace is currently active and it does it ok. It hasn't been updated in several years and I've seen quite a few bugs like named workspace indicators resetting their names back to default, but I switched to numbers as indicators and its been working great.

Here's what it looks like:

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 642.4186579391733 571.107126643183" width="100%" height="300px">
  <rect x="0" y="0" width="642.4186579391733" height="571.107126643183" fill="transparent"></rect><g stroke-linecap="round"><g transform="translate(10.358874003626397 188.71232521459643) rotate(0 307.6484375 0)"><path d="M0.72 0.41 C103.29 0.25, 513.39 0.01, 615.92 0.03 M-0.36 -0.43 C102.06 -0.47, 512.67 1.76, 615.3 1.58" stroke="currentColor" stroke-width="1" fill="none"></path></g></g><mask></mask><g stroke-linecap="round" transform="translate(10.358874003626397 152.5) rotate(0 305.44921875 204.30356332159153)"><path d="M32 0 M32 0 C224.09 0.57, 415.99 0.17, 578.9 0 M32 0 C224.61 -1.07, 416.64 -1.02, 578.9 0 M578.9 0 C598.95 1.43, 612.84 12.38, 610.9 32 M578.9 0 C602.36 0.46, 610.28 9.04, 610.9 32 M610.9 32 C613.54 168.52, 611.82 303.27, 610.9 376.61 M610.9 32 C609.19 154.95, 608.94 277.62, 610.9 376.61 M610.9 376.61 C609.82 397.3, 598.3 408.16, 578.9 408.61 M610.9 376.61 C612.12 400.04, 599.51 408.99, 578.9 408.61 M578.9 408.61 C413.63 407.83, 248.53 407.88, 32 408.61 M578.9 408.61 C366.35 410.29, 153.8 410.03, 32 408.61 M32 408.61 C10.31 407.75, 1.71 398.51, 0 376.61 M32 408.61 C9.35 408.06, -1.37 396.11, 0 376.61 M0 376.61 C-2.49 268.8, -0.69 157.96, 0 32 M0 376.61 C1.24 300.37, 0.96 224.39, 0 32 M0 32 C0.65 11.59, 9.74 -0.24, 32 0 M0 32 C2.07 11.11, 11.43 -1.5, 32 0" stroke="currentColor" stroke-width="1" fill="none"></path></g><g transform="translate(29.116422865507786 162.54704581449323) rotate(0 287.31121826171875 8.932015566575188)"><text x="0" y="0" font-family="monospace" font-size="14px" fill="currentColor" text-anchor="start" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge"> File Edit Insert                                ᯤ Thu 20 Jul 15:23</text></g><g stroke-linecap="round" transform="translate(334.2620593607601 162.7284521930145) rotate(0 11.022833120835626 8.67358287730373)"><path d="M4.34 0 L17.71 0 L20.96 1.08 L22.05 4.34 L22.05 13.01 L20.96 16.26 L17.71 17.35 L4.34 17.35 L1.08 16.26 L0 13.01 L0.27 2.44 L2.44 0.27 L4.34 0" stroke="none" stroke-width="0" fill="var(--color-background-400"></path><path d="M4.34 0 M4.34 0 C8.08 0, 11.83 0, 17.71 0 M4.34 0 C9.4 0, 14.47 0, 17.71 0 M17.71 0 C20.6 0, 22.05 1.45, 22.05 4.34 M17.71 0 C20.6 0, 22.05 1.45, 22.05 4.34 M22.05 4.34 C22.05 7.43, 22.05 10.53, 22.05 13.01 M22.05 4.34 C22.05 6.43, 22.05 8.52, 22.05 13.01 M22.05 13.01 C22.05 15.9, 20.6 17.35, 17.71 17.35 M22.05 13.01 C22.05 15.9, 20.6 17.35, 17.71 17.35 M17.71 17.35 C13.71 17.35, 9.71 17.35, 4.34 17.35 M17.71 17.35 C14.74 17.35, 11.77 17.35, 4.34 17.35 M4.34 17.35 C1.45 17.35, 0 15.9, 0 13.01 M4.34 17.35 C1.45 17.35, 0 15.9, 0 13.01 M0 13.01 C0 9.94, 0 6.86, 0 4.34 M0 13.01 C0 11.14, 0 9.28, 0 4.34 M0 4.34 C0 1.45, 1.45 0, 4.34 0 M0 4.34 C0 1.45, 1.45 0, 4.34 0" stroke="currentColor" stroke-width="0.5" fill="none"></path></g><g transform="translate(343.57395498159565 167.8978412545593) rotate(0 1.7109375 3.5041938157589243)"><text x="1.7109375" y="0" font-family="monospace" font-size="5.840323026264855px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">1</text></g><g stroke-linecap="round" transform="translate(359.5848201950002 162.7284521930145) rotate(0 11.022833120835626 8.67358287730373)"><path d="M4.34 0 L17.71 0 L20.96 1.08 L22.05 4.34 L22.05 13.01 L20.96 16.26 L17.71 17.35 L4.34 17.35 L1.08 16.26 L0 13.01 L0.27 2.44 L2.44 0.27 L4.34 0" stroke="none" stroke-width="0" fill="var(--color-text-400)"></path><path d="M4.34 0 M4.34 0 C9.25 0, 14.17 0, 17.71 0 M4.34 0 C9.49 0, 14.65 0, 17.71 0 M17.71 0 C20.6 0, 22.05 1.45, 22.05 4.34 M17.71 0 C20.6 0, 22.05 1.45, 22.05 4.34 M22.05 4.34 C22.05 6.73, 22.05 9.13, 22.05 13.01 M22.05 4.34 C22.05 6.54, 22.05 8.73, 22.05 13.01 M22.05 13.01 C22.05 15.9, 20.6 17.35, 17.71 17.35 M22.05 13.01 C22.05 15.9, 20.6 17.35, 17.71 17.35 M17.71 17.35 C14.38 17.35, 11.05 17.35, 4.34 17.35 M17.71 17.35 C14.34 17.35, 10.97 17.35, 4.34 17.35 M4.34 17.35 C1.45 17.35, 0 15.9, 0 13.01 M4.34 17.35 C1.45 17.35, 0 15.9, 0 13.01 M0 13.01 C0 9.74, 0 6.47, 0 4.34 M0 13.01 C0 9.68, 0 6.35, 0 4.34 M0 4.34 C0 1.45, 1.45 0, 4.34 0 M0 4.34 C0 1.45, 1.45 0, 4.34 0" stroke="var(--color-text-400)" stroke-width="0.5" fill="none"></path></g><g transform="translate(368.8967158158358 167.8978412545593) rotate(0 1.7109375 3.5041938157589243)"><text x="1.7109375" y="0" font-family="monospace" font-size="5.840323026264855px" fill="var(--color-background-400)" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">2</text></g><g stroke-linecap="round" transform="translate(384.9075810292403 162.7284521930145) rotate(0 11.022833120835628 8.67358287730373)"><path d="M4.34 0 L17.71 0 L20.96 1.08 L22.05 4.34 L22.05 13.01 L20.96 16.26 L17.71 17.35 L4.34 17.35 L1.08 16.26 L0 13.01 L0.27 2.44 L2.44 0.27 L4.34 0" stroke="none" stroke-width="0" fill="var(--color-background-400"></path><path d="M4.34 0 M4.34 0 C8.16 0, 11.99 0, 17.71 0 M4.34 0 C7.55 0, 10.77 0, 17.71 0 M17.71 0 C20.6 0, 22.05 1.45, 22.05 4.34 M17.71 0 C20.6 0, 22.05 1.45, 22.05 4.34 M22.05 4.34 C22.05 6.29, 22.05 8.23, 22.05 13.01 M22.05 4.34 C22.05 7.23, 22.05 10.11, 22.05 13.01 M22.05 13.01 C22.05 15.9, 20.6 17.35, 17.71 17.35 M22.05 13.01 C22.05 15.9, 20.6 17.35, 17.71 17.35 M17.71 17.35 C12.95 17.35, 8.19 17.35, 4.34 17.35 M17.71 17.35 C14.27 17.35, 10.84 17.35, 4.34 17.35 M4.34 17.35 C1.45 17.35, 0 15.9, 0 13.01 M4.34 17.35 C1.45 17.35, 0 15.9, 0 13.01 M0 13.01 C0 11.04, 0 9.06, 0 4.34 M0 13.01 C0 10.3, 0 7.6, 0 4.34 M0 4.34 C0 1.45, 1.45 0, 4.34 0 M0 4.34 C0 1.45, 1.45 0, 4.34 0" stroke="currentColor" stroke-width="0.5" fill="none"></path></g><g transform="translate(394.21947665007593 167.8978412545593) rotate(0 1.7109375 3.5041938157589243)"><text x="1.7109375" y="0" font-family="monospace" font-size="5.840323026264855px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">3</text></g><g stroke-linecap="round" transform="translate(410.2303418634805 162.7284521930145) rotate(0 11.022833120835628 8.67358287730373)"><path d="M4.34 0 L17.71 0 L20.96 1.08 L22.05 4.34 L22.05 13.01 L20.96 16.26 L17.71 17.35 L4.34 17.35 L1.08 16.26 L0 13.01 L0.27 2.44 L2.44 0.27 L4.34 0" stroke="none" stroke-width="0" fill="var(--color-background-400"></path><path d="M4.34 0 M4.34 0 C8.73 0, 13.12 0, 17.71 0 M4.34 0 C9.31 0, 14.28 0, 17.71 0 M17.71 0 C20.6 0, 22.05 1.45, 22.05 4.34 M17.71 0 C20.6 0, 22.05 1.45, 22.05 4.34 M22.05 4.34 C22.05 6.83, 22.05 9.33, 22.05 13.01 M22.05 4.34 C22.05 6.31, 22.05 8.28, 22.05 13.01 M22.05 13.01 C22.05 15.9, 20.6 17.35, 17.71 17.35 M22.05 13.01 C22.05 15.9, 20.6 17.35, 17.71 17.35 M17.71 17.35 C12.71 17.35, 7.71 17.35, 4.34 17.35 M17.71 17.35 C14.65 17.35, 11.59 17.35, 4.34 17.35 M4.34 17.35 C1.45 17.35, 0 15.9, 0 13.01 M4.34 17.35 C1.45 17.35, 0 15.9, 0 13.01 M0 13.01 C0 11.25, 0 9.5, 0 4.34 M0 13.01 C0 9.89, 0 6.76, 0 4.34 M0 4.34 C0 1.45, 1.45 0, 4.34 0 M0 4.34 C0 1.45, 1.45 0, 4.34 0" stroke="currentColor" stroke-width="0.5" fill="none"></path></g><g transform="translate(419.54223748431605 167.8978412545593) rotate(0 1.7109375 3.5041938157589243)"><text x="1.7109375" y="0" font-family="monospace" font-size="5.840323026264855px" fill="currentColor" text-anchor="middle" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">4</text></g><g stroke-linecap="round"><g transform="translate(502.76505038053153 35.794477024992034) rotate(0 -62.4474163848196 54.08802129412658)"><path d="M0 0 C-14.58 7.66, -66.65 27.94, -87.47 45.97 C-108.28 64, -118.66 97.81, -124.89 108.18 M0 0 C-14.58 7.66, -66.65 27.94, -87.47 45.97 C-108.28 64, -118.66 97.81, -124.89 108.18" stroke="var(--color-blue-400)" stroke-width="1" fill="none"></path></g><g transform="translate(502.76505038053153 35.794477024992034) rotate(0 -62.4474163848196 54.08802129412658)"><path d="M-122.13 78.3 C-123.04 88.2, -123.96 98.09, -124.89 108.18 M-122.13 78.3 C-123.21 90.01, -124.3 101.71, -124.89 108.18" stroke="var(--color-blue-400)" stroke-width="1" fill="none"></path></g><g transform="translate(502.76505038053153 35.794477024992034) rotate(0 -62.4474163848196 54.08802129412658)"><path d="M-103.57 87.07 C-110.63 94.06, -117.7 101.05, -124.89 108.18 M-103.57 87.07 C-111.93 95.34, -120.28 103.61, -124.89 108.18" stroke="var(--color-blue-400)" stroke-width="1" fill="none"></path></g></g><mask></mask><g transform="translate(370.3588740036264 10) rotate(0 131.02989196777344 12.5)"><text x="0" y="0" font-family="Epilogue" font-size="var(--fs-200)" fill="var(--color-blue-400)" text-anchor="start" style="white-space: pre;" direction="ltr" dominant-baseline="text-before-edge">currently on workspace #2</text></g>
</svg>

## Command Line Interface Utilities

Here is a short list of cli-utilities that I currently use. Most of them are used in the context of Neovim - my editor of choice, but some of them are used standalone.

> Obligatory I use VIM by the way.

### fzf

[fzf](https://github.com/junegunn/fzf) is a command line fuzzy finder and its just amazing. It does one thing - searching - and it does it really well.

Install [fzf](https://github.com/junegunn/fzf) with [brew](https://brew.sh/):

```shell
brew install fzf
```

Let's use it with the output of one of the commands of [brew](https://brew.sh/):

Run:

```bash
brew list | fzf
```

You'll get a fuzzily searchable list of all of the apps installed with [brew](https://brew.sh/). And we're just scratching the surface.

Another incredibly useful application of [fzf](https://github.com/junegunn/fzf) is **shell history search**. If you're using [Oh My Zsh](https://ohmyz.sh/) then I think it comes preconfigured, otherwise you'll have to install a plugin for that, but when you do you'll be able to fuzzily search your shell command history. Comes in handy all the time.

### exa

[exa](https://github.com/ogham/exa) is a modern replacement for `ls` command.

- uses colors to distinguish file types and metadata
- understands symlinks
- is aware of Git

Its colorful, its pretty, its written in Rust. Nuff said.

### ripgrep

[ripgrep](https://github.com/BurntSushi/ripgrep) recursively searches directories for a regex pattern while respecting your `.gitignore`.

I use [ripgrep](https://github.com/BurntSushi/ripgrep) in Neovim to search for patterns and strings within the project. Its incredibly fast.

<hr />

_And there you have it, my current developer setup for macOS in a nutshell. While I've omitted some of the more mundane and elementary details to keep this article concise, I hope the tips and tweaks I've shared will prove valuable to fellow macOS users._

_If you have any questions, suggestions, or just want to chat about development, feel free to reach out to me on Twitter, via email, or anywhere else! The links are provided below. Happy coding!_
