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
    console.error("JStyling: No styles found to implement");
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
    // Standard Elements
    TEXT: {
      ALL: {
        fontFamily: "sans-serif",
        marginTop: ".2em",
        lineHeight: "1.4em",
      },
      H1: {
        color: "red",
      },
      H2: {},
      H3: {},
      H4: {},
      H5: {},
      H6: {},
      P: {},
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
    // Special elements
    SPECIAL: {
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
    },
  };
  static initSpecialElements = () => {
    // Gather all special elements nameTags
    const styleKeys = Object.keys(BlockReady.STYLES.SPECIAL);
    if (styleKeys.length === 0) return;

    // Query all special elements
    const specElements = document.querySelectorAll(
      styleKeys.join(",").toLowerCase()
    );
    if (specElements.length === 0) return;

    specElements.forEach((element) => {
      Brr(element).style(
        BlockReady.STYLES.SPECIAL[element.tagName.toUpperCase()]
      );
    });
  };
  setupTextStyles = (element) => {
    Brr(element).style(BlockReady.STYLES.TEXT.ALL);
    if (BlockReady.STYLES.TEXT[element.tagName.toUpperCase()])
      Brr(element).style(BlockReady.STYLES.TEXT[element.tagName.toUpperCase()]);
  };
  isATextElement = (element) => {
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
  initDefaultStyling = (element) => {
    // TEXT
    if (this.isATextElement(element)) {
      this.setupTextStyles(element);
    }
    // BUTTON
    if (element.tagName.toUpperCase() === "BUTTON") {
      // Setting up button defaults
      Brr(element).style(BlockReady.STYLES.BUTTON.NORMAL);
    }
  };
  static EVENTS = {
    MOUSE_DOWN: "mouse_down",
    MOUSE_UP: "mouse_up",
    HOVER_ENTER: "hover_enter",
    HOVER_LEAVE: "hover_leave",
  };

  static initStylingOnEvent(element, eventType) {
    // BUTTON
    if (element.tagName.toUpperCase() === "BUTTON") {
      // Revert the style to normal if event ends
      if (
        eventType === BlockReady.EVENTS.MOUSE_UP ||
        eventType === BlockReady.EVENTS.HOVER_LEAVE
      ) {
        Brr(element).style(BlockReady.STYLES.BUTTON.NORMAL);
      }
      // Otherwise apply the appropriate event style
      switch (eventType) {
        case BlockReady.EVENTS.MOUSE_DOWN:
          Brr(element).style(BlockReady.STYLES.BUTTON.PRESSING);
          break;
        case BlockReady.EVENTS.HOVER_ENTER:
          Brr(element).style(BlockReady.STYLES.BUTTON.HOVERING);
          break;
        default:
      }
    }
  }

  initEventListeners = ({ onHover, onPressed, element }) => {
    let hovering = false;
    // ------------------ CLICK EVENTS
    // Resolver Functions
    const onMouseDown = (e) => {
      e.stopPropagation();
      BlockReady.initStylingOnEvent(element, BlockReady.EVENTS.MOUSE_DOWN);
      if (onPressed) onPressed(element, e);
    };
    const onMouseUp = (e) => {
      e.stopPropagation();
      // Take hovering into account
      if (hovering)
        BlockReady.initStylingOnEvent(element, BlockReady.EVENTS.HOVER_ENTER);
      else BlockReady.initStylingOnEvent(element, BlockReady.EVENTS.MOUSE_UP);
    };
    element.addEventListener("touchstart", onMouseDown);
    element.addEventListener("mousedown", onMouseDown);
    element.addEventListener("touchend", onMouseUp);
    element.addEventListener("mouseup", onMouseUp);
    // ------------------ CLICK EVENTS

    // ------------------ HOVER EVENTS
    element.addEventListener("mouseover", (e) => {
      BlockReady.initStylingOnEvent(element, BlockReady.EVENTS.HOVER_ENTER);
      hovering = true;
      if (onHover) onHover(element, true, e);
    });
    element.addEventListener("mouseout", (e) => {
      BlockReady.initStylingOnEvent(element, BlockReady.EVENTS.HOVER_LEAVE);
      hovering = false;
      if (onHover) onHover(element, false, e);
    });
    // ------------------ HOVER EVENTS
  };
  // Entry point
  make = ({ onHover, onPressed, style }) => {
    if (this.elements.length === 0) return;

    this.elements.forEach((element) => {
      // Setup styles for elements by checking if style is available, otherwise
      // fallback to default styling
      if (style) Brr(element).style(style);
      else this.initDefaultStyling(element);

      // Setup event listeners
      this.initEventListeners({ onHover, onPressed, element });
    });

    return this;
  };

  all = () => {
    Brr("body").style({ opacity: "1" });
    Brr("h1, h2, h3, h4, h5, h6, p").style(BlockReady.STYLES.TEXT.ALL);
    Brr("h1").style(BlockReady.STYLES.TEXT.H1);
    Brr("h2").style(BlockReady.STYLES.TEXT.H2);
    Brr("h3").style(BlockReady.STYLES.TEXT.H3);
    Brr("h4").style(BlockReady.STYLES.TEXT.H4);
    Brr("h5").style(BlockReady.STYLES.TEXT.H5);
    Brr("h6").style(BlockReady.STYLES.TEXT.H6);
    Brr("button").style(BlockReady.STYLES.BUTTON.NORMAL);
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
BlockReady.initSpecialElements();
