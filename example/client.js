Brr().all();
Brr("body").style({ padding: "2em", maxWidth: "600px" });
Brr("card").style({ padding: "1.5em" });
Brr(".card-click").style({ width: "100%" });

Brr("button").make({
  onPressed: (element, eventObject) => {
    console.log(`Clicked: ${element}`);
  },
});
