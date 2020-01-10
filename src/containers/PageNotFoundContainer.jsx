import React from 'react';
import {Paper} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(() => ({
    paper: {
        minHeight: '98vh',
        display: 'flex',
        alignItems: 'center',
    }
}));

function PageNotFoundContainer() {
    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.paper}>
            <div style={{width: '100%'}}>
                <Typography variant={'h1'}>
                    404
                </Typography>
                <Typography variant={'h5'}>
                    The page you are looking for was not found.
                </Typography>
                <Typography variant={'h5'} style={{marginTop: '20px'}}>
                    <a href="/">Back to Home</a>
                </Typography>
            </div>
        </Paper>
    );
};


export default PageNotFoundContainer;
