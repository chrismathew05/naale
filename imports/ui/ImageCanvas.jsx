//Core imports
import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {HTTP} from "meteor/http";

//Component imports

//Semantic-UI
import {Grid, Button, Input, Segment} from "semantic-ui-react";
import imageToSlices from "image-to-slices";

//Other

//Component
let canvas;
let ctx;
let mouse = {
    x: 0,
    y: 0
};
let start = {
    x: 0,
    y: 0
};
let offset = {
    x: 0,
    y: 0
};
let imageState = 0;
class ImageCanvas extends Component {
    handleMousePos = e => {
        if(e.pageX) {
            mouse.x = e.pageX + window.pageXOffset - offset.x;
            mouse.y = e.pageY + window.pageYOffset - offset.y;
        }
    };

    // 2. Grid is clicked to initiate draw & 4. Grid is clicked again to stop the draw and initiate crop
    toggleGrid = e => {

        if(imageState === 0) {
            let img = document.getElementById('cropImg');
            let rect = img.getBoundingClientRect();
            offset.x = +rect.x;
            offset.y = +rect.y;
            this.handleMousePos(e);

            start.x = mouse.x;
            start.y = mouse.y;

            canvas = document.getElementById('gridSpace');
            ctx = canvas.getContext('2d');

            imageState = 1; //image placed and grid initiated
        } else if(imageState === 1) {

            this.handleMousePos(e);
            imageState = 2;
            this.cropImg();
        }
    };

    // 3. Grid is resized as mouse posn moves
    resizeGrid = e => {
        if(imageState === 1) {
            this.handleMousePos(e);
            let rowCount = document.getElementById('rowCount').value;
            let colCount = document.getElementById('colCount').value;

            let totalWidth = mouse.x - start.x;
            let totalHeight = mouse.y - start.y;

            let w = totalWidth/colCount;
            let h = totalHeight/rowCount;

            canvas.width += 0;

            ctx.strokeStyle = 'red';
            ctx.rect(start.x, start.y, totalWidth, totalHeight);
            ctx.stroke();

            // draw horizontal row lines
            for (let i = 1; i < rowCount; i++) {
                ctx.moveTo(start.x, h*i + start.y);
                ctx.lineTo(mouse.x, h*i + start.y);
                ctx.stroke();
            }

            // draw vertical column lines
            for (let i = 1; i < colCount; i++) {
                ctx.moveTo(w*i + start.x, start.y);
                ctx.lineTo(w*i + start.x, mouse.y);
                ctx.stroke();
            }
        }
    };

    // 5. Crop image within set lines
    cropImg = () => {
        let colLines = [];
        let rowLines = [];

        // determine cutting lines
        let rowCount = document.getElementById('rowCount').value;
        let colCount = document.getElementById('colCount').value;

        let totalWidth = mouse.x - start.x;
        let totalHeight = mouse.y - start.y;

        let w = totalWidth/colCount;
        let h = totalHeight/rowCount;

        for (let i = 0; i <= rowCount; i++) {
            rowLines.push(start.y + i*h);
        }

        for (let i = 0; i <= colCount; i++) {
            colLines.push(start.x + i*w);
        }

        imageToSlices(this.props.file, rowLines, colLines, {
            saveToDataUrl: true
        }, function(dataUrlList) {
            let index = 1;
            const postURL = "https://api.ocr.space/parse/image";
            let rawResults = Array(rowCount * colCount).fill(0);
            let resCount = 0;

            // 6. Loop through each table cell and perform OCR
            for (let i = 0; i < rowCount; i++) {
                index += (+colCount + 2);
                for (let j = 0; j < colCount; j++) {
                    let base64image = dataUrlList[index + j].dataURI;

                    HTTP.call('POST', postURL, {
                        params: {
                            base64image,
                            scale: 'true'
                        },
                        headers: {
                            apikey: Meteor.settings.public.ocrSpaceKey,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }, (err, res) => {
                        if(err) {
                            console.log(err);
                        } else {

                            // 6. Save OCR results (in proper order)
                            rawResults[colCount * i + j] = res.data.ParsedResults[0].ParsedText.trim();
                            resCount++;

                            // 7. Once all OCR results collected, export to csv
                            if(resCount === rowCount * colCount) {

                                let csvExport = "data:text/csv;charset=utf-8,";
                                for (let k = 0; k < rowCount; k++) {
                                    for (let l = 0; l < colCount; l++) {
                                        csvExport += (rawResults[colCount * k + l]) + ',';
                                    }
                                    csvExport = csvExport.slice(0, -1);
                                    csvExport += "\r\n";
                                }

                                // download file by emulating link click
                                let encodedUri = encodeURI(csvExport);
                                let link = document.createElement("a");
                                link.setAttribute("href", encodedUri);
                                link.setAttribute("download", "results.csv");
                                document.body.appendChild(link);

                                link.click();
                            }
                        }
                    });
                }
            }
        });
    };

    adjustCanvas = () => {
        let img = document.getElementById('cropImg');

        document.getElementById('gridSpace').setAttribute('height', img.height);
        document.getElementById('gridSpace').setAttribute('width', img.width);
    };

    resetFile = () => {
        imageState = 0;
        this.props.resetFile();
    };

    render() {
        return (
            <Grid columns={4} stackable>
                <Grid.Column width={4}>
                    <Segment>
                        <Input id={'rowCount'} min={1} max={20} type={'number'} placeholder={'# Rows'} fluid/>
                        <br/>
                        <Input id={'colCount'} min={1} max={20} type={'number'} placeholder={'# Columns'} fluid/>
                        <br/>
                        <Button secondary onClick={this.resetFile}>New Image</Button>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <img id={'cropImg'} src={this.props.file} style={{zIndex: '0', position: 'absolute', maxHeight: '800', maxWidth: '95%'}} onLoad={this.adjustCanvas}/>
                    <canvas id="gridSpace" onClick={e => this.toggleGrid(e)} onMouseMove={e => this.resizeGrid(e)} style={{zIndex: '1', position: 'absolute', border: '2px solid black', cursor: 'crosshair'}}/>
                </Grid.Column>
            </Grid>
        )
    }
}

export default ImageCanvas;