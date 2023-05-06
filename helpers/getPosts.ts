import client from ".tina/__generated__/client";

type GetPosts = { preview: boolean };

export const getPosts = async ({ preview }: GetPosts) => {
  // by default get non-draft posts
  const filter = preview ? {} : { draft: { eq: false } };

  // if preview-mode is enabled, get all posts

  return client.queries.postConnection({
    filter,
  });
};
