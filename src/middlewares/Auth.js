const AuthUser = (req, res, next) => {
    // Authentication logic here
    const isAuthenticated = true; // Replace with actual authentication check
    if (!isAuthenticated) {
        return res.status(401).send("Unauthorized");
    }
    else {
        next();
    }
}

const loginAuth = (req, res, next) => {
    // Login authentication logic here
    const isLoggedin = true; // Replace with actual login check
    if (!isLoggedin) {
        return res.status(401).send("Login required");
    }
    else {
        next();
    }
}
module.exports = { AuthUser, loginAuth };