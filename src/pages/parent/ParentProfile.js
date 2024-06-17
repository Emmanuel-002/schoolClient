import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const ParentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school

  return (
    <>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                  {String(currentUser.fullname).charAt(0)}
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="h5" component="h2" textAlign="center">
                  {currentUser.fullname}
                </Typography>
              </Box>
            </Grid>
            {/* <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  Email Address: {currentUser.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="subtitle1" component="p" textAlign="center">
                  Phone Number: {currentUser.phoneNo}
                </Typography>
              </Box>
            </Grid> */}
          </Grid>
        </StyledPaper>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" component="p">
                  <strong>Email Address:</strong> {currentUser.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                  <strong>Phone Number:</strong> {currentUser.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                  <strong>Occupation:</strong> {currentUser.occupation}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                  <strong>Contact Address:</strong> {currentUser.address}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default ParentProfile

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;