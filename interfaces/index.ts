export type PostDocument = {
  slug: string;
  title: string;
  date: string;
  featuredImage: string;
  draft: boolean;
  tags: string[];
  content: string;
};

export type PostDocumentWithoutContent = Omit<PostDocument, "content">;
