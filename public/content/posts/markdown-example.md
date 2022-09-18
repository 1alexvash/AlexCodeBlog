---
title: Markdown example
date: 2022-08-28T15:40:22.718Z
featuredImage: /post-images/camera.jpg
draft: false
tags:
  - TypeScript
  - React
  - Firebase
---

# Markdown Examples

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading

## Emphasis

**This is bold text**

_This is italic text_

~~Strikethrough~~

## Blockquotes

> Develop. Preview. Ship. – Vercel

**Bold** text

_Cursive_ text

[Link](https://web.telegram.org/k/#-1216043858)

> The super smart quote

## Lists

Unordered:

- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Integer molestie lorem at massa

Ordered:

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

```javascript
const a = 1;
console.log("Hello world");
```

![image](/post-images/second.jpg)

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
