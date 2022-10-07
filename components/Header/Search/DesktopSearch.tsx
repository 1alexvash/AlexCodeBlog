import { PostDocumentWithoutContent } from "interfaces";
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
  filteredPosts: PostDocumentWithoutContent[];
  setSearchAndOverflow: (val: boolean) => void;
}

const DesktopSearch = ({
  search,
  setSearch,
  desktopInputRef,
  filteredPosts,
  setSearchAndOverflow,
}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="search-overlay-desktop">
      <div className="desktop-search">
        <div className="container">
          <div className="desktop-search-content">
            <form
              action="#"
              method="post"
              className="desktop-search-form simple-form"
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
                  ref={desktopInputRef}
                />
              </div>
            </form>

            {search.isLoaded ? (
              filteredPosts.length > 0 ? (
                <div className="desktop-search-results">
                  {filteredPosts.map((post, index) => (
                    <div className="related-posts-block" key={index}>
                      <a href={`/post/${post.slug}`} className="image">
                        <img src={post.featuredImage} alt="blog post image" />
                      </a>
                      <div className="inner">
                        <a href={`/post/${post.slug}`} className="name">
                          {post.title}
                        </a>
                        <div className="tags">
                          {post.tags.map((tag) => (
                            <Link href="/" key={tag}>
                              <a
                                href=""
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
                              </a>
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
        </div>
      </div>
      <div className="close-search" onClick={() => setSearchAndOverflow(false)}>
        <img src="/images/close-search.svg" alt="search" />
      </div>
    </div>
  );
};

export default DesktopSearch;
