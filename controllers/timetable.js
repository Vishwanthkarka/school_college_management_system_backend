const BigPromise = require("../middleware/Bigpromise");
const Timetable = require("../models/timetable")
const CustomError = require("../util/customError")


  //add the time table
exports.addTimeTable = BigPromise(async(req,res,next)=>{
const {section,department,monday,tuesday,wednesday,thursday,friday,saturday,period,subjectName} = req.body;
const timeTable = await Timetable.create({section,department,monday,tuesday,wednesday,thursday,friday,saturday,period, subjectName,
    lectureId:req.user.id
})


res.status(200).json({
   success:true,
    timeTable
})
})

// get lecture timetable
exports.getLectureTimeTable = BigPromise(async(req,res,next)=>{
    const lectureTimeTable = await Timetable.find({"lectureId":req.user.id})
    if(!lectureTimeTable){
        
        throw new CustomError("No TimeTable in DB", 400);
    }
    res.status(200).json({
        success:true,
        lectureTimeTable
    })
})

//get time table for student
exports.getTimeTable = BigPromise(async(req,res,next)=>{
const {section, department} = req.params;
const getTimeTable = await Timetable.find({$and: [{section,department}]}).populate("lectureId").exec()
res.status(200).json({
    success:true,
    getTimeTable
})
})
