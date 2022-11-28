---
title: What is polymorfism?
date: 2022-11-28T11:32:28.173Z
featuredImage: /post-images/portrait-vs-landscape.png
draft: false
tags: []
---


(Article draft)

I was asked this question, so many times during job interviews that I decided to write an entire article about it.

Even though the word sounds scary, the entire concept behind is very simple.

// And even might be helpful for you to (explain the benefits, maybe at the end)

Let's start off with the example (as a picture worth a thousand of word or something)

Example #1
\[a picture with a car and a track]
A car is a car
A track is car
They are both cars, but they are not entirely the same.

What's common about them? They both take you from point A to point B; hence they are cars, but driving a track makes you money, while driving a car is an expense hence polymorphism.

Example #2
\[a picture of a user, and admin user]
Let's say we have some social network or web forum, and on that platform we apparently have some users, they both can create posts, create comments, chat, and etc. But only admin user can remove content created by other people.

Example #3

I think by now you should be starting to feel the power of this idea, but let's get into a more subtle example, where you might not initially spot polymorphism

\[A picture of chat with regular messages, and photos]

Do you see it or not?

Those are all messages, but one has an image attached to it.

Doesn't seem like a big deal, right?

Until the moment you start implementing the actual logic for it, and realize that you need to have a dedicated server somewhere on the back-end to store those images.

# Why should I care?

There are a few reasons:

1. It's going to give you a couple of extra points during the job interview
2. It will increase your knowledge about architecture
   (Also known as high-level thinking \[gif meme])
3. Making smarter long-term decisions: when I first time was working on the chat functionality, I haven't considered that it might be as well a case for polymorphism, because of it, I laid out a bad technical solution for this task, so a bit later I realized I need to redesign my code, so I can enhance my message functionality, and it took more time than I initially planned, so I had to work overtime on my weekends, to meet the client's deadline.
   (It's not like I have a very nice social life beyond my 9 to 5 to job, but if I would, I'd rather spend it on something less, than catching up on my optimistic deadline promises, lol)
4. It's just going to make you smarter. This knowledge is not required for junior devs, but is a must for anybody who wants to grow beyond middle level positions.
5. /Women like you more/ - crossed text I mean dudes at work like you more as you can explain super complex stuff with simple words, so you are instantly gaining respect of your peers, and establish dominance in this social group of nerds.