import { isDefined } from "helpers/tinaHelpers";
import { ReactElement, useEffect } from "react";
import { resetPaginationPage } from "redux/slices/pagination";
import { resetTags, setTags } from "redux/slices/selectedTags";
import { useAppDispatch, useAppSelector } from "redux/typesHooks";
import { useEditState } from "tinacms/dist/react";

export interface TagData {
  readonly tagName: string;
  readonly postsCount: number;
}

interface Props {
  readonly sortedTags: readonly TagData[];
}
interface TagItemProps {
  readonly isActive: boolean;
  readonly onClick: () => void;
  readonly tagName: string;
  readonly tagCount?: number;
}

interface TagsListProps {
  readonly tagsData: readonly TagItemProps[];
}

const TagItem = ({
  isActive,
  onClick,
  tagName,
  tagCount,
}: TagItemProps): ReactElement => {
  return (
    <li className={isActive ? "active" : ""} onClick={onClick}>
      {tagCount ? `${tagName} [${tagCount}]` : tagName}
    </li>
  );
};

const TagsList = ({ tagsData }: TagsListProps): ReactElement => {
  return (
    <ul className="filter-tags-list">
      {tagsData.map((tagData) => (
        <TagItem key={tagData.tagName} {...tagData} />
      ))}
    </ul>
  );
};

const Tags = ({ sortedTags }: Props) => {
  const selectedTags = useAppSelector((state) => state.selectedTags);

  const { edit } = useEditState();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetPaginationPage());
  }, [dispatch, selectedTags]);

  const tagSelect = (uniqueTag: string): void => {
    if (selectedTags.includes(uniqueTag)) {
      const updatedTags = selectedTags.filter((tag) => tag !== uniqueTag);

      dispatch(setTags(updatedTags));
    } else {
      dispatch(setTags([...selectedTags, uniqueTag]));
    }
  };

  const tagsData: readonly TagItemProps[] = sortedTags
    .map(({ tagName, postsCount }) => {
      const isBasicTag = postsCount >= 2;
      const isAdditionalTag =
        postsCount === 1 && selectedTags.includes(tagName);

      return edit || isAdditionalTag || isBasicTag
        ? {
            isActive: selectedTags.includes(tagName) || isAdditionalTag,
            tagName,
            tagCount: edit ? postsCount : undefined,
            onClick: () => tagSelect(tagName),
          }
        : undefined;
    })
    .filter(isDefined);

  const allTagData: TagItemProps = {
    tagName: "ALL",
    onClick: () => dispatch(resetTags()),
    isActive:
      selectedTags.length === 0 || sortedTags.length === selectedTags.length,
  };

  return <TagsList tagsData={[allTagData, ...tagsData]} />;
};

export default Tags;
