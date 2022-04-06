const jwt = require('jsonwebtoken');

const {SECRET_KEY} = require('../util/config');

module.exports = (req,res,next) => {
    
    const authToken = req.get('Authorization');

    if(!authToken){
        const err = new Error('Not Authorized!');
        err.statusCode = 401;
        throw err;
    }

    try {
        const decodedToken =  jwt.verify(authToken , SECRET_KEY);
        
        if(!decodedToken){
            return res.status(401).json({
                error : "Not Authenticated"
            })
        }

        req.userId = decodedToken.userId || null;
        req.email = decodedToken.email || null;
        req.employeeId = decodedToken.employeeId || null;
        req.permissionId = decodedToken.permissionId || null;
        req.organizationId = decodedToken.organizationId || null;

        if(req.userId) {
            req.isAdmin = true;
        }
        next();

    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }



}