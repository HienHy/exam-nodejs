exports.guest = (req, res, next) => {
    const auth = req.session.auth;
    if (auth) { //da login

        return res.redirect("/")
    }
    next();
}


exports.logged = (req, res, next) => {
    const auth = req.session.auth;
    if (auth) {
        return next();
    }
    res.redirect("/auth/login")
}