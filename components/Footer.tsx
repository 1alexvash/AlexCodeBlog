import { useAppSelector } from "redux/typesHooks";

const currentYear = new Date().getFullYear();

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
            ©{currentYear} - Alex-code <span className="divider">|</span> All
            right reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
