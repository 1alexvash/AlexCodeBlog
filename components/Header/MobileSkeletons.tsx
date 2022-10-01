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

const MobileSkeletons = () => (
  <div
    className="mobile-search-results"
    style={
      {
        // display: search.value.trim().length > 0 ? "block" : "none",
      }
    }
  >
    {Array.from({ length: 10 }).map((_, index) => (
      <SkeletonMobile key={index} />
    ))}
  </div>
);

export default MobileSkeletons;
