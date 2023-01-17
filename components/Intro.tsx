import config from "config";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAdmin } from "redux/slices/admin";
import { useAppSelector } from "redux/typesHooks";

const Intro = () => {
  const dispatch = useDispatch();
  const admin = useAppSelector((state) => state.admin);

  const [isFirstRender, setIsFirstRender] = useState(true);

  const handleClick = () => {
    if (admin === true) {
      dispatch(setAdmin(false));
    } else {
      dispatch(setAdmin(true));
    }
  };

  useEffect(() => {
    const imageWrapper = document.querySelector("div.image-avatar");
    const editIcon = document.querySelector("img.editor-icon");

    if (admin) {
      imageWrapper?.setAttribute("admin", "");
      editIcon?.setAttribute("admin", "");
      setIsFirstRender(false);
    }
    if (!admin && isFirstRender === false) {
      imageWrapper?.setAttribute("closing", "");
      editIcon?.setAttribute("closing", "");
      imageWrapper?.addEventListener(
        "animationend",
        () => {
          editIcon?.removeAttribute("closing");
          imageWrapper?.removeAttribute("closing");
        },
        { once: true }
      );
      imageWrapper?.removeAttribute("admin");
      editIcon?.removeAttribute("admin");
    }
  }, [admin, isFirstRender]);

  return (
    <section className="intro-section">
      <div className="container">
        <div className="intro-content">
          <div className="intro-avatar">
            <div className="image-avatar">
              <img
                onDoubleClick={handleClick}
                src="/images/author-avatar.jpg"
                alt="author-avatar"
                width="90"
                height="90"
              />
            </div>
            <div className="image-editor">
              <img
                className="editor-icon"
                src="/images/editor-icon.svg"
                alt="edit"
                width="19"
                height="19"
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
