---
title: Why good code style matters
date: 2022-10-24T10:10:19.885Z
featuredImage: /post-images/good-style-article-prettier.png
draft: false
tags:
  - CleanCode
---
\[Preview picture]

(clean code phrase)

Let's imagine we have two guys, one guy has a formatting set to single quotes, and the other for double quotes. Suddenly the second guy needs to work, on the file of the first guy. What's going to happen?

That's right the entire file is going to get reformatted, not a big deal for a small file or project, but a disaster for any decent size project.

So when this file gets to the code review, it just won't be possible to review anything, as it'll be extremely hard to find what **actually** has changed. In this case, just **forget** about high quality code, and code review all together.

### So what should I do about it?

Just, have any code style convention, your team is comfortable with, and stick to it. Or as uncle Bob says:

(blockquote)

### But don't be original

When it comes to the code style, just use standard recommended options, don't image or create your own stuff just because it looks cool for you, because it's not. Let's take for example line length. The prettier documentation suggest 80 characters per line at max. Though it is common for inexperienced developers, including myself when I just was starting out, to write those huge horizontal lines.\
(Screen from prettier docs)

### So why lines should be short?

There are, some clear benefits like better structure, limiting complexity of a single line, so the code is not so mentally taxing for the brain.

Have you ever seen this GIF?

![](https://i.imgur.com/2c5OGeq.gif)

Did you ever wonder why you read so fast with this tool? It's because your eyes don't have to make unnecessary movements.

How we read a normal text:

![](/post-images/eye-reading-text-example.png)

So you can see that the eye travels a lot, and the longer the line, the more it has to travel to read the text, and less efficient reading feels.

Final example, on what mode do you read text on your phone?

![](/post-images/portrait-vs-landscape-mode.png)