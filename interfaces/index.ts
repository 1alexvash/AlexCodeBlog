export type PostDocument = {
  slug: string;
  title: string;
  date: Date | string;
  heroImage?: string | undefined;
  draft: boolean;
  tags: string[];
  content: string;
};

export type PostDocumentWithoutContent = Omit<PostDocument, "content">;
