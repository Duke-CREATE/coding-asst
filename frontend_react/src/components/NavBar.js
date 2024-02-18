import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//in Material UI, styles are defined through makeStyles hook
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.light.nav,
    color: theme.palette.light.logo,
  },
  title: {
    flexGrow: 1,
  },
  saveButton: {
    backgroundColor: 'grey',
    color: 'white',
    marginRight: theme.spacing(1),
  },
  runButton: {
    backgroundColor: 'green',
    color: 'white',
    marginRight: theme.spacing(2),
  },
  profileText: {
    marginRight: theme.spacing(1),
  },
}));

//Navigation bar at top
export default function NavBar( props ) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={5}>
            <Typography variant="h6" className={classes.title}>
              CREATE
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <Button variant="contained" className={classes.saveButton}>
              💾 Save
            </Button>
          </Grid>

          <Grid item xs={4}>
            <Button variant="contained" className={classes.runButton} 
              onClick={props.handleRunClick}
              disabled={props.isLoading || props.isRunning}
            >
              {!props.isRunning ? '▶ Run' : 'Running...'}
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Typography variant="body1" className={classes.profileText}>
              Hi, {props.user.name}
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <Avatar src={props.user.profilePicture} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}