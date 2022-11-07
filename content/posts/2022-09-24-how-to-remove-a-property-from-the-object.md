---
title: How to remove a property from the object
date: 2022-09-24T08:49:31.545Z
featuredImage: /post-images/how-to-remove-a-property-from-the-object.webp
draft: false
tags:
  - JavaScript
---

Let's say we have the following object

```javascript
const person = {
  name: "John",
  age: 30,
  password: "123456",
};
```

And we want an exact copy of this object, but without **password** field for example.

We can do the following, use the JS **delete** keyword

```javascript
const person = {
  name: "John",
  age: 30,
  password: "123456",
};

const personWithoutPassowrd = person;
delete person.password;

console.log(personWithoutPassowrd);
// { name: 'John', age: 30 }
```

It gives as a desired result, but the problem with this approach is that personWithoutPassowrd is a reference of person, so if we console.log it, the original person isn't going to have this key as well

```javascript
const person = {
  name: "John",
  age: 30,
  password: "123456",
};

const personWithoutPassowrd = person;
delete person.password;

console.log(personWithoutPassowrd);
// { name: 'John', age: 30 }

console.log(person);
// { name: 'John', age: 30 } Oh it lost original property 😲
```

The better way to go about is to use new ES6 operator

```javascript
const person = {
  name: "John",
  age: 30,
  password: "123456",
};

const { password, ...personWithoutPassword } = person;

console.log(person);
// { name: 'John', age: 30, password: '123456' }

console.log(personWithoutPassword);
// { name: 'John', age: 30 }
```

The original object was not damaged, awesome 👍

And the syntax is pretty easy, on the left side you list out the properties you want to extract, and starting from three dots you just define a new variable with its leftovers
