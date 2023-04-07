function getFirstParagraph(content: any) {
  const children = content.children;

  const firstParagraph = children.find(
    (element: any) =>
      element.type === "p" && element.children[0].type === "text"
  );

  const text = firstParagraph.children[0].text;

  return text;
}

export default getFirstParagraph;
