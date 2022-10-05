import React from "react";

const SkeletonDesktop = () => {
  const titleSkeleton = (
    <div
      className="skeleton"
      style={{
        width: "258px",
        height: "20px",
        margin: "0 9px 5px",
      }}
    />
  );
  const tagSkeleton = (
    <div
      className="skeleton"
      style={{
        width: "80px",
        height: "20px",
        margin: "0 9px 5px",
      }}
    />
  );

  return (
    <div className="related-posts-block">
      <div className="image skeleton" style={{ borderRadius: "3px" }} />
      <div className="inner">
        <div className="name skeleton">{titleSkeleton}</div>
        <div className="tags">
          {tagSkeleton}
          {tagSkeleton}
          {tagSkeleton}
        </div>
      </div>
    </div>
  );
};

const DesktopSkeletons = () => (
  <div className="desktop-search-results">
    {Array.from({ length: 10 }).map((_, index) => (
      <SkeletonDesktop key={index} />
    ))}
  </div>
);

export default DesktopSkeletons;
