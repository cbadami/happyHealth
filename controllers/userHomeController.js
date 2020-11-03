exports.getUserHome = (req, res) => {
    let username = req.session.username;
    // console.log(`before session destroy ${success_msg}`)
    console.log(`inside get user home ${username}`);
    req.session = null
    res.render('newuserHome', {username});
}
 

exports.getUserStep = (req,res) => {
    console.log(`inside  get user step`)
    res.render('userStep')
}

exports.postUserStep = (req,res) =>{
    const { date, num_steps, goal } = req.body;
    console.log(`inside post user step`)
    let errors = [];
    console.log(`first ${errors.length}`);
    let success_msg;
    if (!date || !num_steps || !goal) {
        console.log(`inside if statement ${num_steps}`);
        errors.push({ msg: 'Please enter all fields' });
        success_msg = 'Please enter all fields'
        console.log(`inside if ${errors.length}`);
    }
    else {
        // if (name.length > 12) {
        //     errors.push({ msg: 'Username must be below 12 characters' });
        // }
        // else if (name.length < 6) {
        //     errors.push({ msg: 'Username must be atleast 6 characters' });
        // }

        // if (password.length > 15) {
        //     errors.push({ msg: 'Password must be below 15 characters' });
        // }
        // else if (password.length < 8) {
        //     errors.push({ msg: 'Password must be at least 8 characters' });
        // }

        // if (email.length > 30) {
        //     errors.push({ msg: 'Email id must be below 30 characters' });
        // }

        // if (password != password2) {
        //     errors.push({ msg: 'Passwords not matched' });
        // }
    }
    console.log(`outside if ${errors.length}`);
    res.render('userStep', {success_msg});

    // console.log(`before errors ${errors} length: ${errors.length}`);
    // if (errors.length > 0) {
    //     res.render('userSignup', {
    //         errors,
    //         name,
    //         email,
    //         password,
    //         password2
    //     });
    // }
    // else {
    //     console.log(`errors in last query: ${errors[0]} length ${errors.length}`)
    //     var queryString = `INSERT INTO  happyhealth_MySQL.USER values(
    //     '${name}','${password}','No','No','No','Yes','${email}');`;
    //     db.query(queryString, function (err, result) {
    //         if (err) {
    //             console.log(`${err}`)
    //             let str = err.message
    //             if(str.includes("UserName")){
    //                 errors.push({ msg: 'Username already taken' });
    //                 res.render('userSignup', {
    //                     errors,
    //                     name,
    //                     email,
    //                     password,
    //                     password2
    //                 }); 
    //             }else if(str.includes("Email")){
    //                 errors.push({ msg: 'Email id already registered' });
    //                 res.render('userSignup', {
    //                     errors,
    //                     name,
    //                     email,
    //                     password,
    //                     password2
    //                 }); 
    //             }
    //         }else{
    //         console.log("1 record inserted");
    //         success_msg = 'Register sucessful';
    //         req.session.success_msg = success_msg;
    //         res.redirect('/')
    //         }
    //     });

    // }
}



exports.getUserChallenges = (req, res) => {
    res.render('user_challenges')
} 


exports.getUserMoreChallenges = (req, res) => {
    res.render('user_more_challenges')
}

exports.getUserSleep = (req,res) => {
    res.render('userSleep')
}

exports.getUserHydration = (req,res) => {
    res.render('userHydration')
}

