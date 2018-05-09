import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './Item.less';

export default class Item extends Component {

	editHandler() {
		Session.set('editID', this.props.data._id);
	}

	removeHandler() {
		Meteor.call('QuotesCollection.remove', this.props.data._id);
	}

	render() {
		const { data } = this.props;
		let author = data.author.replace(
			new RegExp(Session.get('filter'), 'i'),
			function (match) {
				return '<b>' + match + '</b>';
			}
		);

		return (<div className="app-item">
			<div className="app-item__author" dangerouslySetInnerHTML={{__html:author}} />
			<div className="app-item__text" dangerouslySetInnerHTML={{__html:data.text}} />
			{data.updatedAt ? 
				<div className="app-item__time-text">
					Обновлено <div className="app-item__time">{dateToString(data.updatedAt)}</div>
				</div> :
				<div className="app-item__time-text">
					Создано <div className="app-item__time">{dateToString(data.createdAt)}</div>
				</div>
			}
			<button className="app__button" onClick={this.editHandler.bind(this)}>
				Редактировать
			</button>
			&nbsp;
			<button className="app__button" onClick={this.removeHandler.bind(this)}>
				Удалить
			</button>
		</div>);
	}
}
