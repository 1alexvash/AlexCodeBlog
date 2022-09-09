---
title: How to delete a git branch
date: 2021-11-08 13:21:23
featuredImage: /post-images/2021-11-08-how-to-delete-a-git-branch.webp
draft: false
tags:
  - Git
---

Firstly, let's check list of all branches on the project.

Command to check the list of all your branches:

```bash
git branch --all
```

Command to delete a local branch:

```bash
git branch --delete test
```

Deleting a remote branch, a bit trickier. Firstly, we need to push those changes to the remote repository.
Command to delete a remote branch:

```bash
git push origin --delete test
```
