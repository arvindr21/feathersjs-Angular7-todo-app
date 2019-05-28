// todos-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  
  const todos = new Schema({
    text: { type: String, required: [true, 'A todo text is required'] },
    isCompleted: {type: Boolean, default: false, required: [true, 'Todo completion status is required']},
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now },
    created_by: { type: Schema.Types.ObjectId, ref: 'users' },
    updated_by: { type: Schema.Types.ObjectId, ref: 'users' }
  }, {
    timestamps: true
  });

  todos.index({ text: 'text' }); 

  return mongooseClient.model('todos', todos);
};
