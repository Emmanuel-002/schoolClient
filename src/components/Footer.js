import { Typography, Grid, Container, FormControl, InputLabel, TextField, Box, FormHelperText } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
// import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import LanguageIcon from '@mui/icons-material/Language';
import * as React from 'react';


const year = new Date().getFullYear();

const Footer = () => {
    return(
        <div style={{backgroundColor:'#000',marginTop:'2rem'}}>
            <Container maxWidth='xxl'>
            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.7769247606543!2d7.516577273753235!3d9.
        084075688127001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0be400000001%3A0x2f3fed6a92a7c602!2s
        Command%20Guest%20House%20Abuja!5e0!3m2!1sen!2sng!4v1717085132874!5m2!1sen!2sng" 
        allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style={{width:'100%', height:'100%', marginTop:'20px'}}></iframe>
        </Grid>
        <Grid item xs={12} md={6} lg={4} style={{textAlign:'center'}}>
            <h2 style={{color:'#fff'}}>Contact Address</h2>
            <div style={{color:'#1565c0'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, fugiat, quod soluta optio 
            esse error quas recusandae, modi magnam adipisci possimus quo. Temporibus, similique doloribus.
            </div>
            <h2 style={{color:'#fff'}}>Social Media</h2>
            <div>
            <a target='_blank' href={`https://wa.me/+2348060515523`} style={{textDecoration:'none',color:'#1565c0',padding:'10px'}}><WhatsAppIcon/></a>
            <a target='_blank' href={`https://facebook.com/araoye.emmanueloluwasegun`} style={{textDecoration:'none',color:'#1565c0',padding:'10px'}}><FacebookIcon /></a>
            {/* <a target='_blank' href={`https://facebook.com/araoye.emmanueloluwasegun`} style={{textDecoration:'none',color:'#1565c0',padding:'10px'}}><XIcon /></a> */}
            <a target='_blank' href={`https://facebook.com/araoye.emmanueloluwasegun`} style={{textDecoration:'none',color:'#1565c0',padding:'10px'}}><InstagramIcon /></a><br/>
            <a target='_blank' href='tel:08060515523:' style={{textDecoration:'none',color:'#1565c0',padding:'10px'}}><PhoneIcon /> +2348060515523</a><br/>
            <a target='_blank' href="mailto:nafowasec_abuja@yahoo.com" style={{textDecoration:'none',color:'#1565c0',padding:'10px'}}> <MailIcon />emmanuelaraoye794@gmail.com</a><br/>
            </div>
            {/* <h2>Quick Links</h2>
            <div>
            <a href={`#services`} style={{textDecoration:'none',color:'#1565c0'}}>Services</a><br />
            <a href={`#news`} style={{textDecoration:'none',color:'#1565c0'}}>News</a><br/>
            <a href={`#about`} style={{textDecoration:'none',color:'#1565c0'}}>About</a>
            </div> */}
        </Grid>
        <Grid item xs={12} md={6} lg={4} style={{textAlign:'center',padding:'20px'}}>
        <form action="https://public.herotofu.com/v1/ab6ca490-1d5e-11ef-90b8-b52fc5a15495" method="post" accept-charset="UTF-8">
            <h2>Contact Us</h2>
                <input name="Name" placeholder='Your name...' className="registerInput" id="name" type="text" required style={{marginBottom:'10px',width:'100%',height:'30px'}} /><br />
                <input name="Email" placeholder='Your email...' className="registerInput" id="email" type="email" required style={{marginBottom:'10px',width:'100%',height:'30px'}}  />
                <textarea name='Message' rows={3} className="registerInput" placeholder='Your Message...' style={{ marginBottom:'10px', width:'100%'}}
                required></textarea><br/>
                <input type="submit" value="SEND" style={{color:'#fff',width:'100%',height:'30px', backgroundColor:'#1565c0', border:'1px solid #1565c0'}} />
        </form>
        </Grid>
      </Grid>
    </Box>
        <Typography style={{color:'#fff', textAlign:'center',marginTop:'50px'}}>
           <p> Copyright &#169; {year} SchoolCool</p>
        </Typography>
        </Container>
    </div>
    )
}

export default Footer;