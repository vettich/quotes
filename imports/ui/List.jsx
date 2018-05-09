import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import QuotesCollection from '../api/QuotesCollection';
import Item from './Item';
import ItemEdit from './ItemEdit';
import Sorter from './Sorter';
import Filter from './Filter';

class List extends Component {

	render() {
		const { quotes, editID, addExpanded } = this.props;
		if(!quotes) return (<div className="loading">Loading...</div>);
		else return (<div className="list">
			<Filter />
			<Sorter />
			{ addExpanded ? 
				<ItemEdit /> :
				<button
					className="app__button"
					onClick={() => { Session.set('addExpanded', true); }}>
					Добавить новую цитату
				</button> }

			{quotes.map((v, i) => 
				{return v._id == editID ? 
					<ItemEdit key={i} data={v} /> :
					<Item key={i} data={v} />
				}
			)}
		</div>);
	}
}

export default withTracker(() => {
	Meteor.subscribe('QuotesCollection');
	let filter = {
		author: {
			$regex: Session.get('filter'),
			$options: 'i'
		},
	};
	let options = {
		sort: Session.get('sort')
	};

	return {
		quotes: QuotesCollection.find(filter, options).fetch(),
		editID: Session.get('editID'),
		addExpanded: Session.get('addExpanded'),
	};
})(List);