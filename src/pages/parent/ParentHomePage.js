import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getParentStudents } from '../../redux/studentRelated/studentHandle';
import ShowParentStudents from './ShowParentStudents';
import Footer from '../../components/Footer';

const ParentHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector(state => state.user);
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    // console.log(studentsList, loading, error, response, currentUser);

    useEffect(() => {
        dispatch(getParentStudents(currentUser.email));
    }, [currentUser.email, dispatch]);

    const numberOfStudents = studentsList.length

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <ShowParentStudents props={studentsList} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            {/* <SeeNotice /> */}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
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