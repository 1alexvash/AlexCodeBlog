---
title: How to send JSON data using cloud functions
date: 2021-11-25 13:24:12
featuredImage: /post-images/camera.jpg
draft: false
tags:
  - Cloud Functions
  - Firebase
---

In the previous article we solved CORS issue.

But how can we send some JSON data back instead plain text one?

Well, it is pretty easy.

Let's just update our code in **functions/index.js**

````
```javascript
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.send({
    name: "John",
    age: 20,
  });
});

````

```

Then to fetch this data:

We need to change the response method to parse JSON not text

```

```javascript
.then(response => response.text())
```

```

To:

```

```javascript
.then(response => response.json())
```

```

And that's it!

![](http://localhost/wordpress/wp-content/uploads/2021/11/image-21.png)
```
