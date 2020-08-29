// import { io, BlockReady } from "../src/index.js";

// io().loadTheme(BR_DARK_THEME); // Loads in another theme
io().initAll();
// io("#something").theme(); // Adds default styling to only this element
// io("card").theme({ padding: "0" }); // Overrides default padding of card elements
io("body").theme({ padding: "2em", maxWidth: "600px" });
io(".card-click, table").style({ width: "100%" });
io("input").theme({
  marginTop: "1em",
});
io(".add-to-list").style({ marginLeft: "1em" });

io("#theme1").make({
  onPressed: (e, element) => {
    io().loadTheme(BlockReady.THEME);
  },
});
// BR_DARK_THEME is loaded from ./theme2.js in the HTML file
io("#theme2").make({
  onPressed: (e, element) => {
    io().loadTheme(BR_DARK_THEME);
  },
});
