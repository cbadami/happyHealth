exports.getUserHome = (req, res) => {
    res.render('newuserHome')
} 

exports.getUserChallenges = (req, res) => {
    res.render('user_challenges')
} 


exports.getUserMoreChallenges = (req, res) => {
    res.render('user_more_challenges')
}