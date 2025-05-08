import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import logo from '../logo.svg'
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import { signOutUser } from "../firebase/auth";

export default function Header() {
    const [ open, setOpen ] = useState(false);
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const onSignOut = () => {
        signOutUser()
        .then(() => {
            navigate("/")
        })
        .catch((e) => {
            console.log(e)
        })
    }


    if (!false) { return (
        <AppBar position="static">
            <Toolbar> 
                <Box sx={{flexGrow:1, display:{xs:'none',md:'flex'}}}>
                    <Box sx={{flexGrow:1, display:{xs:'none',md:'flex'}}}>
                        <img src={logo} height={'40vh'} />
                    </Box>
                    <Box sx={{display:{xs:'none',md:'flex'}}}>
                        <Button color="inherit" onClick={()=>navigate("/")}>
                            Home
                        </Button>
                        <Button color="inherit" onClick={()=>navigate("/about")}>
                            About
                        </Button>
                        <Button color="inherit" onClick={()=>navigate("/contact")}>
                            Contact
                        </Button>
                        {
                            userLoggedIn ? (
                                <>
                                    <Button color="success" variant="contained"  sx={{mx:'1vh'}} onClick={()=>navigate("/dashboard")}>
                                        Dashboard
                                    </Button>
                                    <Button color="error" variant="contained" sx={{mx:'1vh'}} onClick={()=>onSignOut()}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button color="success" variant="contained" sx={{mx:'1vh'}} onClick={()=>navigate("/login")}>
                                        Login
                                    </Button>
                                    <Button color="secondary" variant="contained" onClick={()=>navigate("/signup")}>
                                        Sign Up
                                    </Button>
                                </>
                            )
                        }
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
                                    <ListItemButton onClick={()=>navigate('/')}>
                                        <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding> 
                                    <ListItemButton onClick={()=>navigate('/about')}>
                                        <ListItemIcon>
                                            <InfoIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="About Us" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding> 
                                    <ListItemButton onClick={()=>navigate('/contact')}>
                                        <ListItemIcon>
                                            <CallIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Contact Us" />
                                    </ListItemButton>
                                </ListItem>
                                {
                                    userLoggedIn ? (
                                        <>
                                            <ListItem>
                                                <Button sx={{flexGrow:1}} variant="contained" color="primary" onClick={()=>navigate("/dashboard")}>
                                                    Dashboard
                                                </Button>
                                            </ListItem>
                                            <ListItem>
                                                <Button sx={{flexGrow:1}} variant="contained" color="error" onClick={()=>onSignOut()}>
                                                    Logout
                                                </Button>
                                            </ListItem>
                                        </>
                                    ) : (
                                        <>
                                            <ListItem>
                                                <Button sx={{flexGrow:1}} variant="contained" color="primary" onClick={()=>navigate("/login")}>
                                                    Login
                                                </Button>
                                            </ListItem>
                                            <ListItem>
                                                <Button sx={{flexGrow:1}} variant="contained" color="secondary" onClick={()=>navigate("/signup")}>
                                                    Sign Up
                                                </Button>
                                            </ListItem>
                                        </>
                                    )
                                }
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