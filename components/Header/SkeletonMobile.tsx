import React from "react";

const SkeletonMobile = () => {
  const titleSkeleton = (
    <div
      className="name skeleton"
      style={{
        width: "196px",
        height: "36px",
        margin: "0 6px 5px",
      }}
    />
  );

  const tagSkeleton = (
    <div
      className="skeleton"
      style={{
        width: "80px",
        height: "20px",
        margin: "0 6px 5px",
      }}
    />
  );

  return (
    <div className="mobile-posts-block">
      <div className="inner-flex">
        <div className="image skeleton" style={{ borderRadius: "3px" }}></div>
        {titleSkeleton}
      </div>
      <div className="tags">
        {tagSkeleton}
        {tagSkeleton}
        {tagSkeleton}
      </div>
    </div>
  );
};

export default SkeletonMobile;
