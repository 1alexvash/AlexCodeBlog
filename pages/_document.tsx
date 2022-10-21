import { Head, Html, Main, NextScript } from "next/document";
const Document = () => {
  const setInitialTheme = `function getTheme() {
	console.log(localStorage.theme);
	const theme = localStorage.theme;
	if(theme==='dark') {
		return 'dark-theme';
	} else {
		return 'light-theme';
	}
}
    document.body.classList.add(getTheme())`;

  return (
    <Html>
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default Document;
