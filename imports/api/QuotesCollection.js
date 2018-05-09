import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

const QuotesCollection = new Mongo.Collection('quotes');
export default QuotesCollection;

if(Meteor.isServer) {
	Meteor.publish('QuotesCollection', function() {
		return QuotesCollection.find();
	});
}

Meteor.methods({
	'QuotesCollection.insert'(author, text) {
		check(author, String);
		check(text, String);

		return QuotesCollection.insert({
			author: author,
			text: text,
			createdAt: new Date(),
		});
	},

	'QuotesCollection.update'(id, author, text) {
		check(id, String);
		check(author, String);
		check(text, String);

		if(!id) {
			return QuotesCollection.insert({
				author: author,
				text: text,
				createdAt: new Date(),
			});
		}

		return QuotesCollection.update({_id: id}, {$set: {
			author: author,
			text: text,
			updatedAt: new Date(),
		}});
	},

	'QuotesCollection.remove'(id) {
		check(id, String);

		return QuotesCollection.remove({_id: id});
	},
})
