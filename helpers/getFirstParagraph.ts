const getFirstParagraph = (content: any) => {
  if (content.children.length === 0) {
    return null;
  }

  const { children } = content;

  const firstParagraph = children.find(
    (element: any) =>
      element.type === "p" && element.children[0].type === "text"
  );

  const text = firstParagraph ? firstParagraph.children[0].text : null;

  return text;
};

export default getFirstParagraph;
