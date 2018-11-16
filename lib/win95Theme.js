export default {
  fontFaces: {
    "MS Sans Serif": `
      @font-face {
        font-family: "MS Sans Serif";
        src: url("/static/MS Sans Serif.woff2") format("woff2"), url("/static/MS Sans Serif.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
        font-display: fallback;
      }

      @font-face {
        font-family: "MS Sans Serif";
        src: url("/static/MS Sans Serif Bold.woff2") format("woff2"),
          url("/static/MS Sans Serif Bold.ttf") format("truetype");
        font-weight: bold;
        font-style: normal;
        font-display: fallback;
      }`
  },
  fontFamilies: {
    default: `"MS Sans Serif", Tahoma, sans-serif`
  },
  fontSizes: ["11px"],
  colors: {
    gray: ["#000", "#868a8e", "#c3c7cb", "#fff"],
    red: "#fc0d1b",
    teal: "#59aaa9",
    navy: "#0414a7"
  },
  cursors: {
    default: "url(/static/cursor-default.png), default",
    wait: "url(/static/cursor-wait.png), wait"
  }
}