---
title: Snippet to update every document in Firestore
date: 2022-01-22 09:38:03
featuredImage: /post-images/2022-01-22-snippet-to-update-every-document-in-firestore.webp
draft: false
tags:
  - Firebase
  - Firestore
---

A quite useful self-explanatory snippet

```typescript
firestore
  .collection("users")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      doc.ref.update({
        premium: true,
      });
    });
  });
```

(This one is for 8th version of SDK)
