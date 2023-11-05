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
  var saveBtn = $(".saveBtn");

  saveBtn.click(function () {
    var time_block = $(this).parent();
    var text_area = time_block.children("textarea");

    var value = text_area.val();
    var key = $(time_block).attr('id');
   
    localStorage.setItem(key,value);
  })


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  

  var timeBlckList = $(".time-block");
  for (var i = 0; i < timeBlckList.length; i++) {
    var currentHour = dayjs().format("HH");
    var timeID = $(timeBlckList[i]).attr('id');

    var blockHour = timeID.charAt(timeID.length-2) + timeID.charAt(timeID.length-1);

    if (blockHour === currentHour) {
      $(timeBlckList[i]).addClass("present");
    } else if (blockHour < currentHour) {
      $(timeBlckList[i]).addClass("past");
    } else {
      $(timeBlckList[i]).addClass("future");
    }
  }
  

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  for (var i = 0; i < timeBlckList.length; i++) {
    var text_area = $(timeBlckList[i]).children("textarea");
    var timeID = $(timeBlckList[i]).attr('id');
    var localValue = localStorage.getItem(timeID);

    text_area.val(localValue);
    
  }

  // TODO: Add code to display the current date in the header of the page.
  var advancedFormat = window.dayjs_plugin_advancedFormat;
  dayjs.extend(advancedFormat);

  var currentDate = dayjs().format('dddd, MMMM Do');
  var dateEl = $("#currentDay");

  dateEl.text(currentDate);
});
