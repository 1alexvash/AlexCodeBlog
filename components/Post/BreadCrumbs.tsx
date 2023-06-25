import Link from "next/link";
import { useEditState } from "tinacms/dist/react";

interface Props {
  title: string;
}

const BreadCrumbs = ({ title }: Props) => {
  const { edit } = useEditState();

  return (
    <div className="breadcrumbs-outer">
      <div className="container">
        <ul className="breadcrumbs">
          <li>
            <Link href={edit ? "/AdminPortal" : "/"}>Home</Link>
          </li>
          <li>
            <span>{title}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BreadCrumbs;
