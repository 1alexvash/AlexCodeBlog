import React from "react";

const content = () => {
  return <div>content</div>;
};

export const getStaticProps = async () => {
  return {
    props: { content: [{}, {}, {}] },
  };
};

export default content;
