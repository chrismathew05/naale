//Core imports
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

//Component imports

//Semantic-UI
import {Segment, Header, Icon, Button} from "semantic-ui-react";

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
                <Segment placeholder>
                    <Header icon>
                        <Icon name='file image outline' />
                        Upload an image of your table to get started. <br/>
                        Please note we do not store any of your data on our servers. We are powered by the OCR.SPACE API whose <a href="https://ocr.space/faq" target="_blank">privacy policy</a> states the same.
                    </Header>
                    <Button primary onClick={() => document.getElementById('fileInput').click()}>Click to Upload</Button>
                </Segment>
                <input id={'fileInput'} style={{display: 'none'}} type='file' onChange={this.passDataToParent}/>
            </div>
        )
    }
}

export default WelcomePage;