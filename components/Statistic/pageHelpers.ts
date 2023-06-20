import { PostDocumentWithoutBody } from "interfaces";

import { PostsByMonthType } from ".";

export const marginBottomCounter = (postsCount: number | undefined) => {
  if (!postsCount) {
    return { mb: "55px" };
  }

  if (postsCount === 1) {
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

  const sortedPostsByMonth: { [month: string]: number } = {};
  sortedMonths.map((month) => {
    sortedPostsByMonth[month] = postsByMonth[month];
  });

  return sortedPostsByMonth;
};
