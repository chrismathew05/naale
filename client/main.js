import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import AppContainer from '../imports/ui/App';

var testVariable = 'testing';

Meteor.startup(() => {
    render(<AppContainer/>, document.getElementById('render-target'));
});