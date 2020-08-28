io().all();
// io().loadTheme({}); // Loads in another theme
// io("body").style(); // Adds default styling to only this element
// io("card").style({ padding: "10em" }); // Overrides default padding of card elements
io("body").style({ padding: "2em", maxWidth: "600px" });
io(".card-click").style({ width: "100%" });
io("h1").style({ color: "orange" });

io("button").make({
  onPressed: (element, eventObject) => {
    console.log(`Clicked: ${element}`);
  },
});
