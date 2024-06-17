import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getParentStudents } from '../../redux/studentRelated/studentHandle';
import { getAllUsers } from "../../redux/homepageRelated/homepageHandle";
import ShowParentStudents from './ShowParentStudents';
import TableViewTemplate from '../../components/TableViewTemplate';
import Footer from '../../components/Footer';

const ParentHomePage = () => {
    const dispatch = useDispatch();

    const { list, load, err, res } = useSelector((state) => state.homepage);
    const { currentUser } = useSelector(state => state.user);
    const { studentsList, loading, error, response } = useSelector((state) => state.student);

    useEffect(() => {
        dispatch(getParentStudents(currentUser.email));
    }, [currentUser.email, dispatch]);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const numberOfStudents = studentsList.length

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

    return (
        <div style={{minHeight:'100vh',display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'space-between'}}>
            <div>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <ShowParentStudents props={studentsList} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            </div>
            <Footer />
        </div>
    )
}

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

export default ParentHomePage