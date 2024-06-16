import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Popup from '../components/Popup';
import { BlueButton } from '../components/buttonStyles';
import { replyMessage } from '../redux/messageRelated/messageHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ReplyMessage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams()
    const { status, currentUser, error } = useSelector(state => state.user);
    const authorID = currentUser._id;
    const authorEmail = currentUser._email;
    const messageID = params.id
    
    const address = "Message/reply";
    const [text, setText] = useState('');

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {authorID, authorEmail, text };


    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(replyMessage(fields, address, messageID))
        navigate(`/Message/${messageID}`)
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Your message has been sent")
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        }
    }, [status, error])

    return (
        <>
            <Box
                sx={{
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <div>
                        <Stack spacing={1} sx={{ mb: 3 }}>
                            <Typography variant="h4">Reply Message</Typography>
                        </Stack>
                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Write your message"
                                    variant="outlined"
                                    value={text}
                                    onChange={(event) => {
                                        setText( event.target.value);
                                    }}
                                    required
                                    multiline
                                    maxRows={4}
                                />
                            </Stack>
                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                            </BlueButton>
                        </form>
                    </div>
                </Box>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ReplyMessage;