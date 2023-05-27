import { useEffect } from "react";
import { resetPaginationPage } from "redux/slices/pagination";
import { resetTags, setTags } from "redux/slices/selectedTags";
import { useAppDispatch, useAppSelector } from "redux/typesHooks";

interface Props {
  uniqueTags: string[];
  countOfPostsInTags: number[];
}

const Tags = ({ uniqueTags, countOfPostsInTags }: Props) => {
  const selectedTags = useAppSelector((state) => state.selectedTags);

  const dispatch = useAppDispatch();

  const noneTagSelected = selectedTags.length === 0;
  const allTagsSelected = uniqueTags.length === selectedTags.length;
  const filteredUniqueTags = uniqueTags.filter(
    (_, index) => countOfPostsInTags[index] >= 2
  );

  const tagsWithOnePosts = uniqueTags.filter(
    (_, index) => countOfPostsInTags[index] === 1
  );

  useEffect(() => {
    dispatch(resetPaginationPage());
  }, [dispatch, selectedTags]);

  return (
    <ul className="filter-tags-list">
      <li
        className={noneTagSelected || allTagsSelected ? "active" : ""}
        onClick={() => dispatch(resetTags())}
      >
        ALL
      </li>
      {Array.prototype.concat(
        filteredUniqueTags.map((uniqueTag) => (
          <li
            key={uniqueTag}
            className={selectedTags.includes(uniqueTag) ? "active" : ""}
            onClick={() => {
              if (selectedTags.includes(uniqueTag)) {
                const updatedTags = selectedTags.filter(
                  (tag) => tag !== uniqueTag
                );

                dispatch(setTags(updatedTags));
              } else {
                dispatch(setTags([...selectedTags, uniqueTag]));
              }
            }}
          >
            {uniqueTag}
          </li>
        )),
        tagsWithOnePosts.map((tag) =>
          selectedTags.includes(tag) ? (
            <li
              key={tag}
              className="active animation-appear"
              onClick={() => dispatch(resetTags())}
            >
              {tag}
            </li>
          ) : null
        )
      )}
    </ul>
  );
};

export default Tags;
