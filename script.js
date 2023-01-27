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
  let NUMBER_OF_HOURS=9; // *WARNING* Code will break if workday invalid, i.e. sum of
                          // STARTING_TIME and NUMBER_OF_HOURS exceeds 23.

  // let presentTime = dayjs().subtract(8,'hour'); 
  // can uncomment for testing purposes at odd hours
  let presentTime = dayjs();
  console.log("present time is "+presentTime);
  let currentHour=presentTime.hour();
  console.log("present hour is "+currentHour);
  // dayjs(presentTime).format("YYYY-MM-DD");
  
  

// CREATING TIME SLOTS AND POPULATING HOUR HEADERS WITH FORMATTED TIME

  let plannerListEl=[];
    for (i=0;i<NUMBER_OF_HOURS;i++) {
      plannerListEl[i]=$("<div></div>");
      plannerListEl[i].attr("id","hour-"+(i+STARTING_TIME));
      plannerListEl[i].addClass("row time-block past");
      plannerListEl[i].appendTo($('.list-anchor'));
}
  $("<div></div>").appendTo(".time-block");
  $(".time-block").children("div").addClass("col-2 col-md-1 hour text-center py-3");
  $("<textarea></textarea>").appendTo(".time-block");
  $(".time-block").children("textarea").addClass("col-8 col-md-10 description");
  $(".time-block").children("textarea").attr("rows",3);
  $("<button></button>").appendTo(".time-block");
  $(".time-block").children("button").addClass("btn saveBtn col-2 col-md-1");
  $("<i></i>").appendTo(".saveBtn");
  $(".time-block").children(".saveBtn").children("i").addClass("fas fa-save");

let anchorChildren=$(".list-anchor").children();
  for (i=0;i<NUMBER_OF_HOURS;i++) {
  let headerDate = dayjs().hour(HourToArray(anchorChildren[i].id)+STARTING_TIME);
headerDate=headerDate.format("ha");
anchorChildren[i].children[0].innerHTML=headerDate;
  }
// END OF TIME SLOT CREATION

$("#currentDay").text(presentTime.format("dddd, D MMMM YYYY"));
  let objTaskRecord=RetrieveTasks();
  StyleTime(presentTime);
  PopulateTasks();

  $('.saveBtn').click(function() {
    
    //while its parent is
    let parentEl=$(this).parent();
    //Determine the identity of the caller's parent. Parse the parent's
    //id to obtain the corresponding zero-indexed slot in the 
    //objTaskRecord array.
    let timeSlot=HourToArray(parentEl.attr("id"));
    // Set the slot to the contents (val) of the caller's parent's sole 
    //".description"-classed child, which is the textarea.
    objTaskRecord[timeSlot]=parentEl.children(".description").val();
 // Write the updated task record to local storage.
    WriteTasks(objTaskRecord);

  });

function StyleTime(givenTime) {

  
  let givenHour=parseInt(givenTime.format("H"));
  // console.log ("the current hour is"+givenTime.format("H"))
  $(".list-anchor").children(".time-block").each(
    function() {
     $(this).addClass(AdaptToTime((HourToArray($(this).attr("id"))+STARTING_TIME),givenHour));
    
    }
  );
  
  //.addClass(AdaptToTime(,givenHour));

  function AdaptToTime(slotH,givenH) {
    switch (true) {
      case ((givenH-slotH)>0): // time passed
        return "past";
      break;
      case ((givenH-slotH)<0): // still time
        return "future";
      break;
      case ((givenH-slotH)===0): // on the hour
      return "present";
      break;
    }

  }

}

// LOCAL STORAGE HANDLING FUNCTIONS

  function RetrieveTasks() {
    let objTempTasks={};
    objTempTasks=JSON.parse(localStorage.getItem("tadcos29-task-list"));
    //If there are scores in local storage, retrieve them, otherwise return empty array.
if (objTempTasks) {return objTempTasks;} else {return []}
}

function PopulateTasks() {
  // Populate the description fields with the contents of the task record.
  for(x=0;x<objTaskRecord.length;x++)
  if (objTaskRecord[x]) {
  $(ArrayToHourId(x)).children(".description").val(objTaskRecord[x]);
  }
}

function WriteTasks(objTempTasks) {
  localStorage.setItem("tadcos29-task-list", JSON.stringify(objTempTasks));
}

// UTILITY FUNCTIONS FOR CONVERTING BETWEEN HOUR-IDS AND ARRAY POSITIONS

function HourToArray(stringId) {
  // Just for peace of mind, this converts a container id ('hour-1, hour-2, etc.') to
  // a correct ordinal position in the zero-indexed array. Returns integer.
  let arraySlot=parseInt(stringId.replace("hour-",""))-STARTING_TIME;
  // console.log("converted "+stringId+" to "+arraySlot);
  return arraySlot
}
function ArrayToHourId(indexInt) {
  //The reverse of the preceding function, this will take an array position and
  //convert it to the appropriately-formatted #hour-N id
  let hourID="#hour-".concat((indexInt+STARTING_TIME).toString());
  return hourID;
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
