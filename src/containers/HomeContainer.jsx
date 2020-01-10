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

function HomeContainer() {
    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.paper}>
            <div style={{width: '100%'}}>
                <Typography variant={'h5'}>
                    Welcome to Home
                </Typography>
            </div>
        </Paper>
    );
};


export default HomeContainer;
