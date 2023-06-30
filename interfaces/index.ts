import { Maybe, Scalars } from "./../.tina/__generated__/types";

type SystemInfo = {
  __typename?: "SystemInfo";
  filename: string;
  basename: string;
  breadcrumbs: Array<string>;
  path: string;
  relativePath: string;
  extension: string;
};

export type PostDocument = {
  id: string;
  title: string;
  date: Date | string;
  heroImage?: string | undefined;
  draft: boolean;
  tags: string[];
  _sys: SystemInfo;
  body?: Maybe<Scalars["JSON"]>;
};

export type PostDocumentWithoutBody = Omit<PostDocument, "body">;

export type PostFromQuery = {
  __typename?: "Post";
  id: string;
  title: string;
  date: string;
  heroImage?: string | null;
  draft: boolean;
  body?: any | null;
  tags?: Array<string | null> | null;
  _sys: SystemInfo;
};

export interface Project {
  id: string;
  title: string;
  lightImage: string;
  darkImage?: string;
  clientDescription: any;
  projectDescription: any;
  resultDescription: any;
  mainDescription: any;
}
