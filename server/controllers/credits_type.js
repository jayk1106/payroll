const Credits_type = require('../models/credits_type');

module.exports.getCreditsTypes = async (req,res,next) => {
    
    const orgId = req.params.orgId;

    try {
        const result = await Credits_type.fetchAll(orgId);

        res.status(200).json({
            message : "All credites types",
            creditsTypes : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.postCreditsType = async (req,res,next) => {

    const ct_title = req.body.ct_title;
    const ct_description = req.body.ct_description;
    const ct_limit = +req.body.ct_limit;
    const organization = req.body.organization;

    try {
        const credits_type = new Credits_type({
            ct_title, ct_description, ct_limit, organization
        })
        const result = await credits_type.save();

        res.status(201).json({
            message : "New credits type added!",
            creditsType : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putCreditsType = async (req,res,next) => {

    const id = req.body.id;
    const ct_title = req.body.ct_title;
    const ct_description = req.body.ct_description;
    const ct_limit = req.body.ct_limit;

    try {
        const result = await Credits_type.update({id , ct_title , ct_description, ct_limit});

        res.status(200).json({
            message : "Credits type updated!",
            creditsType : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.deleteCreditsType = async (req,res,next) =>{
    const id = req.params.id;
    try {
        await Credits_type.deleteById(id);
        res.status(200).json({
            message : "Credit type deleted"
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}