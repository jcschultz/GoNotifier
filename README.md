# GoNotifier
In order to get Global Entry, you have to go through an interview process. Some airports do over 50 interviews a day. Unfortunately for me, the Salt Lake City airport only does 10 a day and is currently backed up for the next 4 months.

I've heard that appointments are frequently cancelled. This script checks the DHS servers to see if the next available appointment is sooner than a currently scheduled appointment. If so, it sends an email to let you know that you can try rescheduling for this sooner time slot.

This script was inspired by [Drewster727's goes-notify script](https://github.com/Drewster727/goes-notify).

## Getting Started
This node script requires that the following node npm modules are installed:

```
npm install request
npm install emailjs
npm install moment
```

You'll also need to edit goNotifier.js to include the correct email server info, recipient email address, sender email address, current appointment date (in YYYY-MM-DD format), and [interviewing office location ID](https://github.com/Drewster727/goes-notify#goes-center-codes). You can also update the frequency (in milliseconds) with which the script checks for availability. 

After that, just issue the command:

```
nodejs /path/to/script/goNotifier.js
```
