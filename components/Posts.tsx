const posts = [
  {
    title:
      "Using SWR React Hooks With Next.js Incremental Static Regeneration (ISR)",
    image: "images/post-pic-1.jpg",
    tags: ["React", "Typescript"],
  },
  {
    title: "Compound Components In React",
    image: "images/post-pic-2.jpg",
    tags: ["React", "Typescript"],
  },
  {
    title: "Global vs. Local Styling In Next.js",
    image: "images/post-pic-3.jpg",
    tags: ["Firebase", "React", "Typescript"],
  },
  {
    title: "Gatsby Serverless Functions And The International Space Station",
    image: "images/post-pic-4.jpg",
    tags: ["React", "Typescript"],
  },
  {
    title: "Image To Text Conversion With React And Tesseract.js (OCR)",
    image: "images/post-pic-5.jpg",
    tags: ["React"],
  },
  {
    title: "Client-Side Routing In Next.js",
    image: "images/post-pic-6.jpg",
    tags: ["Firebase", "React", "Typescript"],
  },
];

const Posts = () => (
  <ul className="posts-list">
    {posts.map((post, index) => (
      <li key={index}>
        <div className="posts-list-block">
          <div className="content">
            <a href="" className="post-img">
              <img src={post.image} alt="" />
            </a>
            <div className="tags">
              <a href="">#React</a>
              <a href="">#Typescript</a>
            </div>
            <a href="" className="link">
              Using SWR React Hooks With Next.js’ Incremental Static
              Regeneration (ISR)
            </a>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default Posts;
