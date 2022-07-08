const PostContent = () => (
  <article className="blogpost-content">
    <div className="blogpost-image">
      <img src="images/blogpost-pic.jpg" alt="" />
    </div>
    <div className="blogpost-date">
      <span>12/12/2021 14:45</span>
    </div>
    <h1>How To Build Your Own Comment System Using Firebase</h1>
    <div className="tags">
      <a href="">#Firebase</a>
      <a href="">#React</a>
      <a href="">#Typescript</a>
    </div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat odio
      consequat enim sed gravida elit sed gravida. Eget vel orci id sit a. Quam
      molestie feugiat faucibus aliquam. Nisi aliquam nunc id cursus. Nibh
      neque, rutrum lacinia integer. Vitae posuere metus dictum ut ultrices
      venenatis adipiscing. Tempus, varius in quis sit nisl orci ipsum. Dui vel
      eget amet nisl. Tincidunt morbi purus, ut vestibulum mauris dis vitae ut
      nullam. Tempor ridiculus est diam massa tortor at vitae sit.
    </p>
    <p>
      Libero potenti non, tristique pellentesque tincidunt risus in nunc. Rutrum
      est, dictumst elementum id nulla. Luctus aenean commodo leo et eget morbi
      adipiscing elit. Nunc viverra senectus ultrices fermentum. Phasellus vitae
      lorem platea lacus, ultricies. Mi arcu integer a mauris ut adipiscing
      egestas. Ornare morbi elementum eget at pellentesque tortor. Lectus augue
      lacinia malesuada aliquet risus nunc, eu gravida aliquam. Scelerisque
      vitae semper nunc et ut lorem at purus nunc. Maecenas est sit nibh proin
      malesuada auctor consectetur felis. Ultrices orci sit aliquam sed sit mus
      vel. Elit quam massa at urna congue suscipit eget faucibus quam. Viverra
      aliquet purus amet risus. Lectus tempor est eu ut odio gravida lorem cras
      nisi.
    </p>
    <h3>What Is Firebase?</h3>
    <p>
      <a href="">Firebase</a> is a back end as a service that offers tools for
      app developers such as database, hosting, cloud functions, authentication,
      analytics, and storage.
    </p>
    <p>
      <a href="">Cloud Firestore</a> (Firebase’s database) is the functionality
      we will be using for this project. It is a NoSQL database. This means it’s
      not structured like a SQL database with rows, columns, and tables. You can
      think of it as a large JSON tree.
    </p>
    <h3>How The Comments Section Works</h3>
    <ul className="simple-list">
      <li>log-post.js</li>
      <li>Comments.js</li>
      <li>CommentForm.js</li>
      <li>Comment.js</li>
    </ul>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placerat odio
      consequat enim sed gravida elit sed gravida. Eget vel orci id sit a. Quam
      molestie feugiat faucibus aliquam. Nisi aliquam nunc id cursus. Nibh
      neque, rutrum lacinia integer. Vitae posuere metus dictum ut ultrices
      venenatis adipiscing. Tempus, varius in quis sit nisl orci ipsum. Dui vel
      eget amet nisl. Tincidunt morbi purus, ut vestibulum mauris dis vitae ut
      nullam. Tempor ridiculus est diam massa tortor at vitae sit.
    </p>
    <p>
      <strong>
        Libero potenti non, tristique pellentesque tincidunt risus in nunc.
      </strong>{" "}
      Rutrum est, dictumst elementum id nulla. Luctus aenean commodo leo et eget
      morbi adipiscing elit. Nunc viverra senectus ultrices fermentum. Phasellus
      vitae lorem platea lacus, ultricies. Mi arcu integer a mauris ut
      adipiscing egestas. Ornare morbi elementum eget at pellentesque tortor.
      Lectus augue lacinia malesuada aliquet risus nunc, eu gravida aliquam.
      Scelerisque vitae semper nunc et ut lorem at purus nunc. Maecenas est sit
      nibh proin malesuada auctor consectetur felis. Ultrices orci sit aliquam
      sed sit mus vel. Elit quam massa at urna congue suscipit eget faucibus
      quam. Viverra aliquet purus amet risus. Lectus tempor est eu ut odio
      gravida lorem cras nisi.
    </p>
    <div className="blogpost-options">
      <a href="" className="share">
        <img width={20} height={20} src="images/share.png" alt="" />
        Share
      </a>
      <div className="viewed">
        <img width={20} height={20} src="images/eye.png" alt="" />
        12587
      </div>
      <div className="blogpost-liked">
        <a href="" className="like active">
          <img width={20} height={20} src="images/like.png" alt="" />
          874
        </a>
        <a href="" className="dislike">
          <img width={20} height={20} src="images/dislike.png" alt="" />3
        </a>
      </div>
    </div>
  </article>
);

export default PostContent;
