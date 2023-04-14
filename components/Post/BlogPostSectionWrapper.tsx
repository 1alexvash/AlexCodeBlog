import React from "react";

interface Props {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement>;
}

const BlogPostSectionWrapper = ({ children, ref }: Props) => (
  <section className="blogpost-section" ref={ref}>
    <div className="container">
      <div className="blogpost-outer">{children}</div>
    </div>
  </section>
);

export default BlogPostSectionWrapper;
