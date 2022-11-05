---
title: Markdown example
date: 2022-10-24T10:10:18.885Z
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

![image](https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80)

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
