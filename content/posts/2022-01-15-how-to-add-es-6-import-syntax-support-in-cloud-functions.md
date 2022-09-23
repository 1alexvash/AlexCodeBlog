---
title: How to add ES6 import syntax support in cloud functions
date: 2022-01-15 09:48:00
featuredImage: /post-images/2022-01-15-how-to-add-es-6-import-syntax-support-in-cloud-functions.webp
draft: false
tags:
  - Cloud Functions
  - JavaScript
---

If you want to make your code prettier, and easier to read, you might consider adding ES6 syntax support.

If your project folder was created with TypeScript, you don't have to worry about anything, as this stuff is supported out of the box, but if your project using JS, then stick with me.

Firstly, we need to tell node.js we're working with the modern ES6 syntax, to do it go to **package.json** file, and add new key pair:

```json
"type": "module",
```

Now we can rewrite our old function:

```javascript
const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.send({
    name: "John",
    age: 20,
  });
});
```

Using new ES6 syntax
(You need to use asterisk symbol to get access to firebase functions, a bit unusual, but it's a modern JavaScript)

```javascript
import * as functions from "firebase-functions";

export const helloWorld = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.send({
    name: "John",
    age: 20,
  });
});
```

We can check the function locally, to make sure nothing was broken:

![](/post-images/2022-01-image-response.webp)

Indeed, nothing really was broken, but now we can enjoy using modern syntax in our code.
