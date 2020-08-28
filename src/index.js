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

  document.querySelector("body").style.boxSizing = "border-box";
  document.querySelector("body").style.margin = "0";

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
  }
  static STYLES = {
    // BlockReady specific format
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
    // Standard HTML Elements
    H1: {
      NORMAL: {
        fontFamily: "sans-serif",
        marginTop: ".2em",
      },
    },
    H2: {
      NORMAL: {
        fontFamily: "sans-serif",
        marginTop: ".2em",
      },
    },
    H3: {
      NORMAL: {
        fontFamily: "sans-serif",
        marginTop: ".2em",
      },
    },
    H4: {
      NORMAL: {
        fontFamily: "sans-serif",
        marginTop: ".2em",
      },
    },
    H5: {
      NORMAL: {
        fontFamily: "sans-serif",
        marginTop: ".2em",
      },
    },
    H6: {
      NORMAL: {
        fontFamily: "sans-serif",
        marginTop: ".2em",
      },
    },
    P: {
      NORMAL: {
        color: "black",
        fontFamily: "sans-serif",
        lineHeight: "1.4em",
      },
      PRESSING: {
        color: "orange",
      },
    },
    A: {
      NORMAL: {
        textDecoration: "none",
        color: "#005fbd",
      },
      HOVERING: {
        color: "orange",
      },
    },
    // Special elements
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
  static initAllElementsStyles = () => {
    // Gather all special elements nameTags
    const styleKeys = Object.keys(BlockReady.STYLES);
    if (styleKeys.length === 0) return;

    // Query all special elements
    const elements = document.querySelectorAll(
      styleKeys.join(",").toLowerCase()
    );
    if (elements.length === 0) return;

    elements.forEach((element) => {
      // Set the style if it is available in the STYLES object
      JS(element).style(
        BlockReady.STYLES[element.tagName.toUpperCase()].NORMAL
      );
      // Setup the UI event listeners if they are available in the STYLES object
      BlockReady.initUIStyleEventListeners(element);
    });
  };
  // static isATextElement = (element) => {
  //   const tagNameUpperCase = element.tagName.toUpperCase();
  //   if (
  //     tagNameUpperCase === "H1" ||
  //     tagNameUpperCase === "H2" ||
  //     tagNameUpperCase === "H3" ||
  //     tagNameUpperCase === "H4" ||
  //     tagNameUpperCase === "H5" ||
  //     tagNameUpperCase === "H6" ||
  //     tagNameUpperCase === "P"
  //   )
  //     return true;
  //   else return false;
  // };
  initOneDefaultStyling = (element) => {
    const tagNameUpperCase = element.tagName.toUpperCase();
    if (BlockReady.STYLES[tagNameUpperCase]) {
      JS(element).style(BlockReady.STYLES[tagNameUpperCase].NORMAL);
    }
    BlockReady.initUIStyleEventListeners(element);
  };
  static EVENTS = {
    MOUSE_DOWN: "mouse_down",
    MOUSE_UP: "mouse_up",
    HOVER_ENTER: "hover_enter",
    HOVER_LEAVE: "hover_leave",
  };
  static initUIStyleByEvent(element, eventType) {
    const tagNameUpperCase = element.tagName.toUpperCase();
    // Revert the style to normal if event ends
    if (
      eventType === BlockReady.EVENTS.MOUSE_UP ||
      eventType === BlockReady.EVENTS.HOVER_LEAVE
    ) {
      JS(element).style(BlockReady.STYLES[tagNameUpperCase].NORMAL);
    }
    // Otherwise apply the appropriate event style
    switch (eventType) {
      case BlockReady.EVENTS.MOUSE_DOWN:
        JS(element).style(BlockReady.STYLES[tagNameUpperCase].PRESSING);
        break;
      case BlockReady.EVENTS.HOVER_ENTER:
        JS(element).style(BlockReady.STYLES[tagNameUpperCase].HOVERING);
        break;
      default:
    }
  }

  static initUIStyleEventListeners = (element) => {
    if (element.BR_UI_EVENTS_SET) return;
    let hovering = false;

    const STYLE = BlockReady.STYLES[element.tagName.toUpperCase()];
    if (STYLE && STYLE.PRESSING) {
      // Click events resolver Functions
      const onMouseDown = (e) => {
        e.stopPropagation();
        BlockReady.initUIStyleByEvent(element, BlockReady.EVENTS.MOUSE_DOWN);
      };
      const onMouseUp = (e) => {
        e.stopPropagation();
        // Take hovering into account
        if (hovering)
          BlockReady.initUIStyleByEvent(element, BlockReady.EVENTS.HOVER_ENTER);
        else BlockReady.initUIStyleByEvent(element, BlockReady.EVENTS.MOUSE_UP);
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
        BlockReady.initUIStyleByEvent(element, BlockReady.EVENTS.HOVER_ENTER);
        hovering = true;
      });
      element.addEventListener("mouseout", (e) => {
        BlockReady.initUIStyleByEvent(element, BlockReady.EVENTS.HOVER_LEAVE);
        hovering = false;
      });
    }
    element.BR_UI_EVENTS_SET = true;
  };

  initEventListeners = ({ onHover, onPressed, element }) => {
    // If element is a button, then listen to the button UI changes events like press, hover
    BlockReady.initUIStyleEventListeners(element);
    // Click events
    if (onPressed) {
      element.addEventListener("touchstart", (e) => {
        onPressed(element, e);
      });
      element.addEventListener("mousedown", (e) => {
        onPressed(element, e);
      });
    }
    // Hover events
    if (onHover) {
      element.addEventListener("mouseover", (e) => {
        onHover(element, true, e);
      });
      element.addEventListener("mouseout", (e) => {
        onHover(element, false, e);
      });
    }
  };
  // Entry point
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

  style = (styleObject) => {
    // The this.elements of this method is not affected by calls on this.make()
    // because it creates a separate io() object
    this.elements.forEach((element) => {
      if (styleObject) JS(element).style(styleObject);
      this.initOneDefaultStyling(element);
    });
  };

  all = () => {
    JS("body").style({ opacity: "1" });
    BlockReady.initAllElementsStyles();
    return this;
  };

  loadTheme = (styleObject) => {
    BlockReady.STYLES = styleObject;
  };
}

const io = function (el) {
  const brbuilder = new BlockReady(el);
  return brbuilder;
};

// Init all BlockReady special elements
// BlockReady.initAllSpecialElementsStyles();
