import PostCard from "./PostCard";

export const postsJSON = [
  {
    title:
      "Using SWR React Hooks With Next.js Incremental Static Regeneration (ISR)",
    image: "/images/post-pic-1.jpg",
    tags: ["React", "Typescript"],
  },
  {
    title: "Compound Components In React",
    image: "/images/post-pic-2.jpg",
    tags: ["React", "Typescript"],
  },
  {
    title: "Global vs. Local Styling In Next.js",
    image: "/images/post-pic-3.jpg",
    tags: ["Firebase", "React", "Typescript"],
  },
  {
    title: "Gatsby Serverless Functions And The International Space Station",
    image: "/images/post-pic-4.jpg",
    tags: ["React", "Typescript"],
  },
  {
    title: "Image To Text Conversion With React And Tesseract.js (OCR)",
    image: "/images/post-pic-5.jpg",
    tags: ["React"],
  },
  {
    title: "Client-Side Routing In Next.js",
    image: "/images/post-pic-6.jpg",
    tags: ["Firebase", "React", "Typescript"],
  },
];

const Posts = () => (
  <ul className="posts-list">
    {postsJSON.map((post, index) => (
      <PostCard key={index} post={post} />
    ))}
  </ul>
);

export default Posts;
