let counter = 0;

// const style = {
//   fontSize: "2em",
//   color: "magenta",
//   fontStyle: "italic",
// };

BR().all();

BR("body").style({ padding: "2em", maxWidth: "600px" });

BR(".title").style({ margin: "1em" });
BR(".add").style({ margin: "0 1em 1em 1em", width: "calc(100% - 2em)" });

BR("button").make({
  onPressed: (e) => {
    console.log("Clicked: " + e.toString());
  },
});
