const BigPromise = require("../middleware/Bigpromise");
const Section = require("../models/section");
const CustomError = require("../util/customError");

// creating an section
exports.SectionItem = BigPromise(async (req, res, next) => {
  const { section } = req.body;
  const alreadyExistSec = await Section.findOne({ section });

  if (alreadyExistSec) {
    
    throw new CustomError("Already department existed", 400);
  }
  const Sec = await Section.create({ section });
  res.status(200).json({
    success: true,
    Sec,
  });
});

// find all the section
exports.ListSectionItem = BigPromise(async (req, res, next) => {
  const listOfSection = await Section.find();

  res.status(200).json({
    success: true,
    listOfSection,
  });
});

//getting the department with _id
exports.ListSectionItem = BigPromise(async (req, res, next) => {
  const { id } = req.body;
  const listOfSection = await Section.find({ department: id })
    .populate("")
    .exec();

  res.status(200).json({
    success: true,
    listOfSection,
  });
});
