interface Props {
  height: string;
}

const DraftImg = ({ height }: Props) => {
  return (
    <div className="draft-img" style={{ height: height }}>
      <h1 className="draft-img-text">draft</h1>
    </div>
  );
};

export default DraftImg;
