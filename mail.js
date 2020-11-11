
  
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