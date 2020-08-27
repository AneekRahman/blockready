Brr().all();
// Brr().loadTheme({}); // Loads in another theme
// Brr("body").style(); // Adds default styling to only this element
Brr("body").style({ padding: "2em", maxWidth: "600px" });
Brr("card").style({ padding: "1.5em" });
Brr(".card-click").style({ width: "100%" });

Brr("button").make({
  onPressed: (element, eventObject) => {
    console.log(`Clicked: ${element}`);
  },
});
