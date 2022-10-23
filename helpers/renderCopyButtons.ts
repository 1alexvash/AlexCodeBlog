import { RefObject } from "react";
type Target = HTMLButtonElement | HTMLSpanElement | HTMLImageElement;

const onClickCheck = (event: MouseEvent): void => {
  const target = event.target;

  const targetClasslistCheck = (target: Target) => {
    if (
      target.className === "btn-copy" ||
      target.className === "btn-copy-img" ||
      target.className === "btn-copy-text"
    ) {
      return true;
    }
  };

  const areChildNodesAndClassesValid = (
    buttonImg: ChildNode,
    buttonText: ChildNode,
    target: Target
  ): buttonImg is HTMLElement => {
    if (
      buttonImg instanceof HTMLElement &&
      buttonText &&
      targetClasslistCheck(target)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const copyText = (text: string): void => {
    navigator.clipboard.writeText(text);
  };

  const setCopied = (squares: HTMLElement, spanText: ChildNode): void => {
    squares.style.display = "none";

    spanText.textContent = "Copied!";

    setTimeout(() => {
      squares.style.display = "block";
      spanText.textContent = "Copy";
    }, 3000);
  };

  const checkAndCopyText = (
    buttonIcon: ChildNode,
    buttonText: ChildNode,
    target: Target,
    textToCopy: string
  ) => {
    if (!areChildNodesAndClassesValid(buttonIcon, buttonText, target)) {
      return;
    }

    setCopied(buttonIcon, buttonText);

    copyText(textToCopy);
  };

  if (target instanceof HTMLButtonElement) {
    const targetChildren = target.childNodes;
    const buttonIcon = targetChildren[0];
    const buttonText = targetChildren[1];
    const textToCopy = target.parentElement?.childNodes[1]?.textContent ?? " ";

    checkAndCopyText(buttonIcon, buttonText, target, textToCopy);
  } else if (
    target instanceof HTMLElement &&
    target.parentElement instanceof HTMLButtonElement
  ) {
    const parentButton = target?.parentElement;
    const buttonChildNodes = parentButton?.childNodes;

    const buttonIcon = buttonChildNodes[0];
    const buttonText = buttonChildNodes[1];
    const textToCopy =
      parentButton?.parentElement?.childNodes[1]?.textContent ?? " ";

    checkAndCopyText(buttonIcon, buttonText, target, textToCopy);
  }
};

const createCopyButton = (): HTMLButtonElement => {
  const button = document.createElement("button");
  const buttonIcon = document.createElement("img");
  const buttonText = document.createElement("span");

  button.classList.add("btn-copy");
  button.style.display = "none";
  button.setAttribute("type", "button");
  buttonIcon.setAttribute("src", "/images/copy-button-icon.svg");
  buttonIcon.classList.add("btn-copy-img");
  buttonText.classList.add("btn-copy-text");
  buttonText.innerHTML = "Copy";

  button.appendChild(buttonIcon);
  button.append(buttonText);

  return button;
};

const renderCopyButtons = (doc: RefObject<HTMLDivElement>): (() => void) => {
  const codeSnippets =
    doc.current?.querySelectorAll("div.remark-highlight") ?? [];

  codeSnippets.forEach((item) => {
    if (item.childNodes.length === 2) {
      return;
    }
    item.prepend(createCopyButton());

    const button = item.childNodes[0];

    if (!(button instanceof HTMLElement)) {
      return;
    }

    const buttonStyle = button.style;

    item.addEventListener("mouseenter", () => {
      buttonStyle.display = "flex";
    });

    item.addEventListener("mouseleave", () => {
      buttonStyle.display = "none";
    });
    button.addEventListener("click", (event) => {
      onClickCheck(event);
    });
  });
  return (): void => {
    codeSnippets.forEach((item) =>
      item.childNodes[0].removeEventListener("click", (event) => {
        if (!(event instanceof MouseEvent)) {
          return;
        }
        onClickCheck(event);
      })
    );
  };
};

export default renderCopyButtons;
