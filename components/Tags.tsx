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
  const admin = useAppSelector((state) => state.admin);

  const dispatch = useAppDispatch();

  const noneTagSelected = selectedTags.length === 0;
  const allTagsSelected = uniqueTags.length === selectedTags.length;

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
      {uniqueTags.map((uniqueTag, index) => (
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
          {admin && `[${countOfPostsInTags[index]}]`}
        </li>
      ))}
    </ul>
  );
};

export default Tags;
