import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Header from "../layout/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";


export default function Login(){
    const navigate = useNavigate();
    const { userLoggedIn, loading, currentUser } = useAuth();

    console.log(userLoggedIn, loading, currentUser) // TODO remove debug statement

    if (!false) { return (
        <Box>
            <Header />
            <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'} height='84vh' spacing={5} padding={5}>
                <Box maxWidth='50vh'>
                    <Typography variant="h6" textAlign='center'>
                        Login to your Account
                    </Typography>
                    <form>
                        <TextField variant="outlined" type="email" label="Email" fullWidth margin="normal"/>
                        <TextField variant="outlined" type="password" label="Password" fullWidth margin="normal"/>
                        <Button variant="contained" type="submit" fullWidth sx={{marginTop: '1vh'}}>
                            Login
                        </Button>
                    </form>
                    <Button variant="outlined" color="secondary" fullWidth sx={{marginTop: '1vh'}} onClick={()=>navigate('/signup')}>
                        Create Account
                    </Button>
                </Box>

            </Grid>
        </Box>
    )}
}