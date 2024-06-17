import React, { useEffect, useState, useRef } from 'react'
import ReactToPrint from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography, Button } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const StudentSubjects = () => {

    const dispatch = useDispatch();
    const componentRef = useRef();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [sclassName, setSclassName] = useState('');
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
            setSclassName(userDetails.sclassName || {})
        }
    }, [userDetails])

    // console.log(subjects)

    useEffect(() => {
        // if (subjectMarks == []) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        // }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <>
                <div ref={componentRef}>
                    <h3>Statement of Result</h3>
                    <p>Roll Number: {`${userDetails.rollNum}`}</p>
                    <p>Name: {`${userDetails.firstname} ${userDetails.middlename} ${userDetails.lastname}`}</p>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell>Score</StyledTableCell>
                                <StyledTableCell>Grade</StyledTableCell>
                                <StyledTableCell>Remarks</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {subjectMarks.map((result, index) => {
                                if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                        <StyledTableCell>{result.marksObtained}%</StyledTableCell>
                                        <StyledTableCell>
                                        {
                                        result.marksObtained <=39.99 ? 'F9' : 
                                        result.marksObtained >=40 && result.marksObtained <=44.99 ? 'E8' : 
                                        result.marksObtained >=45 && result.marksObtained <=49.99 ? 'D7' :
                                        result.marksObtained >=50 && result.marksObtained <=54.99 ? 'C6' :
                                        result.marksObtained >=55 && result.marksObtained <=59.99 ? 'C5' :
                                        result.marksObtained >=60 && result.marksObtained <=64.99 ? 'C4' :
                                        result.marksObtained >=65 && result.marksObtained <=69.99 ? 'B3' :
                                        result.marksObtained >=70 && result.marksObtained <=74.99 ? 'B2' :
                                        result.marksObtained >=75 && result.marksObtained <=100 ? 'A1' : 'NA'
                                        }
                                        </StyledTableCell>
                                        <StyledTableCell>
                                        {
                                        result.marksObtained <=39.99 ? 'Fail' : 
                                        result.marksObtained >=40 && result.marksObtained <=44.99 ? 'Pass' : 
                                        result.marksObtained >=45 && result.marksObtained <=49.99 ? 'Pass' :
                                        result.marksObtained >=50 && result.marksObtained <=54.99 ? 'Credit' :
                                        result.marksObtained >=55 && result.marksObtained <=59.99 ? 'Credit' :
                                        result.marksObtained >=60 && result.marksObtained <=64.99 ? 'Credit' :
                                        result.marksObtained >=65 && result.marksObtained <=69.99 ? 'Good' :
                                        result.marksObtained >=70 && result.marksObtained <=74.99 ? 'Very Good' :
                                        result.marksObtained >=75 && result.marksObtained <=100 ? 'Excellent' : 'NA'
                                        }
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    </div>
                    <ReactToPrint
                        trigger={() => <Button variant="contained">Print out</Button>}
                        content={() => componentRef.current}
                        pageStyle="@page { size: 8.3in 11.7in }"
                    />
            </>
        );
    };

    const renderChartSection = () => {
        return <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
    };

    const renderClassDetailsSection = () => {
        return (
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Class Details
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Class - {sclassName.sclassName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Subjects:
                </Typography>
                {subjectsList &&
                    subjectsList.map((subject, index) => (
                        <div key={index}>
                            <Typography variant="subtitle1">
                                {subject.subName} ({subject.subCode})
                            </Typography>
                        </div>
                    ))}
            </Container>
        );
    };

    return (
        <>
            {loading ? (
                <div>Please Wait...</div>
            ) : (
                <div>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                        ?
                        (<>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>)
                        :
                        (<>
                            {renderClassDetailsSection()}
                        </>)
                    }
                </div>
            )}
        </>
    );
};

export default StudentSubjects;