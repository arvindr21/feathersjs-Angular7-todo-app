// profile-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const profile = new Schema({
    name: { type: String, required: true, required: [true, 'Name is required'] },
    age: { type: Number, required: true, required: [true, 'Age is required'] },
    user: { type: Schema.Types.ObjectId, ref: 'users', unique: true }
  }, {
      timestamps: true
    });

  return mongooseClient.model('profile', profile);
};
