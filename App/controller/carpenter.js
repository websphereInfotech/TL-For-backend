const carpenter = require('../model/carpenter.model');
var jwt = require('jsonwebtoken');


exports.carpenters_create = async function(req,res){
    try {
        const { carpentersName,mobileNo,Address } = req.body;
        const carpenter_create = await carpenter.findOne({ carpentersName: req.body.carpentersName })

        const carpenterData = await carpenter.create({
            carpentersName:carpentersName,
            mobileNo:mobileNo,
            Address:Address
        })
        const payload = {
           id: carpenter_create._id,
           carpentersName:carpentersName,
           mobileNo:mobileNo,
           Address:Address
        };
        let token = jwt.sign(payload, process.env.KEY, { expiresIn: '1h' })

        res.status(200).json({
            status: "Success",
            message: "create userdata",
            data: carpenterData,
            token: token
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}
// //==============================================================UPDATE DATA============================================================
exports.carpenters_update = async function (req, res) {
    try {
        const { carpentersName,mobileNo,Address } = req.body;
        const updatecarpenterdata = {
            carpentersName:carpentersName,
            mobileNo:mobileNo,
            Address:Address
        }
        const carpenterdata = await carpenter.findByIdAndUpdate({ "_id": req.params.id }, { $set: updatecarpenterdata }, { new: true })
        res.status(200).json({
            status: "Success",
            message: "updated data",
            data: carpenterdata
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "user not found"
        })
    }
}
// //===============================================================DELETE DATA====================================================================
exports.carpenters_delete = async function (req, res) {
    try {
        const carpenterdatadelete = await carpenter.findByIdAndDelete({ "_id": req.params.id });
        if (!carpenterdatadelete) {
            return res.status(400).json({
                status: "Fail",
                message: "user not found"
            })
        }
        res.status(200).json({
            status: "Sucess",
            message: "user delete sucessfully"
        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: "user not found"
        })
    }
}
// //========================================================================VIEW DATA=========================================================
exports.carpenters_viewdata = async function (req, res) {
    try {
        const viewdata = await carpenter.findById({ "_id": req.params.id });
        if (!viewdata) {
            res.status(401).json({
                status: "Fail",
                message: "user not found"
            })
        }
        res.status(201).json({
            status: "Sucess",
            message: "user Fetch sucessfully",
            data: viewdata
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}
// //========================================================================LIST DATA=========================================================
exports.carpenters_listdata = async function (req, res) {
    try {
        const carpenterlistdata = await carpenter.find()
        res.status(200).json({
            status: "Success",
            message: "get all data",
            data: carpenterlistdata
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}