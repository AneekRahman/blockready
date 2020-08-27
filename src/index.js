const JSConstructor = function (identifier) {
  if (identifier && identifier != "") {
    // Is an identifier string
    if (typeof identifier === "string")
      this.elements = document.querySelectorAll(identifier);
    // Is an element itself
    if (isElement(identifier)) this.elements = [identifier];
  }
};

function isElement(element) {
  return element instanceof Element || element instanceof HTMLDocument;
}

// Entry point
JSConstructor.prototype.style = function (styles) {
  // No elements found
  if (!this.elements || this.elements.length === 0) {
    console.error("JStyling: No elements found to style");
    return;
  }
  if (!styles) return;
  const styleKeys = Object.keys(styles);
  // No styles found
  if (!styleKeys || styleKeys.length === 0) {
    return;
  }

  document.querySelector("body").style.boxSizing = "border-box";
  document.querySelector("body").style.margin = "0";

  this.elements.forEach((element) => {
    styleKeys.forEach((styleName) => {
      element.style[styleName] = styles[styleName];
    });
  });
};

const JS = function (identifier) {
  return new JSConstructor(identifier);
};
// JStyling Ends

class BlockReady extends JS {
  constructor(identifier) {
    super(identifier);
    if (identifier && identifier != "") {
      // Is an identifier string
      if (typeof identifier === "string")
        this.elements = document.querySelectorAll(identifier);
      // Is an element itself
      if (isElement(identifier)) this.elements = [identifier];
    }
    this.initAllSpecialElements();
  }
  initAllSpecialElements = () => {
    // Cards are special elements
    const elements = document.querySelectorAll("card");
    elements.forEach((element) => {
      if (element.tagName.toUpperCase() === "CARD") {
        // Using BR creates a loop
        JS(element).style(BlockReady.STYLES.CARD.NORMAL);
        element.addEventListener("mouseover", (e) => {
          JS(element).style(BlockReady.STYLES.CARD.HOVERED);
        });
        element.addEventListener("mouseout", (e) => {
          JS(element).style(BlockReady.STYLES.CARD.NORMAL);
        });
      }
    });
  };
  static STYLES = {
    TEXT: {
      NORMAL: {
        fontFamily: "sans-serif",
        fontWeight: "400",
      },
      BOLD: {
        fontFamily: "sans-serif",
        fontWeight: "900",
      },
      ITALIC: {
        fontFamily: "sans-serif",
        fontStyle: "italic",
      },
    },
    BUTTON: {
      NORMAL: {
        fontSize: "1em",
        backgroundColor: "transparent",
        backgroundImage: "linear-gradient(rgba(0,0,0,.02), rgba(0,0,0,.03))",
        border: "1px solid rgba(0,0,0,.05)",
        color: "#006edb",
        padding: ".5em 1.6em",
        borderRadius: ".5em",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
        cursor: "pointer",
      },
      HOVERED: {
        backgroundColor: "#006edb",
        color: "white",
      },
      PRESSED: {
        backgroundColor: "#005fbd",
      },
    },
    CARD: {
      NORMAL: {
        opacity: "1",
        borderRadius: ".5em",
        marginTop: ".4em",
        overflow: "hidden",
        display: "block",
        border: "1px solid rgba(0,0,0,0.05)",
        backgroundColor: "rgba(0,0,0,.01)",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.04)",
      },
      HOVERED: {
        opacity: ".95",
        cursor: "pointer",
      },
    },
  };
  makeSetupStyle = (element, style) => {
    if (style) {
      // Style is present
      BR(element).style(style);
    } else {
      // Style is undefined, fallback to default styling
      if (
        element.tagName.toUpperCase() === "H1" ||
        element.tagName.toUpperCase() === "H2" ||
        element.tagName.toUpperCase() === "H3" ||
        element.tagName.toUpperCase() === "H4" ||
        element.tagName.toUpperCase() === "H5" ||
        element.tagName.toUpperCase() === "H6" ||
        element.tagName.toUpperCase() === "P"
      ) {
        BR(element).style(BlockReady.STYLES.TEXT.NORMAL);
      } else if (element.tagName.toUpperCase() === "BUTTON") {
        // Setting up button defaults
        BR(element).style(BlockReady.STYLES.BUTTON.NORMAL);
        BR("button").make({
          style: BlockReady.STYLES.BUTTON.NORMAL,
          onHover: (element, hovering) => {
            if (hovering) BR(element).style(BlockReady.STYLES.BUTTON.HOVERED);
            else BR(element).style(BlockReady.STYLES.BUTTON.NORMAL);
          },
        });
      }
    }
  };
  // Entry point
  make = ({ onHover, onPressed, style }) => {
    if (this.elements.length === 0) return;

    this.elements.forEach((element) => {
      // Setup styles
      this.makeSetupStyle(element, style);

      // Setup event listeners
      if (onPressed) {
        element.addEventListener("touchstart", (e) => {
          onPressed(element);
          BR(element).style(BlockReady.STYLES.BUTTON.PRESSED);
        });
        element.addEventListener("mousedown", (e) => {
          onPressed(element);
          BR(element).style(BlockReady.STYLES.BUTTON.PRESSED);
        });

        element.addEventListener("touchend", (e) =>
          BR(element).style(BlockReady.STYLES.BUTTON.HOVERED)
        );
        element.addEventListener("mouseup", (e) =>
          BR(element).style(BlockReady.STYLES.BUTTON.HOVERED)
        );
      }

      if (onHover) {
        element.addEventListener("mouseover", (e) => {
          onHover(element, true);
        });
        element.addEventListener("mouseout", (e) => {
          onHover(element, false);
        });
      }
    });

    return this;
  };
  all = () => {
    BR("p").style(BlockReady.STYLES.TEXT.NORMAL);
    BR("h1, h2, h3, h4, h5, h6").style(BlockReady.STYLES.TEXT.BOLD);
    BR("button").make({
      style: BlockReady.STYLES.BUTTON.NORMAL,
      onHover: (element, hovering) => {
        if (hovering) BR(element).style(BlockReady.STYLES.BUTTON.HOVERED);
        else BR(element).style(BlockReady.STYLES.BUTTON.NORMAL);
      },
    });
    this.initAllSpecialElements();
    BR("img").style({ marginBottom: "-.3em" });
  };
}

const BR = function (el) {
  const brbuilder = new BlockReady(el);
  return brbuilder;
};
