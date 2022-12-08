import config from "config";
import { useEffect, useState } from "react";

const Intro = () => {
  const [upcommingPosts, setUpcommingPosts] = useState();

  let admin = false;

  if (typeof window !== "undefined") {
    if (localStorage.getItem("admin") == "true") {
      console.log(upcommingPosts);
      admin = true;
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetch("/api/getUpcomingPosts").then((data) =>
        data.json()
      );
      setUpcommingPosts(posts);
    };
    fetchData();
  }, [admin]);

  const handleClick = (event: MouseEvent) => {
    if (event.detail === 2) {
      if (localStorage.getItem("admin") == "true") {
        alert("Turning off editor mode");
        localStorage.setItem("admin", "false");
      } else {
        alert("Turning on editor mode");
        localStorage.setItem("admin", "true");
        console.log(upcommingPosts);
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
