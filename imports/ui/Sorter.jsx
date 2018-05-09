import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './Sorter.less';

export default class Sorter extends Component {

	handlerSortBy(evt) {
		let sort = Session.get('sort');
		sort[0][0] = evt.target.value;
		Session.set('sort', sort);
	}

	handlerSortOrder(evt) {
		let sort = Session.get('sort');
		sort[0][1] = evt.target.value;
		Session.set('sort', sort);
	}

	render() {
		return (<div className="app-sorter">
			<span className="app-sorter__title">Сортировать по</span>
			<select
				className="app-sorter__items"
				defaultValue="createdAt"
				onChange={this.handlerSortBy.bind(this)}>
				<option value="createdAt">дате создания</option>
				<option value="author">автору</option>
			</select>
			<select
				className="app-sorter__items"
				defaultValue="createdAt"
				onChange={this.handlerSortOrder.bind(this)}>
				<option value="desc">убыванию</option>
				<option value="asc">возрастанию</option>
			</select>
		</div>);
	}
}
