import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './Filter.less';

export default class Filter extends Component {

	handlerFilter(evt) {
		let filter = evt.target.value;
		Session.set('filter', filter);
	}

	render() {
		return (<div className="app-filter">
			{/*<span className="app-filter__title">Фильтровать по автору</span>*/}
			<input
				className="app-filter__input"
				placeholder="Фильтровать по автору"
				onChange={this.handlerFilter.bind(this)} />
		</div>);
	}
}
