---
title: Getting started with Firebase Cloud Functions
date: 2021-11-24 02:28:00
featuredImage: /post-images/2021-11-24-getting-started-with-firebase-cloud-functions.webp
draft: false
tags:
  - Cloud Functions
  - Firebase
---

Cloud functions are powerful, and they can help solve many problems.

I'm starting a series in which I'm going to cover different use cases for them, but firstly let's initialize them in our project.

---

<span style="color: red">Disclaimer</span>: to use cloud function service, your firebase project need to be on the **blaze** plan.

For it, you need to link a credit card in your firebase settings.

Don't worry, firebase has a generous free-tier. You **won't** have to pay for anything.

---

Make sure firebase is installed in your CLI by running this command

```bash
firebase --version
```

Then run to initialize / reinitialize your project

```bash
firebase init
```

Press enter to proceed

![](/post-images/2021-11-cloud-1.webp)

Then choose the right service you need

![](/post-images/2021-11-cloud-2.webp)

Select your project

![](/post-images/2021-11-cloud-3.webp)

Pick your flavor of JavaScript

![](/post-images/2021-11-cloud-4.webp)

Answer if you need ESLint, it is opted out by default

![](/post-images/2021-11-cloud-5.webp)

Then just press yes to install dependencies.

It is going to create firebase config + functions folder.

So, you're going to see a structure like that.

![](/post-images/2021-11-cloud-6.webp)

Let's go to **functions/index.js**

![](/post-images/2021-11-cloud-7.webp)

And uncomment the first function, so we can actually test it out.

![](/post-images/2021-11-cloud-8.webp)

Now we need to deploy this function to firebase using this command.

```bash
firebase deploy --only functions
```

After deploying. You're going to receive the URL by which you'll be able to call the function.

![](/post-images/2021-11-cloud-9.webp)

To test it out. Let's open some shell and run this CURL script

![](/post-images/2021-11-cloud-10.webp)

Wow. We've got something working.

In the firebase → functions → logs.

You can see that we did indeed log something by calling this function. We've got 200 success status and execution time. Well, that can have a little bit of use.

![](/post-images/2021-11-cloud-11.webp)

That's it for this article, in the next article. We're going to create something a bit more exciting.

A cloud function that returns JSON data.

Stay tuned.
