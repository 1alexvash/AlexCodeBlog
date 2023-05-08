import { RefObject } from "react";

const onClickCheck = (event: MouseEvent): void => {
  const { target } = event;

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
    buttonIcon: Element | null,
    buttonText: Element | null,
    textToCopy: string
  ) => {
    if (!(buttonIcon instanceof HTMLElement && buttonText)) {
      return;
    }

    setCopied(buttonIcon, buttonText);

    copyText(textToCopy);
  };

  if (target instanceof HTMLButtonElement) {
    const buttonIcon = target.querySelector("img.btn-copy-img");
    const buttonText = target.querySelector("span.btn-copy-text");
    const textToCopy =
      target.parentElement?.querySelector("code")?.textContent ?? " ";

    checkAndCopyText(buttonIcon, buttonText, textToCopy);
  } else if (
    target instanceof HTMLElement &&
    target.parentElement instanceof HTMLButtonElement
  ) {
    const targetParent = target?.parentElement;
    const buttonIcon = targetParent.querySelector("img.btn-copy-img");
    const buttonText = targetParent.querySelector("span.btn-copy-text");
    const textToCopy =
      target?.parentElement?.parentElement?.querySelector("code")
        ?.textContent ?? " ";

    checkAndCopyText(buttonIcon, buttonText, textToCopy);
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

const renderCopyButtons = (document: RefObject<HTMLDivElement>) => {
  const codeSnippets =
    document.current?.querySelectorAll(".syntax-highlighting") ?? [];

  codeSnippets.forEach((codeSnippet) => {
    if (
      codeSnippet.querySelector("button.btn-copy") ||
      !(codeSnippet instanceof HTMLElement)
    ) {
      return;
    }

    codeSnippet.prepend(createCopyButton());

    const button = codeSnippet.childNodes[0];

    if (!(button instanceof HTMLElement)) {
      return;
    }

    if (codeSnippet.clientHeight <= 60) {
      button.style.top = "6px";
    }

    codeSnippet.addEventListener("mouseenter", () => {
      button.style.display = "flex";
    });

    codeSnippet.addEventListener("mouseleave", () => {
      button.style.display = "none";
    });

    button.addEventListener("click", (event) => {
      onClickCheck(event);
    });
  });

  return () => {
    codeSnippets.forEach((codeSnippet) => {
      codeSnippet
        .querySelector("button.btn-copy")
        ?.removeEventListener("click", (event) => {
          if (!(event instanceof MouseEvent)) {
            return;
          }

          onClickCheck(event);
        });
    });
  };
};

export default renderCopyButtons;
