import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

interface Props {
  authorName: string;
  authorPosition: string;
  siteDescription: TinaMarkdownContent | TinaMarkdownContent[];
}

const Intro = ({ authorName, authorPosition, siteDescription }: Props) => (
  <section className="intro-section">
    <div className="container">
      <div className="intro-content">
        <div className="intro-avatar">
          <div className="image">
            <img
              src="/images/author-avatar-2.jpg"
              alt="author-avatar"
              width={90}
              height={90}
            />
          </div>
          <div className="name">{authorName}</div>
          <div className="job">{authorPosition}</div>
        </div>
        <div className="intro-text">
          <h1>Hello, I am {authorName}</h1>
          <span style={{ whiteSpace: "break-spaces" }}>
            <TinaMarkdown content={siteDescription} />
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default Intro;
