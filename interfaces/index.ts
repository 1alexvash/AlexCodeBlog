import { Maybe, Scalars } from "./../.tina/__generated__/types";

export type SystemInfo = Readonly<{
  __typename?: "SystemInfo";
  filename: string;
  basename: string;
  breadcrumbs: Array<string>;
  path: string;
  relativePath: string;
  extension: string;
}>;

export type PostDocument = Readonly<{
  id: string;
  title: string;
  date: Date | string;
  heroImage?: string | undefined;
  draft: boolean;
  tags: ReadonlyArray<string>;
  _sys: SystemInfo;
  body?: Maybe<Scalars["JSON"]>;
}>;

export type PostDocumentWithoutBody = Omit<PostDocument, "body">;

export type PostFromQuery = {
  __typename?: "Post";
  id: string;
  title: string;
  date: string;
  heroImage?: string | null;
  draft: boolean;
  body?: any | null;
  tags?: ReadonlyArray<string | null> | null;
  _sys: SystemInfo;
};
