import config from "config";
import { useDispatch } from "react-redux";
import { setAdmin } from "redux/slices/admin";
import { useAppSelector } from "redux/typesHooks";

const Intro = () => {
  const dispatch = useDispatch();

  const admin = useAppSelector((state) => state.admin);

  const handleClick = () => {
    if (admin === true) {
      dispatch(setAdmin(false));
    } else {
      dispatch(setAdmin(true));
    }
  };

  return (
    <section className="intro-section">
      <div className="container">
        <div className="intro-content">
          <div className="intro-avatar">
            <div
              className="image"
              style={{ border: admin ? "3px solid #fe6c0a" : "none" }}
            >
              <div className="wrapper">
                <img
                  onDoubleClick={handleClick}
                  src="/images/author-avatar.jpg"
                  alt="author-avatar"
                  width={90}
                  height={90}
                />
                {admin && (
                  <img
                    className="editor-icon"
                    src="/images/editor-icon.svg"
                    alt="edit"
                    width={19}
                    height={19}
                  />
                )}
              </div>
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
