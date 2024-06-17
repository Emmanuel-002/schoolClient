import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';

const AddParent = (situation) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const userState = useSelector(state => state.user);
  const { status, currentUser, response, error } = userState;

  const [fullname, setFullname] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const adminID = currentUser._id
  const role = "Parent"
  const attendance = []

  const fields = { fullname, occupation, email, phone, address, password, adminID, role, attendance }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/parents")
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
          <span className="registerTitle">Add Parent</span>

          <label>Name</label>
          <input className="registerInput" type="text" placeholder="Enter parent's name..."
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
            autoComplete="name" required />

          <label>Occupation</label>
          <input className="registerInput" type="text" placeholder="Enter parent's occupation..."
            value={occupation}
            onChange={(event) => setOccupation(event.target.value)}
            autoComplete="occupation" required />

          <label>Email</label>
          <input className="registerInput" type="email" placeholder="Enter parent's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email" required />

          <label>Phone</label>
          <input className="registerInput" type="tel" placeholder="Enter parent's phone..."
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete="email" required />

          <label>Address</label>
          <textarea rows={3} value={address} className="registerInput" placeholder="Enter parent's home address..."
          onChange={(event) => setAddress(event.target.value)} required >
          </textarea>

          <label>Password</label>
          <input className="registerInput" type="password" placeholder="Enter parent's password..."
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

export default AddParent