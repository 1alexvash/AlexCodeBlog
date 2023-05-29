import { useCallback, useEffect, useMemo, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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

  const tagSelect = useCallback(
    (uniqueTag: string): void => {
      if (selectedTags.includes(uniqueTag)) {
        const updatedTags = selectedTags.filter((tag) => tag !== uniqueTag);

        dispatch(setTags(updatedTags));
      } else {
        dispatch(setTags([...selectedTags, uniqueTag]));
      }
    },
    [dispatch, selectedTags]
  );

  const basicTags = useMemo(
    () =>
      filteredUniqueTags.map((uniqueTag) => (
        <li
          key={uniqueTag}
          className={selectedTags.includes(uniqueTag) ? "active" : ""}
          onClick={() => tagSelect(uniqueTag)}
        >
          {uniqueTag}
        </li>
      )),
    [filteredUniqueTags, selectedTags, tagSelect]
  );

  const additionalTags = useMemo(() => {
    return tagsWithOnePosts.map((uniqueTag) =>
      selectedTags.includes(uniqueTag) ? (
        <li
          key={uniqueTag}
          className="active"
          onClick={() => tagSelect(uniqueTag)}
        >
          {uniqueTag}
        </li>
      ) : null
    );
  }, [tagsWithOnePosts, selectedTags, tagSelect]);

  const renderTags: JSX.Element[] = Array.prototype
    .concat(basicTags, additionalTags)
    .filter((tag) => tag !== null);

  return (
    <ul className="filter-tags-list">
      <li
        className={noneTagSelected || allTagsSelected ? "active" : ""}
        onClick={() => dispatch(resetTags())}
      >
        ALL
      </li>
      {renderTags}
    </ul>
  );
};

export default Tags;
