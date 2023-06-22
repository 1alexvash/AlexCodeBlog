import { isDefined } from "helpers/tinaHelpers";
import { useEffect } from "react";
import { resetPaginationPage } from "redux/slices/pagination";
import { resetTags, setTags } from "redux/slices/selectedTags";
import { useAppDispatch, useAppSelector } from "redux/typesHooks";
import { useEditState } from "tinacms/dist/react";

export interface Tag {
  readonly name: string;
  readonly postsCount: number;
}

interface Props {
  readonly tags: readonly Tag[];
}

interface TagItemProps {
  readonly isActive: boolean;
  readonly onClick: () => void;
  readonly tagName: string;
  readonly tagCount?: number;
}

interface TagsListProps {
  readonly tags: readonly TagItemProps[];
}

const MINIMUM_VISIBLE_COUNT = 2;
const SINGLE_POST_COUNT = 1;

const TagItem = ({
  isActive,
  onClick,
  tagName,
  tagCount,
}: TagItemProps): JSX.Element => (
  <li className={isActive ? "active" : ""} onClick={onClick}>
    {tagCount ? `${tagName} [${tagCount}]` : tagName}
  </li>
);

const TagsList = ({ tags }: TagsListProps): JSX.Element => (
  <ul className="filter-tags-list">
    {tags.map((tag) => (
      <TagItem key={tag.tagName} {...tag} />
    ))}
  </ul>
);

const Tags = ({ tags }: Props) => {
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

  const otherTagItems: readonly TagItemProps[] = tags
    .map(({ name, postsCount }) => {
      const isDefaultVisibleTag = postsCount >= MINIMUM_VISIBLE_COUNT;
      const isTemporaryVisibleTag =
        postsCount === SINGLE_POST_COUNT && selectedTags.includes(name);

      return edit || isTemporaryVisibleTag || isDefaultVisibleTag
        ? {
            isActive: selectedTags.includes(name) || isTemporaryVisibleTag,
            tagName: name,
            tagCount: edit ? postsCount : undefined,
            onClick: () => tagSelect(name),
          }
        : undefined;
    })
    .filter(isDefined);

  const allTagItem: TagItemProps = {
    tagName: "ALL",
    onClick: () => dispatch(resetTags()),
    isActive: selectedTags.length === 0 || tags.length === selectedTags.length,
  };

  return <TagsList tags={[allTagItem, ...otherTagItems]} />;
};

export default Tags;
