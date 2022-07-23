const Footer = () => (
  <footer>
    <div className="container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="images/footer-logo.svg" alt="" />
        </div>
        <ul className="footer-socials">
          <li>
            <a href="https://t.me/HeWorksSoHard">
              <img src="images/telegram.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="https://github.com/1alexvash">
              <img src="images/github-gray.svg" alt="" />
            </a>
          </li>
          <li>
            <a href="mailto:1alexvash@gmail.com">
              <img src="images/mail.svg" alt="" />
            </a>
          </li>
        </ul>
        <div className="copyright">
          ©{new Date().getFullYear()} - Alex-code{" "}
          <span className="divider">|</span> All right reserved
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
