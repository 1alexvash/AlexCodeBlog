import { PostDocumentWithoutContent } from "interfaces";
import Link from "next/link";
import React, { Dispatch, RefObject, SetStateAction } from "react";
import { setTags } from "redux/slices/selectedTags";
import { useAppDispatch } from "redux/typesHooks";

import { Search } from "..";
import MobileSkeletons from "./MobileSkeletons";
import NotFound from "./NotFound";

interface Props {
  search: Search;
  setSearch: Dispatch<SetStateAction<Search>>;
  mobileInputRef: RefObject<HTMLInputElement>;
  filteredPosts: PostDocumentWithoutContent[];
  setShowMenu: Dispatch<SetStateAction<boolean>>;
}

const MobileSearch = ({
  search,
  setSearch,
  mobileInputRef,
  filteredPosts,
  setShowMenu,
}: Props) => {
  const dispatch = useAppDispatch();

  return (
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
            <NotFound />
          )
        ) : (
          <MobileSkeletons />
        )}
      </div>

      {search.value.trim().length > 0 && (
        <div className="mobile-search-overlay">
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
      )}
    </div>
  );
};

export default MobileSearch;
