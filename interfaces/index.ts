export type PostDocument = {
  slug: string;
  title: string;
  date: Date | string;
  heroImage?: string | undefined; // TODO: think of something more clever, heroImage might do
  draft: boolean;
  tags: string[];
  content: string;
};

export type PostDocumentWithoutContent = Omit<PostDocument, "content">;
