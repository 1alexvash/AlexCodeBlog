---
title: How to rename stuff in VS Code, the right way
date: 2022-06-24 04:42:31
featuredImage: /post-images/2022-06-24-how-to-rename-stuff-in-vs-code-the-right-way.webp
draft: false
tags:
  - VSCode
---

Let's say in the project we want to change the name of the variable, for refactoring purposes to make some code readability improvement.

We can use VS Code shortcut **F2** to do it.

❌ The bad way to rename:

![](http://localhost/wordpress/wp-content/uploads/2022/06/bad-way.gif)(Here we are editing in the local file instead of the source one, so we end up with two names for the same function with the same functionality)✅ Good way

![](http://localhost/wordpress/wp-content/uploads/2022/06/good-way.gif)(In this clip, we are editing the function name in the source file, and VS Code is smart enough to update the name in every singe file and place this function is being used, and it can be a dozen of times, so it is a pretty nice time saver)**Tip:**

To get to the very source of function definition, use the VS Code peek command

**Ctrl + Click** or **F12**

![](http://localhost/wordpress/wp-content/uploads/2022/06/tip.gif)
