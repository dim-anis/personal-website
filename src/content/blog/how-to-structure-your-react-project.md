---
title: "How to Structure Your React Project"
description: "From moving files around until it feels right to a more scalable approach"
subtitle: "Moving Files Around Until It Feels Right"
pubDate: "Jun 16 2022"
updatedDate: "Jun 16 2022"
tags: ["javascript", "React", "software architecture"]
publish: true
---

When it comes to starting a new React project the first decision that I'm usually faced with is how do I properly arrange files and folders within it. React, being an unopinionated library, doesn't make it any easier.

Anything goes in the React universe and while I appreciate the freedom I find that it sometimes may lead to analysis paralysis. Then I remember the advice of the React team to just start writing if you find yourself overthinking the structure of your project too much. And so I do, but I never come back to it to clean up the folder structure and the project ends up looking messy and amateurish.

This isn't something to stress over too much if you're a solo developer, however I can imagine that it may become a problem when you're working in a team.

While I do respect the advice of "just doing it" and arguably I need to be more like that, it turns out that there may be **better starting points** for your project structure which may help keeping your application clean over the long run.

## Why File Structure Matters

Here are just a few reasons why it is important to put at least some thought into how to properly structure your project:

- well organized projects are easier to maintain, share and reproduce
- proper structure allows for **consistency** within the project and between projects
- it'll make it easier **for others** to make sense of your application
- it'll make it easier **for you** to understand it
- sticking with a standardized file structure **may reduce decision fatigue** (yeah, the same reason why Steve Jobs used to wear the same outfit every day)

Consider a structure of a typical repository page on GitHub - a user first of all is faced with a project's name, then with a list of folders and files. Scroll down a little bit (or a lot) and you're finally faced with a **README.md**. That is if the developer was generous enough to include one of course.

Your goal as a developer who wants to make their work accessible to others is to make your project structure intuitive enough for a user to understand most of it even without looking at a **README**.

## No Perfect Structure for Every Project

Just as with many things in life there is rarely a one single best approach to doing things - it would make it too simple. Same applies to organizing your projects.

Some of the things you may want to consider before choosing how to organize your project:

- already existing style guides and standards used by your team
- already existing folder structure and naming conventions for your language, framework or library
- project's size

Obviously, if you're **working in a team** most likely there are already some expectations as to how your project files and code should be organized.

If it's just a **toy project**, then, perhaps, you don't need to overthink it's structure.
However, if you're starting a **big project** with ambitious goals and especially if you're going to be working on it with other people it may be a good idea to invest some time and effort into properly setting it up from the beginning.

## React Project Structure

React is an unopinionated library, which can be both a blessing and a curse. Indeed, not being tied down by a set of rules that you **have to follow** is very liberating. However, it comes with a cost. This cost is having a virtually endless array of solutions for everything and ways of organizing your application. Admittedly, it can result in a lot of frustration and time wasted overthinking and overanalyzing.

Let's fix that.

### "Create React App" Directory Structure

Let's take a look at what a popular scaffolding tool for creating React applications starts us with.

```shell
npx create-react-app "myProject"
```

... and we're faced with something like this (minus the fluff and other root level folders that aren't necessary for this discussion):

```plaintext {5-9}
.
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.css
    ├── App.js
    ├── index.css
    └── index.js
```

`src` folder is where we'll spend most of our time working on our react projects. Well, technically `src` and `pages` or `views` but I'm getting ahead of myself.

Apart from the `src` folder you might have also noticed the `public` folder. This is where all the files that aren't required for compilation of our app aka "static files" will go. What I mean by "aren't required for compilation" is that these files aren't used in any of our React components. Things like `favicon.ico` , `index.html` (where our root react component - `<App/>` gets injected).

### Grouping by file type

As far as components go so far we only have one called `<App/>`. While it's possible to get away with just that depending on your goals and needs, more than likely you'll have to break your `<App/>` into multiple different components.

As our project grows in size and we start adding other components as well as styles and tests for them our `src` folder grows and it starts looking a little messy - it's very hard to scan such a long list of files.

```plaintext {6-14}
.
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── Button.js
    ├── Button.styles.js
    ├──	Button.test.js
    ├── Select.js
    ├── Select.styles.js
    ├── Select.test.js
    ├── List.js
    ├── List.styles.js
    ├── List.test.js
    ├── App.css
    ├── App.js
    ├── index.css
    └── index.js
```

At this stage it makes sense to create folders for each component and it's associated files such as styles and tests to keep everything more neat and easily accessible. My weapon of choice when it comes to styling is a CSS-in-JS library called `styled-components` and to be honest I usually just place styles right inside of the component file itself, but here they're placed in the same folder next to the component. Ultimately the choice is yours.

