import { PostDocument, PostFromQuery } from "interfaces";

import { PostQuery } from ".tina/__generated__/types";

const postToDocument = (post: PostFromQuery): PostDocument => {
  const { date, draft, title, body, heroImage, tags, _sys, id } = post;

  return {
    date,
    draft,
    title,
    body,
    heroImage: heroImage ?? undefined,
    tags: tags ? (tags.filter((tag) => tag !== null) as string[]) : [],
    _sys,
    id,
  };
};

export const queryToDocument = (data: PostQuery): PostDocument => {
  const { post } = data;

  return postToDocument(post);
};

export const queriesToArrayOfDocuments = (
  posts: PostFromQuery[]
): PostDocument[] => {
  return posts.map((post) => postToDocument(post));
};

export const nodeProjectsArrayToProjects = (
  data: PortfolioConnectionQuery
): Project[] => {
  const mappedData = data.portfolioConnection.edges
    ?.map((edge) => edge?.node?.project)
    .reverse();

  if (!mappedData) {
    return [
      {
        lightIcon: "",
        darkIcon: "",
        title: "",
        client: "",
        project: "",
        result: "",
        description: "",
      },
    ];
  }

  return mappedData
    .flatMap((projects) => projects)
    .map((item) => {
      if (!item) {
        return {
          lightIcon: "",
          title: "",
          client: "",
          project: "",
          result: "",
          description: "",
        };
      }
      const {
        client,
        description,
        lightIcon,
        project,
        title,
        result,
        darkIcon,
      } = item;

      return {
        client,
        description,
        lightIcon,
        darkIcon,
        project,
        title,
        result,
      };
    });
};
