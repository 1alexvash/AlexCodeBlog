import React, { forwardRef } from "react";

interface Props {
  children: React.ReactNode;
}

const BlogPostSectionWrapper = forwardRef<HTMLDivElement, Props>(
  function BlogPostSectionWrapper({ children }, ref) {
    return (
      <section className="blogpost-section" ref={ref}>
        <div className="container">
          <div className="blogpost-outer">{children}</div>
        </div>
      </section>
    );
  }
);

BlogPostSectionWrapper.displayName = "BlogPostSectionWrapper";

export default BlogPostSectionWrapper;
