const Deduction_type = require('../models/deduction_type');

module.exports.getDeductionTypes = async (req,res,next) => {
    const orgId = req.params.orgId;

    try {
        const result = await Deduction_type.fetchAll(orgId);

        res.status(200).json({
            message : "All deduction types",
            deductionTypes : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.postDeductionType = async (req,res,next) => {
    
    const dt_title = req.body.dt_title;
    const dt_description = req.body.dt_description;
    const dt_limit = +req.body.dt_limit;
    const organization = req.body.organization;

    try {
        const deduction_type = new Deduction_type({
            dt_title, dt_description, dt_limit, organization
        })
        const result = await deduction_type.save();

        res.status(201).json({
            message : "New deduction type added!",
            deductionType : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putDeductionType = async (req,res,next) => {
    const id = req.body.id;
    const dt_title = req.body.dt_title;
    const dt_description = req.body.dt_description;
    const dt_limit = req.body.dt_limit;

    try {
        const result = await Deduction_type.update({id , dt_title , dt_description, dt_limit});

        res.status(200).json({
            message : "Deduction type updated!",
            deductionType : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.deleteDeductionType = async (req,res,next) => {
    const id = req.params.id;
    try {
        await Deduction_type.deleteById(id);
        res.status(200).json({
            message : "Deduction type deleted"
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}