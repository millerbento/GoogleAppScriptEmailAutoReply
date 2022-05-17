function autoReply() {
var interval = 30;    //  if the script runs every 30 minutes; change otherwise
  var date = new Date();
  var day = date.getDay();
  var hour = date.getHours();
  var sendreplyemail = false;
  //ORIGINAL if ([5,6,0].indexOf(day) > -1 || (hour < 8) || (hour >= 17)) {
  if ((hour < 9) || (hour >= 16)) {
    var timeFrom = Math.floor(date.valueOf()/1000) - 60 * interval;
    var threads = GmailApp.search('is:inbox after:' + timeFrom);
    
    for (var i = 0; i < threads.length; i++) {
      if (threads[i].isUnread()){
        var message = threads[i].getMessages();
        var senderEmail = message[i].getFrom();
        //Only replies if sender email doesn't contain those values
        if (senderEmail.includes("noreply") || senderEmail.includes("no-reply") || senderEmail.includes("postmaster") || senderEmail.includes("windcave.com")) {
          sendreplyemail = false;
        } else {
          sendreplyemail = true;
        }
        //Sends an email and mark it as read
        if (sendreplyemail === true){
          threads[i].reply("Thanks for your email. Unfortunately, we are now closed for the day and will get back to you in the morning. Our current shop hours are 9am – 4pm. Thanks, Shotover Canyon Swing Team");
          threads[i].markRead();  
        }
      }
    }
  }
}
