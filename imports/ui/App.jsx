//Core imports
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';

//Component imports
import ImageCanvas from "./ImageCanvas";

// import Navigation from "./Navigation";
import WelcomePage from "./WelcomePage";
import {Button, Header} from "semantic-ui-react";


//Other

class App extends Component {
    state = {
        file: null
    };

    handleFileUpload = file => this.setState({file});

    resetFile = () => this.setState({file: null});

    render() {
        return (
            <div>
                <Header as='h2' block>
                    Welcome to Naale
                    <Header.Subheader>Convert table images to csv and json</Header.Subheader>
                </Header>
                <div>
                    {this.state.file === null ?
                        <WelcomePage file={this.handleFileUpload}/> : <ImageCanvas file={this.state.file} resetFile={this.resetFile}/>
                    }
                </div>

            </div>
        )
    }
}

App.propTypes = {};
const AppContainer = withTracker(() => {

    return {
    };
})(App);

export default AppContainer;