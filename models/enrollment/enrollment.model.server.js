var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema
);

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}

function findSectionsForStudent(studentId) {
  return enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();
}

function findStudentsForSection(sectionId){
  return enrollmentModel.find({section: sectionId}).populate('student').exec();
}

function unenrollStudentInSection(enrollmentId){
  console.log('Web storem' + enrollmentId)
	return enrollmentModel.remove({_id: enrollmentId}, function (err,obj) {
		if(err) throw err;
	});

}

module.exports = {
  enrollStudentInSection: enrollStudentInSection,
  findSectionsForStudent: findSectionsForStudent,
  unenrollStudentInSection: unenrollStudentInSection,
  findStudentsForSection: findStudentsForSection
};