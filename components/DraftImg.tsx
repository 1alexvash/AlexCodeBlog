interface Props {
  height: string;
}

const DraftImg = ({ height }: Props) => {
  //height uses to past this Component into different parts of website(LatestPosts,PostContent,PostCard)

  return (
    <div className="draft-img" style={{ height: height }}>
      <h1 className="draft-img-text">draft</h1>
    </div>
  );

  //if I haven't got img for draft-post - I'll use this Component
};

export default DraftImg;
