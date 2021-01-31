const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')

const { Schema } = mongoose;

const UsersSchema = new Schema({
    googleId: String,
    employeeList:{type: mongoose.Schema.Types.ObjectId,ref:'employees'}
});


UsersSchema.plugin(findOrCreate);

mongoose.model('user', UsersSchema);