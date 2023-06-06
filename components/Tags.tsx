import { useCallback, useEffect, useMemo } from "react";
import { resetPaginationPage } from "redux/slices/pagination";
import { resetTags, setTags } from "redux/slices/selectedTags";
import { useAppDispatch, useAppSelector } from "redux/typesHooks";
import { useEditState } from "tinacms/dist/react";
interface Props {
  sortedTags: [string, number][];
}

const Tags = ({ sortedTags }: Props) => {
  const selectedTags = useAppSelector((state) => state.selectedTags);

  const { edit } = useEditState();

  const dispatch = useAppDispatch();

  const noneTagSelected = selectedTags.length === 0;
  const allTagsSelected = sortedTags.length === selectedTags.length;

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

  const tags = useMemo(
    () =>
      sortedTags
        .map((tag) => {
          const tagName = tag[0];
          const tagCount = tag[1];

          if (edit) {
            return (
              <li
                key={tagName}
                className={selectedTags.includes(tagName) ? "active" : ""}
                onClick={() => tagSelect(tagName)}
              >
                {`${tagName} [${tagCount}]`}
              </li>
            );
          }

          const isBasicTag = tagCount >= 2;
          const isAdditionalTag =
            tagCount === 1 && selectedTags.includes(tagName);

          if (isBasicTag) {
            return (
              <li
                key={tagName}
                className={selectedTags.includes(tagName) ? "active" : ""}
                onClick={() => tagSelect(tagName)}
              >
                {tagName}
              </li>
            );
          }

          if (isAdditionalTag) {
            return (
              <li
                key={tagName}
                className="active"
                onClick={() => tagSelect(tagName)}
              >
                {tagName}
              </li>
            );
          }

          return null;
        })
        .filter((tag) => tag),
    [sortedTags, edit, selectedTags, tagSelect]
  );

  return (
    <ul className="filter-tags-list">
      <li
        className={noneTagSelected || allTagsSelected ? "active" : ""}
        onClick={() => dispatch(resetTags())}
      >
        ALL
      </li>
      {tags}
    </ul>
  );
};

export default Tags;
