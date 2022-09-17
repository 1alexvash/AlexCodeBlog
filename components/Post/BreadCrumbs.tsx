import Link from 'next/link';

const BreadCrumbs = () => (
  <div className='breadcrumbs-outer'>
    <div className='container'>
      <ul className='breadcrumbs'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <span>How To Build Your Own Comment System Using Firebase</span>
        </li>
      </ul>
    </div>
  </div>
);

export default BreadCrumbs;
