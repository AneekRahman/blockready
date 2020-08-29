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
JSConstructor.prototype.style = function (styles = {}) {
  // No elements found
  if (!this.elements || this.elements.length === 0) {
    console.error("JStyling: No elements found to style");
    return;
  }
  const styleKeys = Object.keys(styles);
  // No styles found
  if (!styleKeys || styleKeys.length === 0) {
    return;
  }

  if (this.elements.length === 1) {
    styleKeys.forEach((styleName) => {
      this.elements[0].style[styleName] = styles[styleName];
    });
  } else if (this.elements.length > 1) {
    this.elements.forEach((element) => {
      styleKeys.forEach((styleName) => {
        element.style[styleName] = styles[styleName];
      });
    });
  }
};

// !!!!! ---------- EXTENSION ONLY FOR BlockReady ---------- !!!!!
JSConstructor.prototype.removeStyle = function (styles = {}) {
  // No elements found
  if (!this.elements || this.elements.length === 0) {
    console.error("JStyling: No elements found to style");
    return;
  }
  const styleKeys = Object.keys(styles);
  // No styles found
  if (!styleKeys || styleKeys.length === 0) {
    return;
  }

  if (this.elements.length === 1) {
    styleKeys.forEach((styleName) => {
      this.elements[0].style.removeProperty(styleName);
      this.elements[0].style[styleName] = "";
    });
  } else if (this.elements.length > 1) {
    this.elements.forEach((element) => {
      styleKeys.forEach((styleName) => {
        element.style.removeProperty(styleName);
        this.elements[0].style[styleName] = "";
      });
    });
  }
};
// !!!!! ---------- EXTENSION ONLY FOR BlockReady ---------- !!!!!

const JS = function (identifier) {
  return new JSConstructor(identifier);
};

// JStyling Ends

