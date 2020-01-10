import React, {useEffect, useState} from 'react';
import {Paper} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import * as cocoSsd from '@tensorflow-models/coco-ssd';


const useStyles = makeStyles((theme) => ({
    hidden: {
        display: 'none',
    },
    wrapper: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        position: 'relative',
    },
    paper: {
        minHeight: '98vh',
        display: 'flex',
        alignItems: 'center',
    }
}));

function HomeContainer() {
    const classes = useStyles();
    const videoRef = React.createRef();
    const canvasRef = React.createRef();

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const webCamPromise = navigator.mediaDevices
                .getUserMedia({
                    audio: false,
                    video: {
                        facingMode: "user"
                    }
                })
                .then(stream => {
                    window.stream = stream;
                    videoRef.current.srcObject = stream;
                    return new Promise((resolve, reject) => {
                        videoRef.current.onloadedmetadata = () => {
                            resolve();
                        };
                    });
                });
            const modelPromise = cocoSsd.load();
            Promise.all([modelPromise, webCamPromise])
                .then(values => {
                    detectFrame(videoRef.current, values[0]);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    const detectFrame = (video, model) => {
        model.detect(video).then(predictions => {
            renderPredictions(predictions);
            requestAnimationFrame(() => {
                detectFrame(video, model);
            });
        });
    };

    const renderPredictions = predictions => {
        //console.log('Request to render the predictions :: ', predictions);
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Font options.
        const font = "16px sans-serif";
        ctx.font = font;
        ctx.textBaseline = "top";
        predictions.forEach(prediction => {
            const x = prediction.bbox[0];
            const y = prediction.bbox[1];
            const width = prediction.bbox[2];
            const height = prediction.bbox[3];
            // Draw the bounding box.
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);
            // Draw the label background.
            ctx.fillStyle = "#FF0000";
            const textWidth = ctx.measureText(prediction.class).width;
            const textHeight = parseInt(font, 10); // base 10
            ctx.fillRect(x, y, textWidth + 2, textHeight + 2);
        });

        predictions.forEach(prediction => {
            const x = prediction.bbox[0];
            const y = prediction.bbox[1];
            // Draw the text last to ensure it's on top.
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(prediction.class, x, y);
        });
    };


    return (
        <Paper variant="outlined" className={classes.paper}>
            <div style={{width: '100%'}}>

                <video
                    className="video_container"
                    autoPlay
                    playsInline
                    muted
                    ref={videoRef}
                    width="600"
                    height="500"
                />
                <canvas
                    className="video_container"
                    ref={canvasRef}
                    width="600"
                    height="500"
                />


            </div>
        </Paper>
    );
};


export default HomeContainer;
