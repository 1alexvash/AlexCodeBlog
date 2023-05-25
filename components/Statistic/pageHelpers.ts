import { PostDocumentWithoutBody } from "interfaces";

import { PostsByMonthType } from ".";

export const counterMarginBottom = (count: number | undefined) => {
  if (!count) {
    return { mb: "55px" };
  }

  if (count === 1) {
    return { mb: "26px" };
  }

  return {};
};

export const getPostsByYearAndMonth = (
  year: number,
  posts: PostDocumentWithoutBody[]
) => {
  const postsByMonth: PostsByMonthType = {};
  const filteredPosts = posts.filter(
    (post) => new Date(post.date).getFullYear() === year
  );

  filteredPosts.map((post) => {
    const date = new Date(post.date);
    const month = date.toLocaleString("en-US", { month: "long" });
    postsByMonth[month] = (postsByMonth[month] || 0) + 1;
  });

  const sortedMonths = Object.keys(postsByMonth).sort((a, b) => {
    const monthA = new Date(`2000 ${a}`).getMonth();
    const monthB = new Date(`2000 ${b}`).getMonth();
    return monthA - monthB;
  });

  const sortedPostsByMonth: { [month: string]: number } = {};
  sortedMonths.map((month) => {
    sortedPostsByMonth[month] = postsByMonth[month];
  });

  return sortedPostsByMonth;
};
