import { PostDocument, PostFromQuery, Project } from "interfaces";

import { PortfolioConnectionQuery, PostQuery } from ".tina/__generated__/types";

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

const emptyProjectData: Project = {
  id: -1,
  lightImage: "",
  darkImage: "",
  title: "",
  clientDescription: "",
  projectDescription: "",
  resultDescription: "",
  mainDescription: "",
};

export const nodeProjectsArrayToProjects = (
  data: PortfolioConnectionQuery
): Project[] => {
  const mappedData = data.portfolioConnection.edges
    ?.map((edge) => edge?.node?.project)
    .reverse();

  if (!mappedData) {
    return [emptyProjectData];
  }

  return mappedData
    .flatMap((projects) => projects)
    .map((item) => {
      if (!item) {
        return emptyProjectData;
      }

      const {
        client,
        description,
        lightIcon,
        project,
        title,
        result,
        darkIcon,
        id,
      } = item;

      return {
        clientDescription: client,
        mainDescription: description,
        lightImage: lightIcon,
        darkImage: darkIcon ?? undefined,
        projectDescription: project,
        title,
        resultDescription: result,
        id,
      };
    });
};
