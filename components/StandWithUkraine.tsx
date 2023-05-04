import Image from "next/image";

const StandWithUkraine = () => (
  <div className="ukraine-support">
    <div className="container">
      <div className="ukraine-flex">
        <Image
          width="20"
          height="20"
          src="/images/ua-flag.webp"
          alt="ua-flag"
        />
        <a
          href="https://war.ukraine.ua/support-ukraine/"
          target="_blank"
          rel="noreferrer"
        >
          <strong>#StandWithUkraine</strong> (Find out how you can help)
        </a>
      </div>
    </div>
  </div>
);

export default StandWithUkraine;
