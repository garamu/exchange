
/* eslint-disable */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AlbumSchema = new Schema({
	name: String,
	type: String,
	year: String,
	figurines: Object,
	sections: Object
});
module.exports = mongoose.model('Album', AlbumSchema);
