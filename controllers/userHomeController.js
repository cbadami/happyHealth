exports.getUserHome = (req, res) => {
    res.render('newuserHome')
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