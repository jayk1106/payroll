const Tax = require('../models/tax');

module.exports.getTaxes = async (req,res,next) => {
    try {
        const result = await Tax.fetchAll();
        res.status(200).json({
            message : "All taxes",
            taxes : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.postTax = async (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const tax_in_pr = req.body.tax_in_pr;
    const organization = req.body.organization;

    try {
        const tax = new Tax( {title , description, tax_in_pr, organization});
        const result = await tax.save();
        res.status(201).json({
            message : "Tax added!",
            tax : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putTax = async (req,res,next) => {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const tax_in_pr = req.body.tax_in_pr;

    try {
        const result = await Tax.update({id, title , description, tax_in_pr});
        res.status(200).json({
            message : "Tax details updated",
            tax : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.deleteTax = async (req,res,next) => {
    const id = req.params.id;

    try {
        await Tax.deleteById(id);
        res.status(200).json({
            message : "Tax deleted!"
        })
    } catch (err) {
        
    }
}