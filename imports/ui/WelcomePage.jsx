//Core imports
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

//Component imports

//Semantic-UI
import {Header, Button} from "semantic-ui-react";


//Other

//Component
class WelcomePage extends Component {

    passDataToParent = e => {
        if(e.target.files.length > 0) {
            this.props.file(URL.createObjectURL(e.target.files[0]));
        }
    };

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Button primary onClick={() => document.getElementById('fileInput').click()}>Upload table image</Button>
                <input id={'fileInput'} style={{display: 'none'}} type='file' onChange={this.passDataToParent}/>
            </div>
        )
    }
}

export default WelcomePage;