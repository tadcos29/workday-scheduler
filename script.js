// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  let taskEntry=RetrieveTasks();


  let plannerListEl=[];

//   for (i=0;i<8;i++) {
//     plannerListEl[i]=$("<div></div>");
//     plannerListEl[i].attr("id","hour-"+(i+9));
//     plannerListEl[i].addClass("row time-block future");
//     $('.list-anchor').append(plannerListEl[i]);
//     console.log("hi")
    
//   }
//   $(".time-block").append("<div>HELLO</div>").addClass("col-2 col-md-1 hour text-center py-3");
//   $(".time-block").append("<textarea></textarea>").addClass("col-8 col-md-10 description");
//   $(".time-block").append("<button></button>").addClass("btn saveBtn col-2 col-md-1");
//   $(".time-block").children("saveBtn").append("<i></i>").addClass("fas fa-save");
//   console.log("the id is"+$(this).parent().attr("id"));
//   // $(".time-block").children("div").innerHtml("TESTING"));
//   // $(".time-block").append("<div>11AM</div>").addClass("col-2 col-md-1 hour text-center py-3");
// console.log(plannerListEl);

  $('.saveBtn').click(function() {
    console.log("hi, parent.this is"+$(this).parent().children(".description").val());
    taskEntry[$(this).parent().attr("id").replace("hour-","")]=$(this).parent().children(".description").val();
    console.log("num"+taskEntry);
    console.log("slicetest"+$(this).parent().attr("id").slice(-2));
  });

  function RetrieveTasks() {
    let objTempTasks={};
    objTempTasks=JSON.parse(localStorage.getItem("tadcos29-task-list"));
    //If there are scores in local storage, retrieve them, otherwise return empty array.
if (objTempTasks) {return objTempTasks;} else {return []}
}

function WriteTasks(objTempTasks) {
  localStorage.setItem("tadcos29-task-list", JSON.stringify(objTempTasks));
}
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
