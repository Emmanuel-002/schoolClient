import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Checkbox
} from '@mui/material';
import { getAllMessages } from '../redux/messageRelated/messageHandle';
import TableTemplate from '../components/TableTemplate';
import { useNavigate } from 'react-router-dom';
import { BlueButton } from '../components/buttonStyles';

const SeeMessages = () => {

  const navigate = useNavigate()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };  
  const dispatch = useDispatch();
  const { messageList, loading, error, response } = useSelector((state) => state.message);
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllMessages(currentUser._id, "Message"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const messageColumns = [
    { id: 'author', label: 'Author', minWidth: 170 },
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];
  const messageRows = messageList && messageList.length > 0 && messageList.map((message) => {
    const date = new Date(message.messageBody.text.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      author: message.authorName,
      title: message.messageBody.text.title,
      date: dateString,
      response: message.responseBody.text.body,
      id: message._id
    };
  });

  const MessageButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton variant="contained"
          onClick={() => {
            navigate("/Parent/message/" + row.id)}
          }>
          Read
      </BlueButton>
      <Checkbox {...label} checked={row.response===undefined ? false : true} />
      </>
    );
  };

  return (
    <>
      {loading ?
        <div>Please Wait...</div>
        :
        <>
          {response ?
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              Your inbox is empty.
            </Box>
            :
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              {Array.isArray(messageList) && messageList.length > 0 &&
                <TableTemplate buttonHaver={MessageButtonHaver} columns={messageColumns} rows={messageRows} />
              }
            </Paper>
          }
        </>
      }
    </>
  );
};

export default SeeMessages;