import Link from "next/link";

interface Props {
  title: string;
}

const BreadCrumbs = ({ title }: Props) => (
  <div className="breadcrumbs-outer">
    <div className="container">
      <ul className="breadcrumbs">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <span>{title}</span>
        </li>
      </ul>
    </div>
  </div>
);

export default BreadCrumbs;
