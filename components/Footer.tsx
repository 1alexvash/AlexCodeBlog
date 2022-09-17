import config from "config";

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer>
    <div className="container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/images/footer-logo.svg" alt="footer-logo" />
        </div>
        <ul className="footer-socials">
          {config.social_links.map((link) => (
            <li key={link.link}>
              <a href={link.link}>
                <img src={link.image} alt="image-link" />
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

export default Footer;
