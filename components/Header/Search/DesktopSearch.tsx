import { PostDocumentWithoutBody } from "interfaces";
import Link from "next/link";
import React, { Dispatch, RefObject, SetStateAction } from "react";
import { setTags } from "redux/slices/selectedTags";
import { useAppDispatch } from "redux/typesHooks";

import { Search } from "..";
import DesktopSkeletons from "./DesktopSkeletons";
import NotFound from "./NotFound";

interface Props {
  search: Search;
  setSearch: Dispatch<SetStateAction<Search>>;
  desktopInputRef: RefObject<HTMLInputElement>;
  filteredPosts: PostDocumentWithoutBody[];
}

const DesktopSearch = ({
  search,
  setSearch,
  desktopInputRef,
  filteredPosts,
}: Props) => {
  const dispatch = useAppDispatch();

  const closeSearch = () => {
    setSearch((search) => ({
      ...search,
      showSearch: false,
    }));
  };

  return (
    <div className="search-overlay-desktop" onClick={closeSearch}>
      <div
        className="desktop-search container search-block"
        onClick={(event) => event.stopPropagation()}
      >
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
          onKeyUp={(event) => {
            if (event.key === "Escape") {
              closeSearch();
            }
          }}
          ref={desktopInputRef}
        />

        {search.isLoaded ? (
          filteredPosts.length > 0 ? (
            <div className="desktop-search-results">
              {filteredPosts.map((post, index) => (
                <div className="related-posts-block" key={index}>
                  <a href={`/post/${post.slug}`} className="image">
                    <img
                      src={post.featuredImage ?? "/post-images/placeholder.png"}
                      alt="blog post image"
                    />
                  </a>
                  <div className="inner">
                    <a href={`/post/${post.slug}`} className="name">
                      {post.title}
                    </a>
                    <div className="tags">
                      {post.tags.map((tag) => (
                        <Link
                          href="/"
                          key={tag}
                          onClick={() => {
                            setSearch((search) => ({
                              ...search,
                              showSearch: false,
                            }));

                            dispatch(setTags([tag]));
                          }}
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NotFound />
          )
        ) : (
          <DesktopSkeletons />
        )}
      </div>
      <div className="close-search" onClick={closeSearch}>
        <img src="/images/close-search.svg" alt="search" />
      </div>
    </div>
  );
};

export default DesktopSearch;
