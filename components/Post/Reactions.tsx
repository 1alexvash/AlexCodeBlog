// This component is not used for the time being

import React from "react";

const Reactions = () => (
  <div className="blogpost-options">
    <button className="share">
      <img width={20} height={20} src="/images/share.png" alt="share" />
      Share
    </button>
    <div className="viewed">
      <img width={20} height={20} src="/images/eye.png" alt="eye" />
      12587
    </div>
    <div className="blogpost-liked">
      <button className="like active">
        <img width={20} height={20} src="/images/like.png" alt="like" />
        874
      </button>
      <button className="dislike">
        <img width={20} height={20} src="/images/dislike.png" alt="dislike" />3
      </button>
    </div>
  </div>
);

export default Reactions;
