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
  id: string;
  title: string;
  date: Date | string;
  heroImage?: string | undefined;
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
  heroImage?: string | null;
  draft: boolean;
  body?: any | null;
  tags?: Array<string | null> | null;
  _sys: SystemInfo;
}>;

export type NodeProjectsArray =
  | (
      | {
          __typename?: "Portfolio" | undefined;
          id: string;
          _sys: SystemInfo;
          project: Array<{
            __typename: "PortfolioProject";
            projectIcon: string;
            projectName: string;
            client: any;
            project: any;
            result: any;
            description: any;
          }>;
        }
      | null
      | undefined[]
    )
  | undefined;

export interface Project {
  __typename: "PortfolioProject";
  projectIcon: string;
  projectName: string;
  client: any;
  project: any;
  result: any;
  description: any;
}
