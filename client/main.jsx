import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';

import App from '../imports/ui/App';
// import '../imports/ui/App.less';

Session.set('sort', [['createdAt', 'desc']]);
Session.set('filter', '');

Meteor.startup(() => {
	render(<App />, document.getElementById('render-target'));
});
