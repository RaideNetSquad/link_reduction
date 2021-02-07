const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    //массив ссылок Id, ref - ссылка на коллекцию к которой привязан
    links: [{type: Types.ObjectId, ref: 'Link'}]
})

module.exports = model('User', schema);