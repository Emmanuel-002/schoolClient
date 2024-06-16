import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getAllUsers } from "../../redux/homepageRelated/homepageHandle";
import TableViewTemplate from '../../components/TableViewTemplate';
import Footer from '../../components/Footer';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { list, load, err, res } = useSelector((state) => state.homepage);
    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);


    const noticeTable = () => {
        const noticeColumns = [
            { id: 'title', label: 'Title', minWidth: 120 },
            { id: 'details', label: 'Details', minWidth: 250 },
            { id: 'date', label: 'Date', minWidth: 120 },
        ];
    
        const noticeRows = list?.notices?.map((notice) => {
            const date = new Date(notice.date);
            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
            return {
                title: notice.title,
                details: notice.details,
                date: dateString,
                id: notice._id,
            };
        });
        return (
            <div style={{ marginTop: '50px', marginRight: '20px' }}>
                {load ? (
                    <div style={{ fontSize: '20px' }}>Please Wait...</div>
                ) : res ? (
                    <div style={{ fontSize: '20px' }}>No Notices to Show Right Now</div>
                ) : (
                    <>
                        <h3 style={{ fontSize: '30px', marginBottom: '40px' }}>School News & Updates</h3>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(list?.notices) && list?.notices.length > 0 &&
                                <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                            }
                        </Paper>
                    </>
                )}
            </div>
    
        )
    }

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];
    return (
        <div style={{minHeight:'100vh',display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'space-between'}}>
            <div>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Subject} alt="Subjects" />
                            <Title>
                                Total Subjects
                            </Title>
                            <Data start={0} end={numberOfSubjects} duration={2.5} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <StyledPaper>
                            <img src={Assignment} alt="Assignments" />
                            <Title>
                                Total Assignments
                            </Title>
                            <Data start={0} end={15} duration={4} />
                        </StyledPaper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <ChartContainer>
                            {
                                response ?
                                    <Typography variant="h6">No Attendance Found</Typography>
                                    :
                                    <>
                                        {loading
                                            ? (
                                                <Typography variant="h6">Please Wait...</Typography>
                                            )
                                            :
                                            <>
                                                {
                                                    subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                        <>
                                                            <CustomPieChart data={chartData} />
                                                        </>
                                                    )
                                                        :
                                                        <Typography variant="h6">No Attendance Found</Typography>
                                                }
                                            </>
                                        }
                                    </>
                            }
                        </ChartContainer>
                    </Grid>
                    <Grid item xs={12}>
                    <Container maxWidth='xxl'>
                            {noticeTable()}
                        </Container>
                    </Grid>
                </Grid>
            </Container>
            </div>
            <Footer />
        </div>
    )
}

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;



export default StudentHomePage