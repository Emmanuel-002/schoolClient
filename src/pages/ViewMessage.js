import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Tab, Container, Grid } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Popup from '../components/Popup';

const ViewMessage = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const { userDetails, currentUser, loading, error } = useSelector((state) => state.user);
    console.log(useSelector((state) => state.user))
    const messageID = params.id
    const address = "Message";

    useEffect(() => {
        dispatch(getUserDetails(messageID, address));
        console.log(messageID)
    }, [dispatch, messageID]);

    // const [author, setAuthor] = useState('');
    // const [email, setEmail] = useState('');
    // const [title, setTitle] = useState('');
    // const [complaint, setComplaint] = useState('');
    // const [date, setDate] = useState('');
    // const [response, setResponse] = useState('');

    const [openStates, setOpenStates] = useState({});

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)


    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const [selectedSection, setSelectedSection] = useState('table');
    // const handleSectionChange = (event, newSection) => {
    //     setSelectedSection(newSection);
    // };

    // useEffect(() => {
    //     if (userDetails) {
    //         setAuthor(userDetails.author || '');
    //         setEmail(userDetails.email || '');
    //         setTitle(userDetails.title || '');
    //         setComplaint(userDetails.complaint || '');
    //         setDate(userDetails.date || '');
    //     }
    // }, [userDetails]);

    const replyHandler = () => {
        navigate("/Message/reply/" + messageID);
    }

    const MessageDetailsSection = () => {
        return (
            <Grid container spacing={2}> 
                <Grid xs={12} md={6} lg={4} padding={1}>
               <strong>Author: {userDetails?.authorName}</strong> 
                <br />
                From: {userDetails?.messageBody?.text?.authorEmail}
                <br />
                Title: {userDetails?.messageBody?.text?.title}
                </Grid>
                <Grid xs={12} md={6} lg={4} fontStyle={'italic'} padding={1}>
                <strong>Message: {`${userDetails?.messageBody?.text?.body}`}</strong>
                <br />
                Date: {new Date(userDetails?.messageBody?.text?.date).toLocaleDateString()}
                <br />
                Time: {new Date(userDetails?.messageBody?.text?.date).toLocaleTimeString()}
                <br />
                </Grid>
                <Grid xs={12} md={6} lg={4} fontStyle={'italic'} padding={1}>
                    {`${userDetails.responseBody?.text?.body!==""?
                        (<>
                            <strong>Response: {(userDetails?.responseBody?.text?.body)}</strong>
                            <strong>Date: {(userDetails?.responseBody?.text?.date)?.toLocaleDateString()}</strong>
                            <strong>Time: {(userDetails?.responseBody?.text?.date)?.toLocaleDateString()}</strong>
                        </>
                        )
                        : 'No response yet' }`}
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            {loading
                ?
                <>
                    <div>Please Wait...</div>
                </>
                :
                <>
                    <Box sx={{ width: '100%', typography: 'body1', }} >
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                    <Tab label="Details" value="1" />
                                    {/* {userDetails.response === 'No response' ? <Tab label="Reply" value="2" onClick={replyHandler} /> : ''} */}
                                    <Tab label="Reply" value="3" onClick={replyHandler} />
                                </TabList>
                            </Box>
                            <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                                <TabPanel value="1">
                                    <MessageDetailsSection />
                                </TabPanel>
                                {/* <TabPanel value="2">

                                </TabPanel> */}
                                <TabPanel value="3">
                                    {/* <StudentMarksSection /> */}
                                </TabPanel>
                            </Container>
                        </TabContext>
                    </Box>
                </>
            }
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

        </>
    )
}

export default ViewMessage;

const styles = {
    attendanceButton: {
        marginLeft: "20px",
        backgroundColor: "#270843",
        "&:hover": {
            backgroundColor: "#3f1068",
        }
    },
    styledButton: {
        margin: "20px",
        backgroundColor: "#02250b",
        "&:hover": {
            backgroundColor: "#106312",
        }
    }
}