let BR_LOADED_THEME;
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
    if (!BR_LOADED_THEME) {
      BR_LOADED_THEME = BlockReady.THEME;
    }
  }
  static THEME = {
    // Standard HTML Elements
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
      HOVERING: {
        backgroundColor: "#006edb",
        color: "white",
      },
      PRESSING: {
        backgroundColor: "#005fbd",
        color: "white",
      },
    },
    P: {
      NORMAL: {
        lineHeight: "1.4em",
      },
    },
    LI: {
      NORMAL: {
        margin: ".7em 0",
        fontSize: "1.1em",
      },
    },
    A: {
      NORMAL: {
        color: "#005fbd",
      },
      HOVERING: {
        color: "#003870",
      },
    },
    TABLE: {
      NORMAL: {
        borderCollapse: "collapse",
        overflowX: "auto",
      },
    },
    TH: {
      NORMAL: {
        border: "1px solid rgba(0,0,0,.1)",
        padding: ".6em 1em",
        backgroundColor: "transparent",
      },
      HOVERING: {
        backgroundColor: "rgba(0,0,0,0.03)",
      },
    },
    TD: {
      NORMAL: {
        border: "1px solid rgba(0,0,0,.07)",
        padding: ".6em 1em",
        textAlign: "center",
        backgroundColor: "transparent",
      },
      HOVERING: {
        backgroundColor: "rgba(0,0,0,0.03)",
      },
    },
    INPUT: {
      NORMAL: {
        border: "1px solid rgba(0,0,0,.05)",
        padding: ".4em 1em",
        fontSize: "1.2em",
        borderRadius: ".2em",
      },
    },
    // Create your own elements
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
        padding: "1.5em",
      },
    },
  };

  initAllElementsDefaultStyles = () => {
    // Gather all special elements nameTags
    const styleKeys = Object.keys(BR_LOADED_THEME);
    if (styleKeys.length === 0) return;

    // Query all special elements
    const elements = document.querySelectorAll(
      styleKeys.join(",").toLowerCase()
    );
    if (elements.length === 0) return;

    elements.forEach((element) => {
      // Set the style if it is available in the STYLES object
      JS(element).style(BR_LOADED_THEME[element.tagName.toUpperCase()].NORMAL);
      // Setup the UI event listeners if they are available in the BR_LOADED_THEME object
      this.initUIStyleEventListeners({ element });
      element.BR_UI_STYLES_SET = true;
    });
  };
  initOneDefaultStyling = (element) => {
    if (element.BR_UI_STYLES_SET) return;
    const tagNameUpperCase = element.tagName.toUpperCase();
    if (BR_LOADED_THEME[tagNameUpperCase]) {
      JS(element).style(BR_LOADED_THEME[tagNameUpperCase].NORMAL);
    }
    this.initUIStyleEventListeners({ element });
  };
  static EVENTS = {
    MOUSE_DOWN: "mouse_down",
    MOUSE_UP: "mouse_up",
    HOVER_ENTER: "hover_enter",
    HOVER_LEAVE: "hover_leave",
  };
  initUIStyleByEvent = (element, eventType) => {
    const tagNameUpperCase = element.tagName.toUpperCase();
    // Revert the style to normal if event ends
    if (
      eventType === BlockReady.EVENTS.MOUSE_UP ||
      eventType === BlockReady.EVENTS.HOVER_LEAVE
    ) {
      JS(element).style(BR_LOADED_THEME[tagNameUpperCase].NORMAL);
    }
    // Otherwise apply the appropriate event style
    switch (eventType) {
      case BlockReady.EVENTS.MOUSE_DOWN:
        JS(element).style(BR_LOADED_THEME[tagNameUpperCase].PRESSING);
        break;
      case BlockReady.EVENTS.HOVER_ENTER:
        JS(element).style(BR_LOADED_THEME[tagNameUpperCase].HOVERING);
        break;
      default:
    }
  };
  initUIStyleEventListeners = ({ element, reset }) => {
    if (reset) element.BR_UI_EVENTS_SET = undefined;
    if (element.BR_UI_EVENTS_SET) return;
    let hovering = false;

    const STYLE = BR_LOADED_THEME[element.tagName.toUpperCase()];

    if (STYLE && STYLE.PRESSING) {
      // Click events resolver Functions
      const onMouseDown = (e) => {
        e.stopPropagation();
        this.initUIStyleByEvent(element, BlockReady.EVENTS.MOUSE_DOWN);
      };
      const onMouseUp = (e) => {
        e.stopPropagation();
        // Take hovering into account
        if (hovering)
          this.initUIStyleByEvent(element, BlockReady.EVENTS.HOVER_ENTER);
        else this.initUIStyleByEvent(element, BlockReady.EVENTS.MOUSE_UP);
      };
      // Click events
      element.addEventListener("mousedown", onMouseDown);
      element.addEventListener("mouseup", onMouseUp);
      element.addEventListener("touchend", onMouseUp);
      element.addEventListener("touchstart", onMouseDown);
    }

    if (STYLE && STYLE.HOVERING) {
      // Hover events
      element.addEventListener("mouseover", (e) => {
        this.initUIStyleByEvent(element, BlockReady.EVENTS.HOVER_ENTER);
        hovering = true;
      });
      element.addEventListener("mouseout", (e) => {
        this.initUIStyleByEvent(element, BlockReady.EVENTS.HOVER_LEAVE);
        hovering = false;
      });
    }
    element.BR_UI_EVENTS_SET = true;
  };

  initEventListeners = ({ onHover, onPressed, element }) => {
    // If element is a button, then listen to the button UI changes events like press, hover
    this.initUIStyleEventListeners({ element });
    // Click events
    if (onPressed) {
      element.addEventListener("touchstart", (e) => {
        onPressed(e, element);
      });
      element.addEventListener("mousedown", (e) => {
        onPressed(e, element);
      });
    }
    // Hover events
    if (onHover) {
      element.addEventListener("mouseover", (e) => {
        onHover(e, element, true);
      });
      element.addEventListener("mouseout", (e) => {
        onHover(e, element, false);
      });
    }
  };

  resetAllStyling = () => {
    // Gather all special elements nameTags
    const styleKeys = Object.keys(BR_LOADED_THEME);
    if (styleKeys.length === 0) return;
    // Query all special elements
    const elements = document.querySelectorAll(
      styleKeys.join(",").toLowerCase()
    );
    if (elements.length === 0) return;

    elements.forEach((element) => {
      // Set the style if it is available in the STYLES object
      JS(element).removeStyle(
        BR_LOADED_THEME[element.tagName.toUpperCase()].NORMAL
      );
      this.initUIStyleEventListeners({ element: element, reset: true });
    });
  };

  // -------------------------------------------  ENTER POINTS

  make = ({ onHover, onPressed, style }) => {
    if (this.elements.length === 0) return;

    this.elements.forEach((element) => {
      // Set the default first
      this.initOneDefaultStyling(element);
      // Then add additional styling if needed;
      if (style) JS(element).style(style);

      // Setup event listeners
      this.initEventListeners({ onHover, onPressed, element });
    });

    return this;
  };

  theme = (styleObject) => {
    // The this.elements of this method is not affected by calls on this.make()
    // because it creates a separate io() object
    this.elements.forEach((element) => {
      if (styleObject) JS(element).style(styleObject);
      this.initOneDefaultStyling(element);
    });
  };

  get = () => {
    return this.elements[0];
  };

  initAll = () => {
    JS("body").style({
      opacity: "1",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
      margin: "0",
    });
    JS("input").style({
      outline: "none",
    });
    // Set the fontfamily for all text elements by default
    this.initAllElementsDefaultStyles();
    return this;
  };

  loadTheme = (styleObject) => {
    if (!styleObject) return;
    if (styleObject.LOAD_FONTS) {
      styleObject.LOAD_FONTS.forEach(
        ({ type, url, fontFamily, fontWeight, linkCode }) => {
          BlockReady.loadFont({ type, url, fontFamily, fontWeight, linkCode });
        }
      );
    }
    this.resetAllStyling();
    BR_LOADED_THEME = styleObject;
    this.initAll();
  };

  static loadFont = ({ type, url, fontFamily, fontWeight, linkCode }) => {
    switch (type) {
      case "raw":
        if (url) {
          const fontFaceText = `
            @font-face {
              font-family: '${fontFamily}';
              src: url(${url});
              ${fontWeight ? "font-weight:" + fontWeight : ""}
            }
          `;
          const style = document.createElement("style");
          style.appendChild(document.createTextNode(fontFaceText));
          document.querySelector("head").appendChild(style);
        }
        break;
      case "google":
        if (linkCode) {
          document.querySelector("head").innerHTML += linkCode;
        }
        break;
    }
  };
}

const io = function (el) {
  return new BlockReady(el);
};

export { io, BlockReady };
export default io;
