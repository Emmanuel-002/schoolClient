import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom"
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import PersonOutlineIcon from '@mui/icons-material/Person';

const HomepageSideBar = () => {
    const location = useLocation();
    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === "/" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Teacherlogin">
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon color={location.pathname === "/Teacherlogin" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Teacher" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Studentlogin">
                    <ListItemIcon>
                        <PersonOutlineIcon color={location.pathname === "/Studentlogin" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Student" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Parentlogin">
                    <ListItemIcon>
                        <FamilyRestroomIcon color={location.pathname === "/Parentlogin" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Parent" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default HomepageSideBar;