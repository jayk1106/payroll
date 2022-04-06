module.exports = (req, res, next) => {
    if(!req.isAdmin){
        const err = new Error("Not Authorized!");
        err.statusCode = 401;
        next(err);
    }    
    next();
}