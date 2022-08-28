---
title: First post
date: 2022-08-28T15:40:22.718Z
featuredImage: /post-images/camera.jpg
draft: false
tags:
  - TypeScript
  - React
---
Hello

It's my first article

Isn't it excited?

**Bold** text

*Cursive* text

Some code example:

<!--StartFragment-->

export function toHumanReadableDate(ISODate: string) {

  const date = new Date(ISODate);

  const dateTimeFormat = new Intl.DateTimeFormat("en", {

    year: "numeric",

    month: "long",

    day: "numeric",

  });

  return dateTimeFormat.format(date);

}

<!--EndFragment-->

[Link](https://web.telegram.org/k/#-1216043858)

> The super smart quote

* Bullet list amazing
* Two
* Three

1. Another
2. Bullet List
3. Pretty cool

![alt](/post-images/second.jpg "title")

```typescript
export function toHumanReadableDate(ISODate: string) {
  const date = new Date(ISODate);

  const dateTimeFormat = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return dateTimeFormat.format(date);
}
```

That's it!