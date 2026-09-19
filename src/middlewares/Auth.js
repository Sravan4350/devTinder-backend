const logError = (err, req, res, next) => {
    try {
        if (err) {
            res.status(500).send("Internal Server Error");
        }
    }
    catch (error) { 
        console.error(error);
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
module.exports = { logError, loginAuth };