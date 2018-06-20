var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials, {username: 1});
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function createUser(user) {
  return userModel.create(user);
}

function addSectionInStudent(studentId,sectionId){

  return userModel.findByIdAndUpdate(studentId,
  {
    $push: { sections: sectionId } 
  },)

}


function deleteSectionInStudent(studentId,sectionId){

  return userModel.findByIdAndUpdate(studentId,
  {
    $pull: { sections: sectionId } 
  },)

} 

function findAllUsers() {
  return userModel.find();
}

function updateUser(user){
	console.log("inside service update user");
	console.log(user._id);
	userModel.findByIdAndUpdate(user._id,
	{
		$set: {username: user.username, password: user.password, firstName: user.firstName, lastName: user.lastName, email: user.email, phoneNumber: user.phoneNumber, address: user.address}
	},
	{
		new: true
	},
	function(err, updatedUser){
			if(err)
			{

			}
			else
			{
				
			}
	})
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  findUserByCredentials: findUserByCredentials,
  updateUser: updateUser,
  addSectionInStudent: addSectionInStudent,
  deleteSectionInStudent: deleteSectionInStudent 
};

module.exports = api;