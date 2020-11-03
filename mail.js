const nodemailer = require('nodemailer'); 
// const code = 1234
// const ht = "<h1>Happy Health</h1> <p>your otp is"+ code+"  </p>"
  
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
    subject: 'html mail', 
    // text: 'Node.js testing mail for GeeksforGeeks'
    html: "<h1>Happy Health</h1> <p>your otp is 1234 </p>"
}; 
  
mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
        console.log('Error Occurs '+err); 
    } else { 
        console.log('Email sent successfully'); 
    } 
}); 