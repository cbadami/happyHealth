exports.getUserHome = (req, res) => {
    let username = req.session.username;
    // console.log(`before session destroy ${success_msg}`)
    req.session.destroy()
    res.render('newuserHome',{username})
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

exports.getUserStep = (req,res) => {
    res.render('userStep')
}
exports.getUserHydration = (req,res) => {
    res.render('userHydration')
}