> As Max Rozen brilliantly [pointed it out](https://maxrozen.com/guidelines-improve-react-app-folder-structure#1-on-testing "On testing") putting your tests together with your components compared to hiding it in a separate `__tests__` folder has _an additional benefit_ of encouraging you or other people working on the project to actually use them.

It is also a common practice to put all of the components in a separate `components` folder within `src` .

We may add other folders to `src` such as `contexts`, `utils` with helper functions, `assets` with images and icons and so on. We might even put on our big-boy and big-girl pants and write our very own hooks!

```plaintext {7-25,27-29}
.
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.js
    ├── assets
    │   ├── beautifulIcon.svg
    │   └── gorgeous.img
    ├── components
    │   ├── Button
    │   │   ├── Button.js
    │   │   ├── Button.styles.js
    │   │   └── Button.test.js
    │   ├── List
    │   │   ├── List.js
    │   │   ├── List.styles.js
    │   │   └── List.test.js
    │   └── Select
    │       ├── Select.js
    │       ├── Select.styles.js
    │       └── Select.test.js
    ├── hooks
    │   ├── useLocalStorage.js
    │   └── useSomethingElse.js
    ├── index.js
    ├── types
    └── utils
        └── helpers.js
```

Now this definitely looks a lot better and this **grouping by file type** approach may work very well for a small to medium sized project.

_From here on we'll focus on the `src` folder since that's where all the action happens._

### Further separating concerns

If your app is going to have multiple pages you might want to introduce a special folder for them often called `pages` or `views`. You could keep your `pages` components in the `components` folder since essentially they're just components within components, but the difference is that `pages` aren't likely to be reused all over the app like buttons for example. Therefore it may be a good idea to separate concerns and place `pages` in a dedicated folder outside of `components`. This kind of structure also leaves no doubts about what kind of pages our app consists of.

If by now you have built some page-specific child components - the ones that are only used on certain pages, you may also move them to `pages` as subfolders to your page components. This way you won't have to jump between `components` and `pages` as much.

Following the same logic we could also move some of our component-specific hooks, helpers and other types of files next to the components where they are used. This approach of **storing files together if they are used together** becomes even more advantageous as our project grows in size.

```plaintext {24-39}
.
└── src
    ├── App.js
    ├── assets
    │   ├── beautifulIcon.svg
    │   └── gorgeous.img
    ├── components
    │   ├── Button
    │   │   ├── Button.js
    │   │   ├── Button.styles.js
    │   │   └── Button.test.js
    │   ├── List
    │   │   ├── List.js
    │   │   ├── List.styles.js
    │   │   └── List.test.js
    │   └── Select
    │       ├── Select.js
    │       ├── Select.styles.js
    │       └── Select.test.js
    ├── hooks
    │   ├── useLocalStorage.js
    │   └── useSomethingElse.js
    ├── index.js
    ├── pages
    │   ├── Blog
    │   │   ├── BlogPage
    │   │   │   ├── BlogPage.js
    │   │   │   ├── BlogPage.styles.js
    │   │   │   ├── BlogPage.test.js
    │   │   │   ├── someBlogHelpers.js
    │   │   │   └── useSomeBlogHook.js
    │   │   └── PostCarousel
    │   │       ├── PostCarouselItem.js
    │   │       ├── PostCarousel.js
    │   │       ├── PostCarousel.styles.js
    │   │       └── PostCarousel.test.js
    │   └── Login
    │       ├── LoginForm
    │       └── LoginPage
    ├── types
    └── utils
        └── helpers.js
```

Inevitably there will be some generalized hooks and helpers that will not fit any `page` or `component` folders but that's alright. Keeping the files that are reusable across the app in their own dedicated folders and keeping component-specific files next to the components in which they're used still makes intuitive sense.

### Where to go from here?

Another popular approach to designing folder structure is **organizing files by feature**. It's actually one of the first approaches [mentioned on the React website](https://reactjs.org/docs/faq-structure.html#grouping-by-features-or-routes "grouping by features or routes").

The team acknowledges that categorizing files into features can be challenging as it's very subjective. However this approach is not without it's advantages and to be fair I've never personally worked on any even remotely large React projects so I have yet to appreciate it's uses.

If you'd like to learn more about the feature-driven structure and why you may want to adopt it check out [this article by Khalil Stemmler](https://khalilstemmler.com/articles/software-design-architecture/feature-driven/ "feature driven").

## General Guidelines

To reiterate - I'm not saying that this is **the way** to organize all of your React projects going forward. Rather it's just a way that has some convincing (hopefully) rationale behind it. Staying flexible and not being afraid to deviate from even the most popular approaches depending on your own specific needs is important. Not spending too much time pondering on what a perfect project structure is and actually writing code is also important.

That said, there are some general principles we can distill from everything written above that can be useful when coming up with your own approach:

- avoid **unnecessarily deep** nesting (arguably I didn't do the best job here, but it's not too bad, key word being **"unnecessarily"**)
- keep related files together
- keep files that change together close to each other
- don't overthink it

## Wrapping Up

> Premature optimization is the root of all evil (or at least most of it) in programming. — Donald Ervin Knuth

It's hard to disagree with this statement and some will even argue that you just need to start writing and the right structure will naturally materialize through organizing and reorganizing files within the project or, in [Dan Abramov's words](https://react-file-structure.surge.sh/ "move it"), "move files around until it feels right".

You could probably get away with that just fine for a while, especially as a solo developer. But what if there's a better way?

All I know is that for me questions like "Where do I put my files?" and "How do I properly structure my project?" give me strong FOMO and are very distracting. Having an established and consistent structure makes it a lot easier to sit down and just start doing.

<hr />

_How do you organize your React projects? Tag me on Twitter [@DmitryAnisov](https://twitter.com/intent/tweet?text=@DmitryAnisov), I'd like to know more about the rationale behind your approach._
