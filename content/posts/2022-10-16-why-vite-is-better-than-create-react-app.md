---
title: Why Vite is better than Create React App
date: 2022-10-23T08:45:00.000Z
featuredImage: /post-images/2022-10-23-vite.jpg
draft: false
tags:
  - Vite
  - React
---

First thing first if you don't know.

**Create React App** – is a technology for running react applications, it does automatic project bundling, so you don't have to set up your own Webpack server by configuring JSX plugins, and other stuff, so your browser can understand "react language".

**Vite** – is a new project bundler, similarly to Create React App which is superior to cumbersome webpack setup, and can be a better alternative for your next react.

So why Vite is better?

### Command Line Interface

When we just start using Vite, it already welcomes as with a user-friendly interface

![vite command line interface](/post-images/animation.gif)

(Add some details)

And Create React App CLI, just doesn't feel stable overall, I had many cases when the project was stuck during initialization, or I had some issues along the way

### Config

Vite has this cool **vite.config.js** file, where you can easily change for example the port number, or whether you want to have server open, upon launching the app.

It is just nice to have, and makes the overall experience feel overall smother.

### Speed

Vite is freaking fast

Initializing the project is 100x faster than using recommend bundler from React team.

Starting the dev server is 10 times faster.

Installing dependencies is up to 5 times faster.

But, most importantly it changes the page instantly without a refresh, so you can code way faster.

**Why it is fast in the first place?**

It's because Vite is smart enough to understand to only compile the files, that actually changed not the whole application

## The bottom line:

Just try it, and you may as well fall in love with it just like me.
