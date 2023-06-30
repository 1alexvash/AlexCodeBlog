import { PostDocumentWithoutBody } from "interfaces";

import { PostsByMonthType } from ".";

const emptyPostsByMonth: { [month: string]: number } = {};

export const calculateMarginBottom = (
  postsCount: number | undefined
): { mb?: string } => {
  if (!postsCount) {
    return { mb: "55px" };
  }

  if (postsCount === 1) {
    return { mb: "26px" };
  }

  return {};
};

export const getYearsArray = (posts: PostDocumentWithoutBody[]): number[] => {
  const uniqueYears: Set<number> = new Set();

  posts.forEach((post) => {
    const postYear = new Date(post.date).getUTCFullYear();
    uniqueYears.add(postYear);
  });

  uniqueYears.add(new Date().getUTCFullYear());

  return Array.from(uniqueYears).sort();
};

export const getPostsByYearAndMonth = (
  year: number,
  posts: PostDocumentWithoutBody[]
): {
  [month: string]: number;
} => {
  const postsByMonth: PostsByMonthType = {};
  const filteredPosts = posts.filter(
    (post) => new Date(post.date).getUTCFullYear() === year
  );

  filteredPosts.forEach((post) => {
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
