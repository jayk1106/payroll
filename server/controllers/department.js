const Department = require('../models/department');

module.exports.getDepartments = async (req,res,next) => {
    
    try {
        const result = await Department.fetchAll(req.organizationId);
        return res.status(200).json({
            message : "All departments for this organization",
            departments : result.rows
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.postDepartment = async (req,res,next) => {
    
    const dp_name = req.body.dp_name;
    const dp_description = req.body.dp_description;
    const organization = req.body.organization;

    try {
        const department = new Department({
            dp_name , dp_description , organization
        })
        const result = await department.save();

        return res.status(201).json({
            message : "Department added",
            department : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.putDepartment = async (req,res,next) => {
    
    const id = req.body.id;
    const dp_name = req.body.dp_name;
    const dp_description = req.body.dp_description;
    
    try {
        const result = await Department.update({ id , dp_name, dp_description});
        return res.status(200).json({
            message : "Department details updated!",
            department : result.rows[0]
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}

module.exports.deleteDepartment = async (req,res,next) => {
    const id = req.params.id;

    try {
        await Department.deleteById(id);
        res.status(200).json({
            message : "Department Deleted"
        })
    } catch (err) {
        if(err.statusCode) err.statusCode = 500;
        next(err);
    }
}