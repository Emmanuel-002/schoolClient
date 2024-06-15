import React, {useState} from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, Tooltip } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom"
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import PersonOutlineIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const HomeNav = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Login to your account">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            <Avatar />
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: styles.styledPaper,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <ListItemButton component={Link} to="/Adminlogin">
                    <ListItemIcon>
                        <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admin" />
                </ListItemButton>
                <Divider />
                <ListItemButton component={Link} to="/Teacherlogin">
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Teacher" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Studentlogin">
                    <ListItemIcon>
                        <PersonOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Student" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Parentlogin">
                    <ListItemIcon>
                        <FamilyRestroomIcon />
                    </ListItemIcon>
                    <ListItemText primary="Parent" />
                </ListItemButton>
            </Menu>
        </>
    );
}

export default HomeNav

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    }
}