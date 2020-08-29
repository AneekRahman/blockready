const BR_DARK_THEME = {
  // Standard HTML Elements
  LOAD_FONTS: [
    {
      type: "google",
      linkCode:
        '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;800&display=swap" rel="stylesheet">',
    },
    {
      type: "raw",
      url:
        "https://fonts.gstatic.com/s/poppins/v12/pxiByp8kv8JHgFVrLFj_Z1xlFd2JQEk.woff2",
      fontFamily: "Poppins",
      fontWeight: "200",
    },
  ],
  BODY: {
    NORMAL: {
      backgroundColor: "#00070f",
      color: "white",
      fontFamily: "Poppins",
      transition: ".15s",
    },
  },
  BUTTON: {
    NORMAL: {
      fontSize: "1em",
      backgroundColor: "#ffbd38",
      border: "none",
      padding: "1em 1.5em",
      fontWeight: "600",
      cursor: "pointer",
      fontFamily: "Montserrat",
      color: "white",
      transition: ".3s",
      borderRadius: ".2em",
    },
    HOVERING: {
      backgroundColor: "#e6aa32",
      color: "white",
    },
    PRESSING: {
      backgroundColor: "#bd881e",
      color: "white",
    },
  },
  P: {
    NORMAL: {
      lineHeight: "1.4em",
      transition: ".3s",
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
      color: "#fcbe03",
    },
    HOVERING: {
      color: "#fc8403",
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
      border: "1px solid rgba(255,255,255,.1)",
      padding: ".6em 1em",
      backgroundColor: "transparent",
    },
    HOVERING: {
      backgroundColor: "rgba(255,255,255,0.03)",
    },
  },
  TD: {
    NORMAL: {
      border: "1px solid rgba(255,255,255,.07)",
      padding: ".6em 1em",
      textAlign: "center",
      backgroundColor: "transparent",
    },
    HOVERING: {
      backgroundColor: "rgba(255,255,255,0.03)",
    },
  },
  INPUT: {
    NORMAL: {
      border: "1px solid rgba(255,255,255,.1)",
      padding: ".4em 1em",
      fontSize: "1.2em",
      borderRadius: ".2em",
      backgroundColor: "transparent",
      color: "White",
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
      border: "1px solid rgba(255,255,255,0.05)",
      backgroundColor: "rgba(255,255,255,.01)",
      boxShadow: "0px 1px 3px rgba(255,255,255,0.04)",
      padding: "1.5em",
    },
  },
};
