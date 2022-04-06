const Branch = require('../models/branch');

module.exports.getBranch = async (req,res,next) => {
    
    
    try {
        const result = await Branch.fetchAll();
    
        res.status(200).json({
            message : "All branches of organization",
            branches : result.rows
        })

    } catch (err) {
        console.log(err);
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.postBranch = async (req,res,next) => {

    const br_name = req.body.br_name;
    const br_city = req.body.br_city;
    const br_country = req.body.br_country;
    const br_address = req.body.br_address;
    const organization = req.body.organization;


    try {
        const branch = new Branch({ br_name , br_city, br_country, br_address, organization });
        const result = await branch.save();
        res.status(201).json({
            message : "Branch created!",
            branch : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putBranch = async (req,res,next) => {
    const br_name = req.body.br_name;
    const br_city = req.body.br_city;
    const br_country = req.body.br_country;
    const br_address = req.body.br_address;
    const id = req.body.id;

    try {
        const result = await Branch.update({ br_name , br_city, br_country, br_address , id});

        res.status(200).json({
            message : "Branch details updated!",
            branch : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.deleteBranch = async (req,res,next) => {

    const id = req.body.id;

    try {
        
        await Branch.deleteById(id);

        res.status(200).json({
            message: "Branch deleted!"
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}