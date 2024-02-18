import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Send } from '@mui/icons-material';

//chat with assistant tab
const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'User', text: 'Hello there!' },
    { id: 2, user: 'Assistant', text: 'Hi! How are you doing?' },
    { id: 3, user: 'User', text: 'Great! Thanks for asking.' },
  ]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    // construct a new message from the state value
    const newMessage = {
      id: messages.length + 1, // or any other UID, work with database here
      user: 'User',
      text: message,
    };

    // update the messages with the new message
    setMessages([ ...messages, newMessage ]);

    // reset the field for the next message
    setMessage('');
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <List>
        {messages.map((msg) => (
          <ListItem key={msg.id} alignItems='center' sx={{backgroundColor: msg.user === 'Assistant' ? '#e0e0e0' : 'transparent',}}>
            <Grid
              container
              direction={msg.user === 'User' ? 'row' : 'row-reverse'}
              justifyContent={msg.user === 'User' ? 'flex-end' : 'flex-start'}
              rowSpacing={1}
              columnSpacing={1}
              alignItems='center'
            >
              <Grid item style={{ flexGrow: 1 }}>
                <Box sx={{ p: 1, borderRadius: 1 }}>
                  <ListItemText primary={msg.text} style={{ textAlign: msg.user === 'User' ? 'right' : 'left' }} />
                </Box>
              </Grid>
              <Grid item>
                <ListItemAvatar>
                  <Avatar>{msg.user[0]}</Avatar>
                </ListItemAvatar>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Box>
        <TextField
          fullWidth
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          variant='outlined'
          placeholder='Type your message...'
          multiline
          InputProps={{
            endAdornment: (
              <Send onClick={handleSend} style={{ cursor: 'pointer' }} />
            ),
          }}
        />
      </Box>
    </div>
  );
};

export default Chat;