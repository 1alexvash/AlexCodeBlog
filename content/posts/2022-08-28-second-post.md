---
title: Second post
date: 2022-08-28T07:23:02.595Z
featuredImage: uploads/tree-736885__480.jpg
draft: true
tags:
  - Firebase
---
The body of the blog post

<!--StartFragment-->

  const realSlug = slug.replace(/\.md$/, "");

  const fullPath = join(postsDirectory, \`${realSlug}.md\`);

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

<!--EndFragment-->