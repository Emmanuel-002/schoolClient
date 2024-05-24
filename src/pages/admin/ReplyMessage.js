import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Stack, TextField, CircularProgress } from '@mui/material';
import { BlueButton } from '../../components/buttonStyles';
import Popup from '../../components/Popup';


const ReplyMessage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { userDetails, currentUser, loading, error } = useSelector((state) => state.user);

    const messageID = params.id;
    const adminID = currentUser._id;
    const address = "Message";

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getUserDetails(messageID, address));
    }, [dispatch, messageID]);

    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [response, setResponse] = useState('');

    const replyHandler = () => {
        dispatch(updateUser({response}, messageID, address))
    }

    useEffect(() => {
        if (userDetails) {
            setAuthor(userDetails.author || '');
            setEmail(userDetails.email || '');
            setTitle(userDetails.title || '');
            setText(userDetails.text || '');
            setDate(userDetails.date || '');
        }
    }, [userDetails]);

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
                    <Typography variant="h6">{`Reply to ${email}`}</Typography>
                </Stack>
                <form onSubmit={replyHandler}>
                    <Stack spacing={3}>
                    <TextField
                            fullWidth
                            label="From"
                            type="text"
                            value={author}
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Message"
                            type="text"
                            value={text}
                            multiline
                            disabled
                            InputLabelProps={{
                                shrink: true,
                            }}
                            maxRows={4}
                        />
                        <TextField
                            fullWidth
                            label="Reply"
                            variant="outlined"
                            value={response.text}
                            onChange={(event) => {
                                setResponse(event.target.value);
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
    )
       
    }

export default ReplyMessage