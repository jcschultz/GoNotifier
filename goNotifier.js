// loading modules
const request = require('request');
const email = require('emailjs/email');
const moment = require('moment');

// email config
const gmail_user = '';
const gmail_password = '';
const gmail_host = 'smtp.gmail.com';
const email_to_notify = '';
const email_sender = '';

// dhs config
const url = 'https://ttp.cbp.dhs.gov/schedulerapi/slots?orderBy=soonest&limit=3&minimum=1&locationId=';
const locationId = ''; // interview office ID
const currentAppointmentDate = ''; // date of current appointment in YYYY-MM-DD format

// script config
const recheck_frequency = 600000; // 10 minutes

function checkDhsSite() {
  request.get(url+locationId, (error, response, body) => {
    if (error) {
      console.log('error: ', error);
      console.log('statusCode: ', response && response.statusCode); 
    }
    else {
      let firstAvailableTime = parseDHSBody(body);
      console.log('firstAvailableTime: ', firstAvailableTime);
      
      if (firstAvailableTime && isNewer(firstAvailableTime)) {
        sendEmail(firstAvailableTime);
      }
    }
    
    setUpRecheck();
  });
}

function parseDHSBody(body) {
  let json = JSON.parse(body);
  if (json && json[0]) {
    return json[0].startTimestamp;
  }
}

function isNewer(firstAvailableTime) {
  let first = moment(firstAvailableTime);
  let current = moment(currentAppointmentDate);

  return first.isBefore(current);
}

function sendEmail(firstAvailableTime) {
  let subject = 'DHS CBP New Availability';
  let body = 'A new appointment time has become available with CBP for Global Entry interviews: ' + firstAvailableTime;
  
  let gmail = email.server.connect({
    user: gmail_user,
    password: gmail_password,
    host: gmail_host,
    ssl: true
  });

  gmail.send(
    {
      to : email_to_notify,
      from : email_sender,
      subject : subject,
      text : body
    },
    (err, message) => {
      console.log(err || message);
    }
  );
}

function setUpRecheck() {
  setTimeout(checkDhsSite, recheck_frequency);
}

checkDhsSite();

