import React, { forwardRef, Ref } from "react";

interface Props {
  children: React.ReactNode;
}

const BlogPostSectionWrapper = forwardRef(
  ({ children }: Props, ref: Ref<HTMLDivElement>) => (
    <section className="blogpost-section" ref={ref}>
      <div className="container">
        <div className="blogpost-outer">{children}</div>
      </div>
    </section>
  )
);

BlogPostSectionWrapper.displayName = "BlogPostSectionWrapper";

export default BlogPostSectionWrapper;
