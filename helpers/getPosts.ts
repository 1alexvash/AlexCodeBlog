import client from ".tina/__generated__/client";

export const getPosts = async ({ preview }: { preview: boolean }) => {
  // by default get non-draft posts
  const filter = { draft: { eq: false } };

  // if preview-mode is enabled, get all posts

  return client.queries.postConnection({
    filter: preview ? {} : filter,
  });
};
