import React from 'react';
import { TextField, makeStyles, Typography } from '@material-ui/core';

// custom styling using Material UI makeStyles
const useStyles = makeStyles({
  feedbackInput: {
    fontFamily: 'Courier New',
    width: '100%',
  },
  explanation: {
    marginTop: '10px',
    fontSize: '12px'
  }
});

//feedback tab
export default function Feedback ( props ) {
  const classes = useStyles();
  
  const handleInputChange = event => {
    props.setProgress(event.target.value);
  };

  return (
    <>
      <Typography variant="h5">Feedback</Typography>
      <TextField
        value={props.progress}
        className={classes.feedbackInput}
        multiline
        minRows={20}
        maxRows={20}
        variant="outlined"
        onChange={handleInputChange}
      />
      <Typography className={classes.explanation}>
        The text field contains AI-generated feedback based on the user's code and progress over time.
      </Typography>
    </>      
  );
};