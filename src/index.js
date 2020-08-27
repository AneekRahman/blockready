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
    TEXT_ALL: {
      fontFamily: "sans-serif",
      marginTop: ".2em",
      lineHeight: "1.4em",
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
      color: "red",
    },
    H2: {},
    H3: {},
    H4: {},
    H5: {},
    H6: {},
    P: {},
    A: {
      textDecoration: "none",
      color: "#005fbd",
    },
    // Special elements
    CARD: {
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
      if (element.tagName.toUpperCase() === "BUTTON") {
        JS(element).style(BlockReady.STYLES.BUTTON.NORMAL);
        return;
      }
      if (BlockReady.isATextElement(element)) {
        JS(element).style(BlockReady.STYLES.TEXT_ALL);
      }
      JS(element).style(BlockReady.STYLES[element.tagName.toUpperCase()]);
    });
  };
  static isATextElement = (element) => {
    if (
      element.tagName.toUpperCase() === "H1" ||
      element.tagName.toUpperCase() === "H2" ||
      element.tagName.toUpperCase() === "H3" ||
      element.tagName.toUpperCase() === "H4" ||
      element.tagName.toUpperCase() === "H5" ||
      element.tagName.toUpperCase() === "H6" ||
      element.tagName.toUpperCase() === "P"
    )
      return true;
    else return false;
  };
  initOneDefaultStyling = (element) => {
    // TEXT
    if (BlockReady.isATextElement(element)) {
      JS(element).style(BlockReady.STYLES.TEXT_ALL);
      JS(element).style(BlockReady.STYLES[element.tagName.toUpperCase()]);
    }
    // BUTTON
    if (element.tagName.toUpperCase() === "BUTTON") {
      // Setting up button defaults
      this.initButtonEventListeners(element);
      JS(element).style(BlockReady.STYLES.BUTTON.NORMAL);
    }
    // Is another element
  };
  static EVENTS = {
    MOUSE_DOWN: "mouse_down",
    MOUSE_UP: "mouse_up",
    HOVER_ENTER: "hover_enter",
    HOVER_LEAVE: "hover_leave",
  };

  static initButtonStyleOnEvent(element, eventType) {
    // BUTTON
    if (element.tagName.toUpperCase() === "BUTTON") {
      // Revert the style to normal if event ends
      if (
        eventType === BlockReady.EVENTS.MOUSE_UP ||
        eventType === BlockReady.EVENTS.HOVER_LEAVE
      ) {
        JS(element).style(BlockReady.STYLES.BUTTON.NORMAL);
      }
      // Otherwise apply the appropriate event style
      switch (eventType) {
        case BlockReady.EVENTS.MOUSE_DOWN:
          JS(element).style(BlockReady.STYLES.BUTTON.PRESSING);
          break;
        case BlockReady.EVENTS.HOVER_ENTER:
          JS(element).style(BlockReady.STYLES.BUTTON.HOVERING);
          break;
        default:
      }
    }
  }

  initButtonEventListeners = (element) => {
    let hovering = false;
    // Click events resolver Functions
    const onMouseDown = (e) => {
      e.stopPropagation();
      BlockReady.initButtonStyleOnEvent(element, BlockReady.EVENTS.MOUSE_DOWN);
    };
    const onMouseUp = (e) => {
      e.stopPropagation();
      // Take hovering into account
      if (hovering)
        BlockReady.initButtonStyleOnEvent(
          element,
          BlockReady.EVENTS.HOVER_ENTER
        );
      else
        BlockReady.initButtonStyleOnEvent(element, BlockReady.EVENTS.MOUSE_UP);
    };
    // Click events
    element.addEventListener("touchstart", onMouseDown);
    element.addEventListener("mousedown", onMouseDown);
    element.addEventListener("touchend", onMouseUp);
    element.addEventListener("mouseup", onMouseUp);
    // Hover events
    element.addEventListener("mouseover", (e) => {
      BlockReady.initButtonStyleOnEvent(element, BlockReady.EVENTS.HOVER_ENTER);
      hovering = true;
    });
    element.addEventListener("mouseout", (e) => {
      BlockReady.initButtonStyleOnEvent(element, BlockReady.EVENTS.HOVER_LEAVE);
      hovering = false;
    });
  };

  initEventListeners = ({ onHover, onPressed, element }) => {
    // If element is a button, then listen to the button UI changes events like press, hover
    if (element.tagName.toUpperCase() === "BUTTON")
      this.initButtonEventListeners(element);
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
    // because it creates a separate Brr() object
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

const Brr = function (el) {
  const brbuilder = new BlockReady(el);
  return brbuilder;
};

// Init all BlockReady special elements
// BlockReady.initAllSpecialElementsStyles();
