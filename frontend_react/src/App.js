import React, { useState, useEffect } from 'react';
import './App.css';
import { PythonProvider } from 'react-py';
import NavBar from './components/NavBar';
import CodeEditor from './components/CodeEditor';
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Files from './components/Files';
import { Grid, Paper } from '@material-ui/core';
import { Editor } from '@monaco-editor/react';
import { usePython } from 'react-py';
import Sidebar from './components/Sidebar';

//define colour palette; useful way to change dark/light theme if desired
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", 
      nav: "#012169",
      logo: "#FFD960",
    },
    secondary: {
      main: "#f50057",
    },
    light: {
      main: "#3f51b5", 
      nav: "#012169",
      logo: "#FFD960",
      file: "#FFFFFF30",
    },
    background: {
      default: "#c4c4c4" 
    },
  },
});

function App() {
  //react-py code
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython();
  const [shell, setShell] = useState('');
  const [input, setInput] = useState({});

  const [files, setFiles] = useState([
    {
      index: 0,
      name: "main.py",
      language: "python",
      value: "#your code here!"
    },
    {
      index: 1,
      name: "index.html",
      language: "python",
      value: "print('Hello World!')"
    },
  ]);

  const [user, setUser] = useState({
    name: "User",
    profilePicture: "coding-asst/frontend_react/public/logo512.png",
  });

  const updateShell = (newShell) => {
    if(newShell != ''){
      setShell(shell + ">>> " + newShell + "\n");
    }
  };

  const handleRunClick = (e) => {
    console.log("clicked");
    e.preventDefault();
    runPython(input);
  }

  useEffect(() => {
    updateShell(stdout + stderr);
  }, [isRunning]); // useEffect re-runs when isRunning changes

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh" }}>
        <PythonProvider>
          <NavBar 
            user={user} 
            handleRunClick={handleRunClick} 
            isRunning={isRunning}
            isLoading={isLoading}
            input={input}
            setInput={setInput}
          />
          <Grid container style={{ height: "100vh" }}>
            <Grid item xs={2} style={{'backgroundColor': theme.palette.background.default}}>
              <Files />
            </Grid>
            <Grid item xs={5}>
              <CodeEditor 
                updateShell={updateShell}
                input={input}
                setInput={setInput}
                files={files}
              />
            </Grid>
            <Grid item xs={5}>
              <Sidebar shellComp={shell}/>
            </Grid>
          </Grid>
        </PythonProvider>
      </Paper>
    </ThemeProvider>
  )
}

export default App;