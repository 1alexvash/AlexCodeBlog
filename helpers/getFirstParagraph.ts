function getFirstParagraph(string: string) {
  const openedElement = string.indexOf("<p>") + 3;
  const closedElement = string.indexOf("</p>");

  return string.slice(openedElement, closedElement);
}

export default getFirstParagraph;
