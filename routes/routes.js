import express from "express";
import moment from "moment/moment.js";
import multer from "multer";
import userModel from "../models/userModel.js";

const router = express.Router();


// Image Storage
const imgconfig = multer.diskStorage({
    destination:(req,file,callback) => {
        callback(null,"./uploads")
    },
    filename:(req,file,callback) => {
        callback(null,`imgae-${Date.now()}. ${file.originalname}`)
    }
});

// Valid Image Check
const isImage = (req,file,callback) => {
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("Only images is allowd"))
    }
}

// Multer Config
const upload = multer({
    storage: imgconfig,
    fileFilter: isImage
});


// REGISTER USER || POST API
router.post("/register", upload.single("photo") , async (req, res) => {
    const { fname } = req.body;
    const { filename } = req.file;

    if(!fname || !filename) {
        return res.status(401).json({status:401,message:"All fields are required"})
    }

    try {
        const date = moment(new Date()).format("YYYY-MM-DD");
        const userData = new userModel({
            fname: fname,
            imgpath: filename,
            date: date
        });
        const finalData = await userData.save();
        res.status(201).json({status: 201, finalData});
    } catch (error) {
        res.status(401).json({status:401, error})
    }
});


// GET USER || GET API
router.get("/getdata", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({status: 200, users});
    } catch (error) {
        res.status(401).json({status: 401, error});
    }
});


// DELETE USER || DELETE API
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete({_id: id});
        res.status(200).json({status: 200, msg: "User Deleted"});
    } catch (error) {
        res.status(401).json({status: 401, error});
    }
});

export default router;