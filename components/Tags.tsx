import { useState } from "react";

interface Props {
  uniqueTags: string[];
}

const Tags = ({ uniqueTags }: Props) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const noneTagSelected = selectedTags.length === 0;
  const allTagsSelected = uniqueTags.length === selectedTags.length;

  return (
    <ul className="filter-tags-list">
      <li
        className={noneTagSelected || allTagsSelected ? "active" : ""}
        onClick={() => setSelectedTags([])}
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
              setSelectedTags(updatedTags);
            } else {
              setSelectedTags([...selectedTags, uniqueTag]);
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
