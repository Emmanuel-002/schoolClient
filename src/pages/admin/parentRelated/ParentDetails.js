import React, { useEffect } from 'react';
import { getParentDetails } from '../../../redux/parentRelated/parentHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography } from '@mui/material';

const ParentDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, parentDetails, error } = useSelector((state) => state.parent);

    const parentID = params.id;

    useEffect(() => {
        console.log(parentDetails)
        dispatch(getParentDetails(parentID));
    }, [dispatch, parentID]);

    if (error) {
        console.log(error);
    }

    // const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    // const handleAddSubject = () => {
    //     navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    // };

    return (
        <>
            {loading ? (
                <div>Please Wait...</div>
            ) : (
                <Container>
                    <Typography variant="h4" align="center" gutterBottom>
                        Parent Details
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Full Name - {parentDetails?.fullname}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Occupation - {parentDetails?.occupation}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Email - {parentDetails?.email}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Phone Number - {parentDetails?.phone}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Home Address - {parentDetails?.address}
                    </Typography>
                </Container>
            )}
        </>
    );
};

export default ParentDetails;