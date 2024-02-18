import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Settings from './Settings.js';
import Feedback from './Feedback.js';
import Chat from './Chat.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

//handle chat, shell, feedback and settings tabs
export default function Sidebar( props ) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [progress, setProgress] = useState(
    "User's Coding Journey Progress:\n \
- Defined initial functions including add, multiply, square, divide, and iseq, with some logical and syntax errors.\n \
- Correctly implemented add and multiply functions from the start.\n \
- Improved the square function from performing an incorrect operation (addition) to correct squaring (multiplication).\n \
- Updated the divide function to perform floating-point division instead of floor division.\n \
- Initially attempted to fix the iseq function using assignment '=' instead of equality '==', but later corrected it with assistance.\n \
- Learned the importance of correct operator usage in Python for equality checks.\n \
- No issues related to forgetting semicolons as Python doesn't require them to end statements.")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="sidebar-tabs" variant="fullWidth" scrollButtons='off'>
          <Tab label="Chat" wrapped={false} />
          <Tab label="Shell" wrapped={false} />
          <Tab label="Feedback" wrapped={false} />
          <Tab label="Settings" wrapped={false} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Chat />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='CodeEditor-text-areas-container'>
          <textarea
              value={props.shellComp}
              className='CodeEditor-text-area'
              readOnly={true}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Feedback progress={progress} setProgress={setProgress}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Settings />
      </TabPanel>
    </div>
  );
}