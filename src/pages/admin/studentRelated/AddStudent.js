import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress, Grid } from '@mui/material';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('')
    const [className, setClassName] = useState('')
    const [sclassName, setSclassName] = useState('')
    const [enrolmentStatus, setEnrolmentStatus] = useState('')

    const adminID = currentUser._id
    const role = "Student"
    const attendance = []

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeGenderHandler = (event) => {
        if (event.target.value === 'Select Gender') {
            setGender('');
        } else {
            setGender(event.target.value);
        }
    }

    const changeClassHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    }

    const changeStatusHandler = (event) => {
        if (event.target.value === 'Select Status') {
            setEnrolmentStatus('');
        } else {
            setEnrolmentStatus(event.target.value);
        }
    }

    const fields = { firstname, middlename, lastname, dob, gender, phoneNo, email, sclassName, enrolmentStatus, rollNum, password, address, adminID, role, attendance }

    const submitHandler = (event) => {
        event.preventDefault();
        if (gender === "") {
            setMessage("Please select a gender");
            setShowPopup(true);
        }
        else if (sclassName === "") {
            setMessage("Please select a classname");
            setShowPopup(true);
        }
        else if (enrolmentStatus === "") {
            setMessage("Please select an enrolment status");
            setShowPopup(true);
        }
        else {
            setLoader(true);
            dispatch(registerUser(fields, role));
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <form onSubmit={submitHandler}>
                <Grid container rowSpacing={1} spacing={1}>
                    <Grid xs={12} md={12} lg={12} className='registerTitle'>New Student</Grid>
                    <Grid xs={12} md={6} lg={3} margin={2}>
                        <label>First Name</label>
                        <input type="text" className="registerInput" placeholder="Enter first name..."
                        value={firstname}
                        onChange={(event) => setFirstname(event.target.value)}
                        autoComplete="name" required />
                    </Grid>
                    <Grid xs={12} md={6} lg={3} margin={2}>
                        <label>Middle Name</label>
                        <input className="registerInput" type="text" placeholder="Enter middle name..."
                        value={middlename}
                        onChange={(event) => setMiddlename(event.target.value)}/>
                    </Grid>
                    <Grid xs={12} md={6} lg={3} margin={2}>
                        <label>Last Name</label>
                        <input className="registerInput" type="text" placeholder="Enter last name..."
                        value={lastname}
                        onChange={(event) => setLastname(event.target.value)}
                        required />
                    </Grid>
                    <Grid xs={12} md={6} lg={3} margin={2}>
                    <label>Date of Birth</label>
                        <input className="registerInput" type="date" placeholder="Enter age..."
                        value={dob}
                        onChange={(event) => setDob(event.target.value)}
                        required/>
                    </Grid>        
                    <Grid xs={12} md={6} lg={3} margin={2}>
                        <label>Gender</label>
                        <select
                            className="registerInput"
                            value={gender}
                            onChange={changeGenderHandler} required>
                            <option value="">Select Gender</option>
                            <option key='male' value="Male">Male</option>
                            <option key='female' value="Female">Female</option>
                        </select>
                    </Grid>
                    <Grid xs={12} md={6} lg={3} margin={2}>
                        <label>Phone</label>
                        <input className="registerInput" type="tel" placeholder="Enter Phone number..."
                        value={phoneNo}
                        onChange={(event) => setPhoneNo(event.target.value)}
                        required/>
                    </Grid>
                    <Grid xs={12} md={6} lg={3} margin={2}>
                        <label>Email</label>
                        <input className="registerInput" type="email" placeholder="Enter Email..."
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required/>
                    </Grid>
                    <Grid xs={12} md={6} lg={3} margin={2}>
                    {
                        situation === "Student" &&
                        <>
                            <label>Class</label>
                            <select
                                className="registerInput"
                                value={className}
                                onChange={changeClassHandler} required>
                                <option value="">Select Class</option>
                                {sclassesList.map((classItem, index) => (
                                    <option key={index} value={classItem.sclassName}>
                                        {classItem.sclassName}
                                    </option>
                                ))}
                            </select>
                        </>
                    }
                    </Grid>
                    <Grid xs={12} md={6} lg={3} margin={2}>
                        <label>Enrolment Status</label>
                        <select
                            className="registerInput"
                            value={enrolmentStatus}
                            onChange={changeStatusHandler} required>
                            <option value="">Select Status</option>
                            <option key='day' value='Day'>Day</option>
                            <option key='boarding' value='Boarding'>Boarding</option>
                        </select>
                    </Grid>
                    <Grid xs={12} md={6} lg={3} margin={2}>
                        <label>Roll Number</label>
                        <input className="registerInput" type="text" placeholder="Enter Roll Number..."
                        value={rollNum}
                        onChange={(event) => setRollNum(event.target.value)}
                        required/>
                    </Grid>
                    <Grid xs={12} md={6} lg={3} margin={2}>
                        <label>Password</label>
                        <input className="registerInput" type="password" placeholder="Enter Password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required/>
                    </Grid>
                    <Grid xs={12} md={6} lg={3} margin={2}>
                        <label>Address</label>
                        <textarea rows={3} className="registerInput"  
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        required></textarea>
                    </Grid>
                    <Grid xs={12} md={12} lg={12} margin={2} textAlign={"center"}>
                        <button className="registerButton" type="submit" disabled={loader}>Enrol</button>
                    </Grid>       
                </Grid>
            </form>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddStudent