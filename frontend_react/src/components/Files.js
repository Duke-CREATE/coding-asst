import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Stack from '@mui/material/Stack';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.default,
  },
  fileButton: {
    backgroundColor: theme.palette.light.file,
    color: 'black',
  },
  listItemText: {
    fontFamily: "\"Courier New\", Courier, monospace" // add this line
  },
}));

export default function Files() {
  const classes = useStyles();

  return (
    <Stack className={classes.root}>
      <ListItem button className={classes.fileButton}>
        <ListItemText primary="app.py" primaryTypographyProps={{style: { fontFamily: "\"Courier New\", monospace" }}}  />
      </ListItem>
      <Divider />
      <ListItem button className={classes.fileButton}>
        <ListItemText primary="solutions.py" primaryTypographyProps={{style: { fontFamily: "\"Courier New\", monospace" }}}  />
      </ListItem>
      <Divider />
      <ListItem button className={classes.fileButton}>
        <ListItemText primary="testing.py" primaryTypographyProps={{style: { fontFamily: "\"Courier New\", monospace" }}}  />
      </ListItem>
      <Divider />
    </Stack>
  );
}