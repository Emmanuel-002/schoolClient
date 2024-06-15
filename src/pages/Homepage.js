import React, {useEffect, useState} from "react";
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Container,
    Card,
    CardContent,
    CardMedia,
    CardHeader,
    CardActionArea,
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
import ambassador from '../assets/ambassador.jpg'
import classroom from '../assets/classroom.jpeg'
import laboratory from '../assets/laboratory.jpg'
import hall from '../assets/hall.jpg'
import computerLab from '../assets/computerLab.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getAllUsers } from "../redux/homepageRelated/homepageHandle";
import Button from "./components/Button";
import { useDispatch, useSelector } from "react-redux";
import { render } from "react-dom";


const Homepage = () => {

    const dispatch = useDispatch();
    const { list, loading, error, response } = useSelector((state) => state.homepage);
    console.log(list);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const renderList = () => {
        if(loading){
            return(
                <Typography style={{marginTop:'2rem'}}>
                    Please Wait
                </Typography>
            )
        }else if(response){
            return(
            <Grid container spacing={1} style={{marginTop:'2rem'}}>
                <Grid item>
                    <Card>
                        <CardContent>
                           Parents
                        </CardContent>
                        <CardHeader
                            title={`${list?.parents?.length}+`}
                            style={{textAlign:'center'}}
                        />
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                    <CardContent>
                           Students
                        </CardContent>
                        <CardHeader
                            title={`${list?.students?.length}+`}
                            style={{textAlign:'center'}}
                        />
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                    <CardContent>
                           Teachers
                        </CardContent>
                        <CardHeader
                            title={`${list?.teachers?.length}+`}
                            style={{textAlign:'center'}}
                        />
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                    <CardContent>
                           Classrooms
                        </CardContent>
                        <CardHeader
                            title={`${list?.classrooms?.length}+`}
                            style={{textAlign:'center'}}
                        />
                    </Card>
                </Grid>
            </Grid>
            )
        }else if(error){
            return(
           <Typography style={{marginTop:'2rem'}}>
                Data not available
            </Typography>
            )
        }
    }
    return (
        <>
                <CssBaseline />
                <Box style={{position:"sticky",top:0,zIndex:2,backgroundColor:"#7F00FF", color:'#fff'}}>
                    <Container maxWidth='xxl'>
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
                        <HomeNav />
                    </Toolbar>
                    </Container>
                </Box>
                <Container maxWidth='xxl' style={{marginTop:'1rem'}}>
                <Grid container>
                            <Grid item xs={12} md={6} lg={6}>
                                <Card style={{height:'20rem', borderRadius:'5px 0px 0px 5px'}}>
                                    <CardHeader
                                        title='Welcome To SchoolCool'
                                    />
                                    <CardContent>
                                        <Typography>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                                            Totam temporibus eligendi libero, repellat doloribus, consequatur ratione at, 
                                            facilis ipsam architecto cupiditate corporis eaque ipsum asperiores veniam ut 
                                            iusto sunt? Ad, blanditiis! Id doloribus mollitia corporis accusantium porro odio 
                                            tempore optio voluptate deleniti velit laborum delectus in facilis fugit fugiat 
                                            dolor alias magnam pariatur, ratione molestias tempora, quam harum. Voluptatibus 
                                            non praesentium laudantium quo culpa animi explicabo doloribus libero dicta fugiat 
                                            quod pariatur, autem aliquid deleniti unde necessitatibus sint numquam qui atque 
                                            itaque! Possimus blanditiis, ab quo, laboriosam harum, repellendus esse quisquam
                                        </Typography>
                                        {/* <CardActionArea>
                                            <button>Enrol</button>
                                        </CardActionArea> */}
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6} >
                                <Card style={{height:'20rem', borderRadius:'0px 5px 5px 0px'}}>
                                    <CardMedia
                                        component="img"
                                        height="100%"
                                        image={ambassador}
                                        alt="Ambassador"
                                    />
                                </Card>
                            </Grid>
                        </Grid>
            </Container>
            <Container maxWidth='xl' style={{marginTop:'1rem'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} lg={6}>
                                {/* <Card style={{borderRadius:'5px 0px 0px 5px'}}> */}
                                <Carousel autoPlay infiniteLoop>
                                    {/* <Card style={{ borderRadius:'0px 5px 5px 0px'}}> */}
                                        <CardMedia
                                            component="img"
                                            height="400px"
                                            image={classroom}
                                            alt="Classroom"
                                        />
                                    {/* </Card> */}
                                    {/* <Card style={{ borderRadius:'0px 5px 5px 0px'}}> */}
                                        <CardMedia
                                            component="img"
                                            height="400px"
                                            image={laboratory}
                                            alt="Science Laboratory"
                                        />
                                    {/* </Card> */}
                                    {/* <Card style={{ borderRadius:'0px 5px 5px 0px'}}> */}
                                        <CardMedia
                                            component="img"
                                            height="400px"
                                            image={computerLab}
                                            alt="Computer Laboratory"
                                        />
                                    {/* </Card> */}
                                    {/* <Card style={{ borderRadius:'0px 5px 5px 0px'}}> */}
                                        <CardMedia
                                            component="img"
                                            height="400px"
                                            image={hall}
                                            alt="Hall"
                                        />
                                    {/* </Card> */}
                                </Carousel>
                                {/* </Card> */}
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                {/* <Card style={{height:'20rem', borderRadius:'0px 5px 5px 0px'}}> */}
                                    <CardHeader
                                        title='About SchoolCool'
                                    />
                                    <CardContent>
                                        <Typography>
                                            An all-in-one school management web application that aims to streamline administrative processes, improve communication,
                                            and enhance the overall educational experience for students, teachers, and parents. sit back and enjoy the user-friendly
                                            and secure platform.
                                        </Typography>
                                        {renderList()}
                                    </CardContent>
                                {/* </Card> */}
                            </Grid>
                        </Grid>
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
