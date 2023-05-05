import config from "config";
import Image from "next/image";
const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer>
    <div className="container">
      <div className="footer-content">
        <div className="footer-logo">
          <Image
            src="/images/footer-logo.svg"
            alt="footer-logo"
            width={180}
            height={51}
            priority
          />
        </div>
        <ul className="footer-socials">
          {config.social_links.map((link) => (
            <li key={link.link}>
              <a href={link.link}>
                <Image
                  src={link.image}
                  alt="image-link"
                  width={link.width}
                  height={link.height}
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

export default Footer;
