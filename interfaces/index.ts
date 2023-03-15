import { Maybe, Scalars } from "./../.tina/__generated__/types";

type SystemInfo = Readonly<{
  __typename?: "SystemInfo";
  filename: string;
  basename: string;
  breadcrumbs: Array<string>;
  path: string;
  relativePath: string;
  extension: string;
}>;

export type PostDocument = Readonly<{
  slug: string;
  title: string;
  date: Date | string;
  featuredImage?: string; // TODO: think of something more clever, heroImage might do
  draft: boolean;
  tags: string[];
  _sys: SystemInfo;
  body?: Maybe<Scalars["JSON"]>;
}>;

export type PostDocumentWithoutBody = Omit<PostDocument, "body">;

export type PostFromQuery = Readonly<{
  __typename?: "Post";
  id: string;
  title: string;
  date: string;
  featuredImage?: string | null;
  draft: boolean;
  body?: any | null;
  tags?: Array<string | null> | null;
  _sys: SystemInfo;
}>;
