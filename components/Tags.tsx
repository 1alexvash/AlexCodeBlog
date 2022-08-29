import { resetTags, updateTags } from "redux/slices/selectedTags";
import { useAppDispatch, useAppSelector } from "redux/typesHooks";

interface Props {
  uniqueTags: string[];
}

const Tags = ({ uniqueTags }: Props) => {
  const selectedTags = useAppSelector((state) => state.selectedTags);

  const dispatch = useAppDispatch();

  const noneTagSelected = selectedTags.length === 0;
  const allTagsSelected = uniqueTags.length === selectedTags.length;

  return (
    <ul className="filter-tags-list">
      <li
        className={noneTagSelected || allTagsSelected ? "active" : ""}
        onClick={() => dispatch(resetTags())}
      >
        ALL
      </li>
      {uniqueTags.map((uniqueTag) => (
        <li
          key={uniqueTag}
          className={selectedTags.includes(uniqueTag) ? "active" : ""}
          onClick={() => {
            if (selectedTags.includes(uniqueTag)) {
              const updatedTags = selectedTags.filter(
                (tag) => tag !== uniqueTag
              );

              dispatch(updateTags(updatedTags));
            } else {
              dispatch(updateTags([...selectedTags, uniqueTag]));
            }
          }}
        >
          {uniqueTag}
        </li>
      ))}
    </ul>
  );
};

export default Tags;
