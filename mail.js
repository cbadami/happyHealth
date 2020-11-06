const nodemailer = require('nodemailer'); 

var code = Math.floor((Math.random() * 100000) + 1)
var email = "<h1>Happy Health</h1> <p>Your otp is "+ code+"  </p>"
  
let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'happyhealthgdp@gmail.com', 
        pass: 'Happyhealth123'
    } 
}); 
  
let mailDetails = { 
    from: 'happyhealthgdp@gmail.com', 
    to: 'harishthadkaus@gmail.com', 
    subject: 'Happy Health forgot Password!', 
    // text: 'Node.js testing mail for GeeksforGeeks'
    html: email
}; 
  
mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
        console.log('Error Occurs '+err); 
    } else { 
        console.log('Email sent successfully'); 
    } 
}); 