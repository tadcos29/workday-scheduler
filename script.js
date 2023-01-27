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

  let STARTING_TIME=9; // In case other workday arrangements are to be considered.
  let NUMBER_OF_HOURS=8;


  let presentTime = dayjs();
  // dayjs(presentTime).local();
  console.log("present time is "+presentTime);
  let currentHour=presentTime.hour();
  console.log("present hour is "+currentHour);
  // dayjs(presentTime).format("YYYY-MM-DD");
  $("#currentDay").text(presentTime.format("dddd, D MMMM YYYY"));
  let objTaskRecord=RetrieveTasks();
  PopulateTasks();
  

let test= HourToArray("hour-15");
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
    
    //while its parent is
    let parentEl=$(this).parent();
    //Determine the identity of the caller. The id string of the parent
    //element is stripped of the 'hour-' string by a simple replace() with null.
    //A parseInt converts the resulting string to a number.
    let timeSlot=HourToArray(parentEl.attr("id"));
    console.log("hi, parent.this is"+parentEl.children(".description").val());
    objTaskRecord[timeSlot]=parentEl.children(".description").val();
    console.log("entry is now"+objTaskRecord+" ");
    WriteTasks(objTaskRecord);
  });

  function RetrieveTasks() {
    let objTempTasks={};
    objTempTasks=JSON.parse(localStorage.getItem("tadcos29-task-list"));
    //If there are scores in local storage, retrieve them, otherwise return empty array.
if (objTempTasks) {return objTempTasks;} else {return []}
}

function PopulateTasks() {
  for(x=0;x<objTaskRecord.length;x++)
  if (objTaskRecord[x]) {
  $(ArrayToHourId(x)).children(".description").val(objTaskRecord[x]);
  }
}


function HourToArray(stringId) {
  // Just for peace of mind, this converts a container id ('hour-1, hour-2, etc.') to
  // a correct ordinal position in the zero-indexed array. Returns integer.
  let arraySlot=parseInt(stringId.replace("hour-",""))-STARTING_TIME;
  // console.log("converted "+stringId+" to "+arraySlot);
  return arraySlot
}
function ArrayToHourId(indexInt) {
  // Just for peace of mind, this converts a container id ('hour-1, hour-2, etc.') to
  // a correct ordinal position in the zero-indexed array. Returns integer.
  let hourID="#hour-".concat((indexInt+STARTING_TIME).toString());
  // console.log("converted "+indexInt+" to "+hourID);
  return hourID;
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
