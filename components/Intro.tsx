import config from "config";
import { useDispatch } from "react-redux";
import { setAdmin } from "redux/slices/admin";

const Intro = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (localStorage.admin == "true") {
      alert("Turning off editor mode");
      dispatch(setAdmin("false"));
    } else {
      alert("Turning on editor mode");
      dispatch(setAdmin("true"));
    }
  };

  return (
    <section className="intro-section">
      <div className="container">
        <div className="intro-content">
          <div className="intro-avatar">
            <div className="image">
              <img
                onDoubleClick={handleClick}
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
