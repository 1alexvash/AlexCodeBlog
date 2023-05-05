import { PostDocumentWithoutBody } from "interfaces";
import Image from "next/image";
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
  filteredPosts: PostDocumentWithoutBody[];
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
    <div className="mobile-search search-block">
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

      {search.value.trim().length > 0 ? (
        search.isLoaded ? (
          filteredPosts.length > 0 ? (
            <div className="mobile-search-results">
              {filteredPosts.map((post, index) => (
                <div className="mobile-posts-block" key={index}>
                  <div className="inner-flex">
                    <a href={`/post/${post._sys.filename}`} className="image">
                      <Image
                        src={post.heroImage ?? "/post-images/placeholder.png"}
                        alt="blog post image"
                        width="51"
                        height="51"
                      />
                    </a>
                    <a href={`/post/${post._sys.filename}`} className="name">
                      {post.title}
                    </a>
                  </div>
                  <div className="tags">
                    {post.tags.map((tag) => (
                      <Link
                        href="/"
                        key={tag}
                        onClick={() => {
                          setShowMenu(false);
                          dispatch(setTags([tag]));
                        }}
                      >
                        #{tag}
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
        )
      ) : null}

      {search.value.trim().length > 0 && (
        <div
          className="mobile-search-overlay"
          onClick={() => {
            setSearch({
              ...search,
              value: "",
            });
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
            <Image
              src="/images/close-search.svg"
              alt="search"
              width="28"
              height="26"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSearch;
