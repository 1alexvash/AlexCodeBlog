function getFirstParagraph(string: string) {
  // TOOD: fix it, as it is broken on the Tina CMS branch
  // const openedElement = string.indexOf("<p>") + 3;
  // const closedElement = string.indexOf("</p>");

  // return string.slice(openedElement, closedElement);

  return "Article Description";
}

export default getFirstParagraph;
