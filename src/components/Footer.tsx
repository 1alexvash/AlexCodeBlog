import { useAppSelector } from "redux/typesHooks";

const years = {
  initial: 2021,
  current: new Date().getFullYear()
}

const Footer = () => {
  const config = useAppSelector((state) => state.tinaData.mainConfig);

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img
              src="/images/footer-logo.svg"
              alt="footer-logo"
              width={180}
              height={51}
            />
          </div>
          <ul className="footer-socials">
            {config.socialLinks.map((link) => (
              <li key={link.link}>
                <a href={link.link}>
                  <img
                    src={link.image}
                    alt="image-link"
                    width="24"
                    height="24"
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="copyright">
            ©{years.initial} - {years.current}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
