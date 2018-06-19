module.exports = function (app) {

  app.post('/api/course/:courseId/section', createSection);
  app.get('/api/course/:courseId/section', findSectionsForCourse);
  app.post('/api/section/:sectionId/enrollment', enrollStudentInSection);
  app.get('/api/student/section', findSectionsForStudent);
  app.delete('/api/section/:sectionId', deleteSection);
  app.get('/api/sectionProfile/:sectionId',section)
  app.put('/api/updateSection',updateSection)
  app.delete('/api/student/:sectionId/section/:userId/unenrollment/:enrollmentId',unenrollStudent)

  var sectionModel = require('../models/section/section.model.server');
  var enrollmentModel = require('../models/enrollment/enrollment.model.server');
  var userModel = require('../models/user/user.model.server')

  function findSectionsForStudent(req, res) {
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    enrollmentModel
      .findSectionsForStudent(studentId)
      .then(function(enrollments) {
        res.json(enrollments);
      });
  }

  function unenrollStudent(req,res){
    console.log("Inside")
    var studentId = req.params.userId;
    var sectionId = req.params.sectionId;
    var enrollmentId = req.params.enrollmentId;
    sectionModel
    .incrementSectionSeats(sectionId)
    .then(function(){
      console.log("section Inside")
      return enrollmentModel.unenrollStudentInSection(enrollmentId)
    })
    .then(function(){
      console.log("delete Inside")
        return sectionModel.deleteStudnentInSection(studentId,sectionId)
      })
      .then(function(){
        console.log("student Inside")
        return userModel.deleteSectionInStudent(studentId,sectionId)
      })
      .then(function (enrollment) {
        res.json(enrollment);
  });
    }

  function enrollStudentInSection(req, res) {
    var sectionId = req.params.sectionId;
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    var enrollment = {
      student: studentId,
      section: sectionId
    };

    sectionModel
      .decrementSectionSeats(sectionId)
      .then(function () {
        return enrollmentModel
          .enrollStudentInSection(enrollment)
      })
      .then(function(){
        return sectionModel.addStudnentInSection(studentId,sectionId)
      })
      .then(function(){
        return userModel.addSectionInStudent(studentId,sectionId)
      })
      .then(function (enrollment) {
        res.json(enrollment);
      })
  }

  function findSectionsForCourse(req, res) {
    var courseId = req.params['courseId'];
    sectionModel
      .findSectionsForCourse(courseId)
      .then(function (sections) {
        res.json(sections);
      })
  }

  function createSection(req, res) {
    var section = req.body;
    sectionModel
      .createSection(section)
      .then(function (section) {
        res.json(section);
      })
  }

  function deleteSection(req,res){
     var sectionId = req.params['sectionId'];
     console.log(sectionId)
     console.log("in deleteSection")
     sectionModel.deleteSection(sectionId)
  }

   function section(req, res) {
   var sectionId = req.params['sectionId'];
   console.log(sectionId);
   sectionModel.findSectionById(sectionId)
    .then(function(section) {
      res.json(section);
    });
  }


  function updateSection(req,res){

      var section = req.body;
      console.log(section);
      sectionModel.updateSection(section);
      res.send("updated section");
  }

};