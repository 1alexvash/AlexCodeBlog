import config from "config";
import Image from "next/image";
const Intro = () => (
  <section className="intro-section">
    <div className="container">
      <div className="intro-content">
        <div className="intro-avatar">
          <div className="image">
            <Image
              src="/images/author-avatar.jpg"
              alt="author-avatar"
              width={90}
              height={90}
              priority
            />
          </div>
          <div className="name">{config.author_name}</div>
          <div className="job">{config.author_position}</div>
        </div>
        <div className="intro-text">
          <h1>Hello, I am {config.author_name}</h1>
          <p style={{ whiteSpace: "break-spaces" }}>
            {config.site_description}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Intro;
