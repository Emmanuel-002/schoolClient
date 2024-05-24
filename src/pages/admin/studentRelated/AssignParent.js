import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import {getAllParents} from '../../../redux/parentRelated/parentHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    CircularProgress, FormControl
} from '@mui/material';
import { PurpleButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';

const AssignParent = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { parentsList } = useSelector((state) => state.parent);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams()

    const [studentID, setStudentID] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
            setStudentID(params.id);
            const stdID = params.id
            dispatch(getUserDetails(stdID, "Student"));
        }, [situation]);

    useEffect(() => {
        if (userDetails && situation === "Student") {
            dispatch(getAllParents(params.id));
        }
    }, [dispatch, userDetails]);

    const fields = { name, email };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, "AssignParent"));
        setName("");
        setEmail("");
    }

    useEffect(() => {
        if (response) {
            setLoader(false)
            setShowPopup(true)
            setMessage(response)
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("error")
        }
        else if (statestatus === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
    }, [response, statestatus, error])

    return (
        <>
            {loading
                ?
                <>
                    <div>Please Wait...</div>
                </>
                :
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
                            <Stack spacing={1} sx={{ mb: 3 }}>
                                <Typography variant="h4">
                                    Student Name: {`${userDetails.firstName} ${userDetails.middleName} ${userDetails.lastName}`}
                                </Typography>
                                {currentUser.teachSubject &&
                                    <Typography variant="h4">
                                        Subject Name: {currentUser.teachSubject?.subName}
                                    </Typography>
                                }
                            </Stack>
                            <form onSubmit={submitHandler}>
                                <Stack spacing={3}>
                                    {
                                        situation === "Student" &&
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select Parent</InputLabel>
                                            <Select
                                                name='name'
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={name}
                                                label="Choose an option"
                                                onChange={event=>setName(event.target.value)} required
                                            >
                                                {   parentsList.map((parent, index) => (
                                                        <MenuItem key={index} value={parent.name}>
                                                            {parent.name}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    }
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Select Email</InputLabel>
                                        <Select
        
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={email}
                                            label="Choose an option"
                                            onChange={(event)=>setEmail(event.target.value)}
                                            required
                                        >
                                                {   parentsList.map((parent, index) => (
                                                            <MenuItem key={index} value={parent.email}>
                                                                {parent.email}
                                                            </MenuItem>
                                                        ))
                                                    }
                                        </Select>
                                    </FormControl>
                                </Stack>

                                <PurpleButton
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 3 }}
                                    variant="contained"
                                    type="submit"
                                    disabled={loader}
                                >
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                                </PurpleButton>
                            </form>
                        </Box>
                    </Box>
                    <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
                </>
            }
        </>
    )
}

export default AssignParent