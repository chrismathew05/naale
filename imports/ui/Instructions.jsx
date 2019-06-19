//Core imports
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

//Component imports

//Semantic-UI
import {Message} from "semantic-ui-react";

//Other

//Component
class Instructions extends Component {
    state = {};

    method = () => {

    };

    render() {
        return (
            <Message>
                <Message.Header>5 Steps to Use</Message.Header>
                <Message.List>
                    <Message.Item>Enter #Rows and #Cols below</Message.Item>
                    <Message.Item>Click the image where you want to begin drawing grid</Message.Item>
                    <Message.Item>Move mouse to expand grid</Message.Item>
                    <Message.Item>Click again to capture grid</Message.Item>
                    <Message.Item>Wait for .csv download to complete</Message.Item>
                </Message.List>
            </Message>
        )
    }
}

//Type-checking
Instructions.propTypes = {};

export default Instructions;