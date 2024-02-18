'use client'
import Editor from '@monaco-editor/react';
import React, { useState, useRef, useEffect } from 'react';
import { usePython } from 'react-py';
import './CodeEditor.css';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//custom React component to wrap Monaco code editor
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

//for react-py
const files = {
    "script.py": {
      name: "script.py",
      language: "python",
      value: "#your code here!"
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: "<div> </div>"
    }
}

export default function CodeEditor( props ) {
    const editorRef = useRef(null);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }
    return (
        <>
        <div className={classes.root}>
        <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            {props.files.map((file) => (
                <Tab label={file.name} />
            ))}
            </Tabs>
        </AppBar>
          {props.files.map((file) => (
            //TODO FIND a way to display tabs that isn't index dependent??
            <TabPanel value={value} index={file.index}>
                <Editor
                    height="60vh"
                    width="100%"
                    theme="vs-light"
                    onMount={handleEditorDidMount}
                    path={file.name}
                    defaultLanguage={file.language}
                    defaultValue={file.value}
                    onChange={() => {props.setInput(editorRef.current.getValue())}}
                />
            </TabPanel>
          ))}
        </div>
      </>
    );
}