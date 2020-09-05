const mongoose = require('mongoose');
//connect wil cloud monogo db
mongoose.connect("mongodb+srv://Ravii_1996:Qwerty%2397@cluster0-r98r8.mongodb.net/loginDB" , { useNewUrlParser: true, useUnifiedTopology: true });
var Schema = mongoose.Schema;
const conn = mongoose.connection;

//chek db connected or not
conn.on('connected', () => {
  console.log('MongoDB connected')
});

conn.on('error', (err) => {
  if (err) {
    throw err;
  }
});


// Schema of user. This could be admin also on the basis of role
var UserSchema = new Schema({
  email : { type: String, required: true, unique: true},
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'admin',
    enum: ["user", "admin"]
   }
  });

  var User = module.exports = mongoose.model('User', UserSchema);


// // This scheduler first delete the entry and the insert the entry when app run first time.
// module.exports.Userscheduler = async function (data, callback) {
//   await User.deleteMany(callback);
//   User.insertMany(data, callback);
// }




//  delete user profile only done by admin
module.exports.deleteUser = async function (user, callback) {
  await User.deleteOne({email  : user.email},callback);
}

// every user will be a admin.
module.exports.saveUser = async function (user, callback) {
  await User.create(user,callback);
}

//this is used to get the all user
module.exports.getUser = async function (callback) {
  await User.find({}, callback);
}




