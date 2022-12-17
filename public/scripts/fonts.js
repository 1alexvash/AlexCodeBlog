(async () => {
  const isApple =
    ["iPad", "iPhone", "iPod"].includes(navigator.platform) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  const defaultDescriptors = {
    style: "normal",
    weight: "400",
    display: "swap",
  };

  const emojiUnicodes = isApple
    ? []
    : await fetch("/fonts/emojiUnicodes.json").then((response) =>
        response.json()
      );

  const fonts = [].concat(
    emojiUnicodes.map(
      (unicode, index) =>
        new FontFace(
          "Noto Color Emoji",
          `url(https://fonts.gstatic.com/s/notocoloremoji/v24/Yq6P-KqIXTD0t4D9z1ESnKM3-HpFabsE4tq3luCC7p-aXxcn.${index}.woff2) format('woff2')`,
          {
            ...defaultDescriptors,
            unicodeRange: unicode,
          }
        )
    )
  );

  try {
    await Promise.all(
      fonts.map(async (font) => {
        await font.load();
        document.fonts.add(font);
      })
    );
  } catch (error) {
    console.log(error);
  }
})();
