import React, {useEffect, useState} from "react";
import {
    CssBaseline,
    Box,
    Paper,
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
import TableViewTemplate from "../components/TableViewTemplate";
import Footer from "../components/Footer";

const Homepage = () => {

    const dispatch = useDispatch();
    const { list, loading, error, response } = useSelector((state) => state.homepage);

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
                <h4 style={{ fontSize: '30px', marginBottom: '40px' }}>Notices</h4>
                {loading ? (
                    <div style={{ fontSize: '20px' }}>Please Wait...</div>
                ) : response ? (
                    <div style={{ fontSize: '20px' }}>No Notices to Show Right Now</div>
                ) :  (
                    <>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(list?.notices) && list?.notices.length > 0 &&
                                <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                            }
                            {Array.isArray(list?.notices) && list?.notices.length === 0 &&
                                <div>No Notices to Show Right Now</div>
                            }
                        </Paper>
                    </>
                )}
            </div>
    
        )
    }

    const renderList = () => {
        if(loading){
            return(
                <Typography style={{marginTop:'2rem'}}>
                    Please Wait...
                </Typography>
            )
        }else if(error){
            return(
           <Typography style={{marginTop:'2rem'}}>
                Data not available
            </Typography>
            )
        }else{
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
                <div style={{minHeight:'100vh',display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'space-between'}}>
                <div>
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
                               
                                <Carousel autoPlay infiniteLoop>
                                        <CardMedia
                                            component="img"
                                            height="400px"
                                            image={classroom}
                                            alt="Classroom"
                                        />
                                
                                        <CardMedia
                                            component="img"
                                            height="400px"
                                            image={laboratory}
                                            alt="Science Laboratory"
                                        />
                                   
                                        <CardMedia
                                            component="img"
                                            height="400px"
                                            image={computerLab}
                                            alt="Computer Laboratory"
                                        />
                                    
                                        <CardMedia
                                            component="img"
                                            height="400px"
                                            image={hall}
                                            alt="Hall"
                                        />
                                </Carousel>
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
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
                            </Grid>
                        </Grid>
                </Container>
                <Container maxWidth='xxl'>
                        {noticeTable()}
                </Container>
                </div>
                <Footer />
                </div>
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
