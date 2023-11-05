$(function () {
  
  var saveBtn = $(".saveBtn");

  // Event Listener that listen for when we click the save button
  // When clicked it displays a message that the appointment is saved
  // It also saves the value of the textarea to local storage
  saveBtn.click(function () {
    var time_block = $(this).parent();
    var text_area = time_block.children("textarea");
    var message = "Appointment Added to <code>localStorage</code> &#10003"
    
    $('#message').html(message);

    setTimeout(function(){
      $('#message').html('');
    },1000)

    var value = text_area.val();
    var key = $(time_block).attr('id');
   
    localStorage.setItem(key,value);
  })
  
  var timeBlckList = $(".time-block");

  //For loop that iterates through all timeblock elements 
  //And depending on the time given from the dayjs api
  //It will change the stlying to a different color
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
  


  //For loop that iterates through the timeblocks and posts the saved value
  // local storage in the text area
  for (var i = 0; i < timeBlckList.length; i++) {
    var text_area = $(timeBlckList[i]).children("textarea");
    var timeID = $(timeBlckList[i]).attr('id');
    var localValue = localStorage.getItem(timeID);

    text_area.val(localValue);
    
  }

  // Displays the current date from the dayjs api in the header
  var advancedFormat = window.dayjs_plugin_advancedFormat;
  dayjs.extend(advancedFormat);

  var currentDate = dayjs().format('dddd, MMMM Do');
  var dateEl = $("#currentDay");

  dateEl.text(currentDate);

});
