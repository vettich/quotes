import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import './App.less';
import List from './List';

export default class App extends Component {

	render() {
		return (<main className="app">
			<h1 className="app__title">Цитатник</h1>
			<List />
		</main>);
	}
}
