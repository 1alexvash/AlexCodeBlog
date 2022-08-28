interface Props {
  uniqueTags: string[];
}

const Tags = ({ uniqueTags }: Props) => (
  <ul className="filter-tags-list">
    <li>
      <a href="" className="active">
        ALL
      </a>
    </li>
    {uniqueTags.map((uniqueTag) => (
      <li key={uniqueTag}>
        <a href="">{uniqueTag}</a>
      </li>
    ))}
  </ul>
);

export default Tags;
