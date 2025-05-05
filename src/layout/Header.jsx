import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import logo from '../logo.svg'
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [ open, setOpen ] = useState(false);
    const navigate = useNavigate();


    if (!false) { return (
        <AppBar position="static">
            <Toolbar> 
                <Box sx={{flexGrow:1, display:{xs:'none',md:'flex'}}}>
                    <Box sx={{flexGrow:1, display:{xs:'none',md:'flex'}}}>
                        <img src={logo} height={'40vh'} />
                    </Box>
                    <Box sx={{display:{xs:'none',md:'flex'}}}>
                        <Button color="inherit">
                            Home
                        </Button>
                        <Button color="inherit">
                            About
                        </Button>
                        <Button color="inherit">
                            Contact
                        </Button>
                        <Button color="success" variant="contained" sx={{mx:'1vh'}} onClick={()=>navigate("/login")}>
                            Login
                        </Button>
                        <Button color="secondary" variant="contained">
                            Sign Up
                        </Button>
                    </Box>
                </Box>
                <Box sx={{flexGrow:1, display:{xs:'flex',md:"none"}}}>
                    <IconButton size='large' edge='start' color='inherit' onClick={()=>setOpen(true)} sx={{display:{xs:'flex',md:'none'}}}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer open={open} onClose={()=>setOpen(false)} sx={{display:{xs:'flex',md:'none'}}}>
                        <Box sx={{width:'30vh'}}>
                            <Typography variant="h5" color="primary" textAlign={'center'} marginTop={'1vh'}>
                                Menu
                            </Typography>
                            <List>
                                <ListItem disablePadding> 
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding> 
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <InfoIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="About Us" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding> 
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <CallIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Contact Us" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <Button sx={{flexGrow:1}} variant="contained" color="primary" onClick={()=>navigate("/login")}>
                                        Login
                                    </Button>
                                </ListItem>
                                <ListItem>
                                    <Button sx={{flexGrow:1}} variant="contained" color="secondary">
                                        Sign Up
                                    </Button>
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                    <Box sx={{flexGrow:1, alignContent:'center'}}>
                        <img src={logo} height={'45vh'} sx={{display:'block',margin:'0 auto'}}/>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )}
}