import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './ItemEdit.less';

export default class ItemEdit extends Component {

	saveToDB(author, text) {
		let self = this;
		Meteor.call(
			'QuotesCollection.update',
			this.props.data && this.props.data._id || '',
			author.value,
			text.value,
			function(error, result) {
				Session.set('editID', false);
				author.value = '';
				text.value = '';
				self.forceUpdate();
			}
		);
	}

	save(evt) {
		let author = evt.target.parentElement.querySelector('input[name=author]');
		let text = evt.target.parentElement.querySelector('textarea[name=text]');
		let allowSave = true;
		this.authorError = false;
		this.textError = false;

		if(!author.value) {
			allowSave = false;
			this.authorError = "Это поле обязательно для заполнения";
		}
		if(!text.value) {
			allowSave = false;
			this.textError = "Это поле обязательно для заполнения";
		}

		if(allowSave) {
			this.saveToDB(author, text);
		} else {
			this.forceUpdate();
		}
	}

	cancel() {
		if(this.props.data && this.props.data._id) {
			Session.set('editID', false);
		} else {
			Session.set('addExpanded', false);
		}
	}

	render() {
		let { data } = this.props;
		if(!data) {
			data = {};
		}

		return (<div className="app-item-edit">
			<div className="app-item-edit__group">
				<label className="app-item-edit__label">
					Автор
					<span className="app-item-edit__error">{this.authorError}</span>
				</label>
				<input
					className={"app-item-edit__input" + (this.authorError ? " app-item-edit__input--error" : "")}
					name="author"
					defaultValue={data.author} />
			</div>
			<div className="app-item-edit__group">
				<label className="app-item-edit__label">
					Текст
					<span className="app-item-edit__error">{this.textError}</span>
				</label>
				<textarea
					className={"app-item-edit__textarea" + (this.textError ? " app-item-edit__textarea--error" : "")}
					name="text"
					defaultValue={data.text} />
			</div>
			<button className="app__button" onClick={this.save.bind(this)}>
				{data._id ? "Сохранить" : "Добавить"}
			</button>
			&nbsp;
			<button className="app__button" onClick={this.cancel.bind(this)}>
				Отменить
			</button>
		</div>);
	}
}
