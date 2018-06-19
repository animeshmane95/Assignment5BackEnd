var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
  return sectionModel.create(section);
}

function findSectionById(sectionId) {
  return sectionModel.findById(sectionId);
}

function addStudnentInSection(studentId,sectionId){

  return sectionModel.findByIdAndUpdate(sectionId,
  {
    $push: { students: studentId } 
  },)

}

function deleteStudnentInSection(studentId,sectionId){

  return sectionModel.findByIdAndUpdate(sectionId,
  {
    $pull: { students: studentId } 
  },)

}

function deleteSection(sectionId){
  console.log(" " + sectionId)
  console.log("Inside deleteSection section.server")
  sectionModel.findByIdAndRemove(sectionId,function(err,deleteSection){
    if(err){

    }
    else{

    }
  });
}

function findSectionsForCourse(courseId) {
  return sectionModel.find({courseId: courseId});
}

function decrementSectionSeats(sectionId) {
  return sectionModel.update({
    _id: sectionId
  }, {
    $inc: {seats: -1}
  });
}



function incrementSectionSeats(sectionId) {
  return sectionModel.update({
    _id: sectionId
  }, {
    $inc: {seats: +1}
  });
}


function updateSection(section){
  console.log("inside service update section");
  console.log(section._id);
  sectionModel.findByIdAndUpdate(section._id,
  {
    $set: {name: section.name, seats: section.seats}
  },
  {
    new: true
  },
  function(err, updateSection){
      if(err)
      {

      }
      else
      {
        
      }
  })
}



module.exports = {
  createSection: createSection,
  findSectionsForCourse: findSectionsForCourse,
  decrementSectionSeats: decrementSectionSeats,
  incrementSectionSeats: incrementSectionSeats,
  deleteSection: deleteSection,
  findSectionById: findSectionById,
  updateSection: updateSection,
  addStudnentInSection: addStudnentInSection,
  deleteStudnentInSection: deleteStudnentInSection
};