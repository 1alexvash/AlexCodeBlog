// This component is not used for the time being

import React from "react";

const Reactions = () => (
  <div className="blogpost-options">
    <a href="" className="share">
      <img width={20} height={20} src="/images/share.png" alt="" />
      Share
    </a>
    <div className="viewed">
      <img width={20} height={20} src="/images/eye.png" alt="" />
      12587
    </div>
    <div className="blogpost-liked">
      <a href="" className="like active">
        <img width={20} height={20} src="/images/like.png" alt="" />
        874
      </a>
      <a href="" className="dislike">
        <img width={20} height={20} src="/images/dislike.png" alt="" />3
      </a>
    </div>
  </div>
);

export default Reactions;
