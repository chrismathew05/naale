//Core imports
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

//Component imports
import {Link} from 'react-router-dom';

//Semantic-UI
import {Step} from "semantic-ui-react";

//Other

//Component
class Navigation extends Component {
    state = {active: 'Welcome'};

    handleClick = (e, { title }) => this.setState({ active: title });

    render() {
        return (
            <Step.Group fluid>
                <Step
                    as={Link}
                    active={this.state.active === 'Welcome'}
                    icon='home'
                    link
                    to={'/'}
                    onClick={this.handleClick}
                    title='Welcome'
                    description='Start here'
                />
                <Step
                    as={Link}
                    active={this.state.active === 'Upload Table'}
                    icon='upload'
                    link
                    to={'/upload-table'}
                    onClick={this.handleClick}
                    title='Upload Table'
                    description='Import picture of table'
                />
                <Step
                    active={this.state.active === 'Dimensions'}
                    icon='add'
                    link
                    to={'/dimensions'}
                    onClick={this.handleClick}
                    title='Dimensions'
                    description='Enter rows and columns'
                />
                <Step
                    as={Link}
                    active={this.state.active === 'Grid Mapping'}
                    icon='table'
                    link
                    to={'/grid-mapping'}
                    onClick={this.handleClick}
                    title='Grid Mapping'
                    description='Place grid mapping over table'
                />
                <Step
                    as={Link}
                    active={this.state.active === 'Download'}
                    icon='arrow down'
                    link
                    to={'/download'}
                    onClick={this.handleClick}
                    title='Download'
                    description='Download table as csv'
                />
            </Step.Group>
        )
    }
}

export default Navigation;