import { PostDocumentWithoutBody } from "interfaces";

import { PostsByMonthType } from ".";

const emptyPostsByMonth: { [month: string]: number } = {};

export const calculateMarginBottom = (
  postsNumber: number | undefined,
  width: number
): { mb?: string } => {
  const tabletWidthThreshold = 1020;

  if (!postsNumber && width < tabletWidthThreshold) {
    return { mb: "30px" };
  }

  if (!postsNumber) {
    return { mb: "55px" };
  }

  if (postsNumber === 1) {
    return { mb: "26px" };
  }

  return {};
};

export const getYears = (posts: PostDocumentWithoutBody[]): number[] => {
  const uniqueYears = new Set(
    posts.map((post) => new Date(post.date).getUTCFullYear())
  );
  uniqueYears.add(new Date().getUTCFullYear());

  return Array.from(uniqueYears).sort();
};

export const getPostsByCurrentYear = (
  posts: PostDocumentWithoutBody[],
  year: number
) => posts.filter((post) => new Date(post.date).getUTCFullYear() === year);

export const getAudioPostStatistics = (
  posts: PostDocumentWithoutBody[],
  year: number
): { postsWithAudio: number; postsWithoutAudio: number } => {
  const filteredPostsByYear = getPostsByCurrentYear(posts, year);

  const postsWithAudioNumber = filteredPostsByYear.filter(
    (post) => post.audioVersion
  ).length;

  return {
    postsWithAudio: postsWithAudioNumber,
    postsWithoutAudio: filteredPostsByYear.length - postsWithAudioNumber,
  };
};

export const getPostsByYearAndMonth = (
  year: number,
  posts: PostDocumentWithoutBody[]
): {
  [month: string]: number;
} => {
  const postsByMonth: PostsByMonthType = {};
  const filteredPostsByYear = getPostsByCurrentYear(posts, year);

  filteredPostsByYear.forEach((post) => {
    const date = new Date(post.date);
    const month = date.toLocaleString("en-US", {
      month: "long",
      timeZone: "UTC",
    });

    postsByMonth[month] = (postsByMonth[month] || 0) + 1;
  });

  const sortedMonths = Object.keys(postsByMonth).sort((a, b) => {
    const monthA = new Date(`${new Date().getUTCFullYear()} ${a}`).getMonth();
    const monthB = new Date(`${new Date().getUTCFullYear()} ${b}`).getMonth();

    return monthA - monthB;
  });

  const sortedPostsByMonth = sortedMonths.reduce((acc, month) => {
    return { ...acc, [month]: postsByMonth[month] };
  }, emptyPostsByMonth);

  return sortedPostsByMonth;
};
