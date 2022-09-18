/*
  Placeholder for the Comments section
  This feature might be implemented somewhere
  Down the line in the future
*/

import React from "react";

const CommentsSection = () => (
  <section className="simple-section gray-bg">
    <div className="container">
      <h2>Comments (4)</h2>
      <div className="comments-outer">
        <div className="comments-content">
          <div className="comments-block">
            <div className="top">
              <div className="name">John</div>
              <div className="date">12/12/2021 14:45</div>
            </div>
            <div className="text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Placerat odio consequat enim sed gravida elit sed gravida. Eget
                vel orci id sit a. Quam molestie feugiat faucibus aliquam. Nisi
                aliquam nunc id cursus. Nibh neque, rutrum lacinia integer.
                Vitae posuere metus dictum ut ultrices venenatis adipiscing.
                Tempus, varius in quis sit nisl orci ipsum. Dui vel eget amet
                nisl. Tincidunt morbi purus, ut vestibulum mauris dis vitae ut
                nullam. Tempor ridiculus est diam massa tortor at vitae sit.
              </p>
            </div>
            <div className="bottom">
              <a href="" className="reply">
                <img src="images/reply.svg" alt="reply" />
                Reply
              </a>
            </div>
          </div>
          <div className="comments-block">
            <div className="top">
              <div className="name">Mike</div>
              <div className="date">13/12/2021 17:45</div>
            </div>
            <div className="text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Placerat odio consequat enim sed gravida elit sed gravida. Eget
                vel orci id sit a. Quam molestie feugiat faucibus aliquam. Nisi
                aliquam nunc id cursus. Nibh neque, rutrum lacinia integer.
              </p>
            </div>
            <div className="bottom">
              <a href="" className="reply">
                <img src="images/reply.svg" alt="reply" />
                Reply
              </a>
            </div>
          </div>
          <div className="comments-block replied">
            <div className="top">
              <div className="name">Andrew</div>
              <div className="date">13/12/2021 18:45</div>
            </div>
            <div className="text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Placerat odio consequat enim sed gravida elit sed gravida. Eget
                vel orci id sit a. Quam molestie feugiat faucibus aliquam. Nisi
                aliquam nunc id cursus. Nibh neque, rutrum lacinia integer.
              </p>
            </div>
          </div>
          <div className="comments-block">
            <div className="top">
              <div className="name">John</div>
              <div className="date">12/12/2021 14:45</div>
            </div>
            <div className="text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Placerat odio consequat enim sed gravida elit sed gravida. Eget
                vel orci id sit a. Quam molestie feugiat faucibus aliquam. Nisi
                aliquam nunc id cursus. Nibh neque, rutrum lacinia integer.
                Vitae posuere metus dictum ut ultrices venenatis adipiscing.
                Tempus, varius in quis sit nisl orci ipsum. Dui vel eget amet
                nisl. Tincidunt morbi purus, ut vestibulum mauris dis vitae ut
                nullam. Tempor ridiculus est diam massa tortor at vitae sit.
              </p>
            </div>
            <div className="bottom">
              <a href="" className="reply">
                <img src="images/reply.svg" alt="reply" />
                Reply
              </a>
            </div>
          </div>
          <ul className="pagination">
            <li>
              <a href="" className="active">
                1
              </a>
            </li>
            <li>
              <a href="">2</a>
            </li>
            <li>
              <a href="">3</a>
            </li>
            <li>
              <a href="">4</a>
            </li>
          </ul>
        </div>
        <form action="#" method="post" className="comments-form simple-form">
          <h3>Leave a comment</h3>
          <div className="input-block">
            <textarea placeholder="Type anything..." defaultValue={""} />
          </div>
          <div className="input-block">
            <input type="text" placeholder="Your name" />
          </div>
          <button className="btn" type="submit">
            Post comment
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default CommentsSection;
