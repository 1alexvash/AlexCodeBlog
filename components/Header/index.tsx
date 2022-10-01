import config from "config";
import { PostDocumentWithoutContent } from "interfaces";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "redux/typesHooks";

import { setTags } from "../../redux/slices/selectedTags";
import DesktopSearch from "./DesktopSearch";

import Logo from "./Logo";
import SkeletonMobile from "./SkeletonMobile";
import ThemeSwitcher from "./ThemeSwitcher";

export type Search = {
  value: string;
  showSearch: boolean;
  isLoaded: boolean;
  posts: PostDocumentWithoutContent[];
};

const Header = () => {
  const [search, setSearch] = useState<Search>({
    value: "",
    showSearch: false,
    isLoaded: false,
    posts: [] as PostDocumentWithoutContent[],
  });

  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useAppDispatch();

  const filteredPosts = search.posts.filter((post) => {
    return post.title.toLowerCase().includes(search.value.toLowerCase());
  });

  const mobileInputRef = useRef<HTMLInputElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      // benchmark time
      const start = performance.now();
      const posts = await fetch("/api/getAllPosts").then((data) => data.json());
      const end = performance.now();
      console.log("fetching posts took: ", end - start);

      setSearch((search) => ({
        ...search,
        isLoaded: true,
        posts,
      }));
    };

    if ((search.showSearch || showMenu) && search.posts.length === 0) {
      fetchData();
    }

    if (search.showSearch) {
      desktopInputRef.current?.focus();
    }

    if (showMenu) {
      mobileInputRef.current?.focus();
    }
  }, [search.showSearch, search.posts.length, showMenu]);

  const HeaderContentMobile = (
    <div className="header-content-mobile">
      <Logo />
      <div className="header-hamburger" onClick={() => setShowMenu(true)}>
        <img src="/images/hamburger.svg" alt="hamburger" />
      </div>
    </div>
  );

  const MobileSearch = (
    <div className="mobile-search">
      <div className="mobile-search-content">
        <form
          action="#"
          method="post"
          className="mobile-search-form simple-form"
        >
          <div className="input-block">
            <input
              type="text"
              placeholder="Site search"
              value={search.value}
              onChange={(event) => {
                setSearch((search) => ({
                  ...search,
                  value: event.target.value,
                }));
              }}
              ref={mobileInputRef}
            />
          </div>
        </form>

        {search.isLoaded ? (
          filteredPosts.length > 0 ? (
            <div
              className="mobile-search-results"
              style={{
                display: search.value.trim().length > 0 ? "block" : "none",
              }}
            >
              {filteredPosts.map((post, index) => (
                <div className="mobile-posts-block" key={index}>
                  <div className="inner-flex">
                    <a href={`/post/${post.slug}`} className="image">
                      <img src={post.featuredImage} alt="blog post image" />
                    </a>
                    <a href={`/post/${post.slug}`} className="name">
                      {post.title}
                    </a>
                  </div>
                  <div className="tags">
                    {post.tags.map((tag) => (
                      <Link href="/" key={tag}>
                        <a
                          href=""
                          key={tag}
                          onClick={() => {
                            setShowMenu(false);
                            dispatch(setTags([tag]));
                          }}
                        >
                          #{tag}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">Not found.</div>
          )
        ) : (
          <div
            className="mobile-search-results"
            style={{
              display: search.value.trim().length > 0 ? "block" : "none",
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonMobile key={index} />
            ))}
          </div>
        )}
      </div>
      <div
        className="mobile-search-overlay"
        style={{
          display: search.value.trim().length > 0 ? "block" : "none",
        }}
      >
        <div
          className="close-search"
          onClick={() => {
            setSearch((search) => ({
              ...search,
              value: "",
            }));
          }}
        >
          <img src="/images/close-search.svg" alt="search" />
        </div>
      </div>
    </div>
  );

  const HeaderContentDesktop = (
    <div
      className="header-content"
      style={{
        display: showMenu ? "flex" : "none",
      }}
    >
      <div className="top-block">
        <Logo />

        <div className="header-close" onClick={() => setShowMenu(false)}>
          <img src="/images/close.svg" alt="close" />
        </div>
      </div>
      {/* mobile-search */}
      {MobileSearch}
      <div className="header-menu-outer">
        <ul className="header-menu">
          <li>
            <Link href="/">
              <a className="active">Home</a>
            </Link>
          </li>
        </ul>
        <div className="header-search-desktop">
          <img
            src="/images/search.svg"
            alt="search"
            onClick={() => {
              setSearch((search) => ({
                ...search,
                showSearch: true,
              }));
            }}
          />
        </div>
      </div>
      <ul className="header-socials">
        {config.social_links.map((link) => (
          <li key={link.link}>
            <a href={link.link}>
              <img src={link.image} alt="image" />
            </a>
          </li>
        ))}
      </ul>
      <ThemeSwitcher />
    </div>
  );

  return (
    <header>
      <div className="container">
        {HeaderContentMobile}
        {HeaderContentDesktop}
      </div>

      {search.showSearch && (
        <DesktopSearch
          search={search}
          setSearch={setSearch}
          desktopInputRef={desktopInputRef}
          filteredPosts={filteredPosts}
        />
      )}
    </header>
  );
};

export default Header;
