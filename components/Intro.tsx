import config from "config";
import { getCookie, setCookie } from "cookies-next";

const Intro = () => {
  const handleClick = (event: any) => {
    if (event.detail === 2) {
      if (getCookie("admin")) {
        alert("Turning off editor mode");
        setCookie("admin", "false");
      } else {
        alert("Turning on editor mode");
        setCookie("admin", "true");
      }
    }
  };

  return (
    <section className="intro-section">
      <div className="container">
        <div className="intro-content">
          <div className="intro-avatar">
            <div className="image">
              <img
                onClick={handleClick}
                src="/images/author-avatar.jpg"
                alt="author-avatar"
                width={90}
                height={90}
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
};

export default Intro;
