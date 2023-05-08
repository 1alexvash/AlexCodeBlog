const getFirstParagraph = (content: any) => {
  const { children } = content;

  const firstParagraph = children.find(
    (element: any) =>
      element.type === "p" && element.children[0].type === "text"
  );

  const { text } = firstParagraph.children[0];

  return text;
};

export default getFirstParagraph;
