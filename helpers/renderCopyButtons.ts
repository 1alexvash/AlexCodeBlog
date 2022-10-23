import { MouseEventHandler, RefObject } from "react";
type Target = HTMLButtonElement | HTMLSpanElement | HTMLImageElement;

const onClickCheck: MouseEventHandler<HTMLDivElement> = (event) => {
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

  const copyText = (text: string): void => {
    navigator.clipboard.writeText(text);
  };

  const setCopied = (
    squares: HTMLElement,
    spanText: ChildNode | HTMLElement
  ): void => {
    squares.style.display = "none";

    spanText.textContent = "Copied!";

    setTimeout(() => {
      squares.style.display = "block";
      spanText.textContent = "Copy";
    }, 3000);
  };

  if (target instanceof HTMLButtonElement) {
    const targetChildren = target.childNodes;
    const spanText = targetChildren[1];
    const squares = targetChildren[0];
    const textToCopy = target.parentElement?.childNodes[1]?.textContent ?? " ";

    if (
      !(squares instanceof HTMLElement) ||
      !spanText ||
      !targetClasslistCheck(target)
    ) {
      return;
    }

    setCopied(squares, spanText);

    copyText(textToCopy);
  } else if (target instanceof HTMLSpanElement) {
    const squares = target?.parentElement?.childNodes[0];
    const textToCopy =
      target.parentElement?.parentElement?.childNodes[1]?.textContent ?? " ";

    if (!(squares instanceof HTMLElement) || !targetClasslistCheck(target)) {
      return;
    }

    setCopied(squares, target);

    copyText(textToCopy);
  } else if (target instanceof HTMLImageElement) {
    const spanText = target.parentElement?.childNodes[1];
    const textToCopy =
      target.parentElement?.parentElement?.childNodes[1]?.textContent ?? " ";

    if (
      !(target instanceof HTMLElement) ||
      !spanText ||
      !targetClasslistCheck(target)
    ) {
      return;
    }

    setCopied(target, spanText);

    copyText(textToCopy);
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

const renderCopyButtons = (doc: RefObject<HTMLDivElement>): void => {
  const codeSnippets = doc.current?.querySelectorAll("div.remark-highlight");

  if (codeSnippets === undefined) {
    return;
  }

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
  });
};

export { onClickCheck, renderCopyButtons };
