import React, {useState} from "react";
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Container,
} from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBar, Drawer } from '../components/styles';
import HomepageSideBar from './HomepageSideBar';
import Quotes from "./Quotes";
import HomeNav from "../components/HomeNav";
import { BorderColor } from "@mui/icons-material";

const Homepage = () => {

    return (
        <>
                <CssBaseline />
                <Box style={{position:"sticky",top:0,zIndex:2,backgroundColor:"#7F00FF", color:'#fff'}}>
                    <Container>
                    <Toolbar sx={{ pr: '24px' }}>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            SchoolCool
                        </Typography>
                        <Link to="/Adminregister" style={{color:"#fff", border:'1px solid #fff', padding:"10px", borderRadius:"4px"}}>
                            Create account
                        </Link>
                        <HomeNav />
                    </Toolbar>
                    </Container>
                </Box>
                <Container>
                    {/* <Box sx={styles.boxStyled} style={{position:'relative', display:'flex',flexFLow:'column', justifyItems:'start-end'}}> */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Block>
                                    An all-in-one school management web application that aims to streamline administrative processes, improve communication,
                                    and enhance the overall educational experience for students, teachers, and parents. sit back and enjoy the user-friendly
                                    and secure platform.
                                </Block>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Quotes />
                            </Grid>
                        </Grid>
                    {/* </Box> */}
                </Container>
                </>
    );
}

export default Homepage;

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}
const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const Block = styled("div")`
display: flex;
justify-content: center;
align-items: center;
flex-flow: column;
background-color: #fff;
margin-top: 20px;
letter-spacing: normal;
line-height: normal;
padding: 15px;
`;
