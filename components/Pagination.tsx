import { setPaginationPage } from "redux/slices/pagination";
import { useAppDispatch, useAppSelector } from "redux/typesHooks";

interface Props {
  pagesCount: number;
}

const Pagination = ({ pagesCount }: Props) => {
  const currentPage = useAppSelector((state) => state.pagination.currentPage);

  const dispatch = useAppDispatch();

  return (
    <ul className="pagination">
      {Array.from({ length: pagesCount }, (_, index) => (
        <li
          key={index}
          className={currentPage === index ? "active" : ""}
          onClick={() => dispatch(setPaginationPage(index))}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
