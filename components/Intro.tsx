import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

interface Props {
  author_name: string;
  author_position: string;
  site_description: TinaMarkdownContent | TinaMarkdownContent[];
}

const Intro = ({ author_name, author_position, site_description }: Props) => (
  <section className="intro-section">
    <div className="container">
      <div className="intro-content">
        <div className="intro-avatar">
          <div className="image">
            <img
              src="/images/author-avatar.jpg"
              alt="author-avatar"
              width={90}
              height={90}
            />
          </div>
          <div className="name">{author_name}</div>
          <div className="job">{author_position}</div>
        </div>
        <div className="intro-text">
          <h1>Hello, I am {author_name}</h1>
          <span style={{ whiteSpace: "break-spaces" }}>
            <TinaMarkdown content={site_description} />
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default Intro;
