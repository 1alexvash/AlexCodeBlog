import React from "react";

interface Props {
  children: React.ReactNode;
}

const BlogPostSectionWrapper = ({ children }: Props) => (
  <section className="blogpost-section">
    <div className="container">
      <div className="blogpost-outer">{children}</div>
    </div>
  </section>
);

export default BlogPostSectionWrapper;
