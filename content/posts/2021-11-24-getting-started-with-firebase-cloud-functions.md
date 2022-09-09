---
title: Getting started with Firebase Cloud Functions
date: 2021-11-24 02:28:00
featuredImage: /post-images/camera.jpg
draft: false
tags:
  - Cloud Functions
  - Firebase
---

Cloud functions are powerful, and they can help solve many problems.

I'm starting a series in which I'm going to cover different use cases for them, but firstly let's initialize them in our project.

---

**Disclaimer**: to use cloud function service, your firebase project need to be on the **blaze** plan.

For it, you need to link a credit card in your firebase settings.

Don't worry, firebase has a generous free-tier. You **won't** have to pay for anything.

---

Make sure firebase is installed in your CLI by running this command

````
```bash
firebase --version
````

```

Then run to initialize / reinitialize your project

```

```bash
firebase init
```

```

Press enter to proceed

![](http://localhost/wordpress/wp-content/uploads/2021/11/image-7.png)Then choose the right service you need

![](http://localhost/wordpress/wp-content/uploads/2021/11/image-8.png)Select your project

![](http://localhost/wordpress/wp-content/uploads/2021/11/image-9.png)Pick your flavor of JavaScript

![](http://localhost/wordpress/wp-content/uploads/2021/11/image-10.png)Answer if you need ESLint, it is opted out by default

![](http://localhost/wordpress/wp-content/uploads/2021/11/image-11.png)Then just press yes to install dependencies.

It is going to create firebase config + functions folder.

So, you're going to see a structure like that.

![](http://localhost/wordpress/wp-content/uploads/2021/11/image-12.png)Let's go to **functions/index.js**

![](http://localhost/wordpress/wp-content/uploads/2021/11/image-13-1024x257.png)And uncomment the first function, so we can actually test it out.

![](http://localhost/wordpress/wp-content/uploads/2021/11/image-14-1024x244.png)Now we need to deploy this function to firebase using this command.

```

```bash
firebase deploy --only functions
```

```

After deploying. You're going to receive the URL by which you'll be able to call the function.

![](http://localhost/wordpress/wp-content/uploads/2021/11/image-16.png)To test it out. Let's open some shell and run this CURL script

![](http://localhost/wordpress/wp-content/uploads/2021/11/image-17.png)Wow. We've got something working.

In the firebase → functions → logs.

You can see that we did indeed log something by calling this function. We've got 200 success status and execution time. Well, that can have a little bit of use.

![](http://localhost/wordpress/wp-content/uploads/2021/11/image-18.png)That's it for this article, in the next article. We're going to create something a bit more exciting.

A cloud function that returns JSON data.

Stay tuned.
```
