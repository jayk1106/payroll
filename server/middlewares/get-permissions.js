// const {getAdminId} = require('../models/permissions');

// let adminId;

// const init = async () => {
//     try {
//         const result = await getAdminId();
//         adminId = result.rows[0].id;
//         console.log(adminId);
//     } catch (err) {
//         console.log(err);
//     }
// }
// init();

module.exports = (req,res,next) => {

    console.log(req.userId);
    if(req.userId) return next();
    console.log("came here");
    if( req.permissionId && req.permissionId === 'c40441eb-06ae-4b67-8cd4-fc15ced1a94e'){
        req.isAdmin = true;
    }
    next();
}