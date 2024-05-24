import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subjectID = params.id

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = subjectDetails && subjectDetails.school
  const teachSubject = subjectDetails && subjectDetails._id
  const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id

  const fields = { fullName, gender, employmentStatus, email, password, role, school, teachSubject, teachSclass }

  const changeStatusHandler = (event) => {
    if (event.target.value === 'Select Status') {
        setEmploymentStatus('');
    } else {
        setEmploymentStatus(event.target.value);
    }
}
const changeGenderHandler = (event) => {
  if (event.target.value === 'Select Gender') {
      setGender('');
  } else {
      setGender(event.target.value);
  }
}

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
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
    <div>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">New Teacher</span>
          <label>
            Subject : {subjectDetails && subjectDetails.subName}
          </label>
          <label>
            Class : {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
          </label>
          <label>Full Name</label>
          <input className="registerInput" type="text" placeholder="Enter teacher's full name..."
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            autoComplete="name" required />

          <label>Gender</label>
          <select
              className="registerInput"
              value={gender}
              onChange={changeGenderHandler} required>
              <option value='Select Gender'>Select Gender</option>
              <option key='male' value='Male'>Male</option>
              <option key='female' value='Female'>Female</option>
          </select>

          <label>Employment Status</label>
            <select
                className="registerInput"
                value={employmentStatus}
                onChange={changeStatusHandler} required>
                <option value='Select Status'>Select Status</option>
                <option key={'full time'} value='Full Time'>
                    Full Time
                </option>
                <option key={'part time'} value='Part Time'>
                    Part Time
                </option>
                <option key={'pta'} value='PTA'>
                    PTA
                </option>
            </select>

          <label>Email</label>
          <input className="registerInput" type="email" placeholder="Enter teacher's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email" required />

          <label>Password</label>
          <input className="registerInput" type="password" placeholder="Enter teacher's password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password" required />
          <br />
          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Add'
            )}
          </button>
        </form>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  )
}

export default AddTeacher