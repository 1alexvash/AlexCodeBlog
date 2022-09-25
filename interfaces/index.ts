export type PostDocument = {
  slug: string;
  title: string;
  date: Date | string;
  featuredImage: string;
  draft: boolean;
  tags: string[];
  content: string;
};

export type PostDocumentWithoutContent = Omit<PostDocument, "content">;
