import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Header from "../layout/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import { useEffect, useState } from "react";
import { signInUser } from "../firebase/auth";


export default function Login(){
    const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ emailErr, setEmailErr ] = useState(false);
    const [ passwordErr, setPasswordErr ] = useState(false);
    const { userLoggedIn, loading } = useAuth();

    useEffect(()=>{
        if (userLoggedIn) {
            navigate("/dashboard")
        }
    })

    const onEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailErr(false);
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordErr(false);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Submit!", email, password) //TODO remove debug statement

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailErr(true);
            return;
        }
        if (!password) {
            setPasswordErr(true);
            return;
        }

        signInUser(email, password)
        .then((u) => {
            console.log("Signed in", u) //TODO remove
            navigate("/dashboard")
        })
        .catch((e)=> {
            console.log(e)
        })
    }

    if (!loading) { return (
        <Box>
            <Header />
            <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'} height='84vh' spacing={5} padding={5}>
                <Box maxWidth='50vh'>
                    <Typography variant="h6" textAlign='center'>
                        Login to your Account
                    </Typography>
                    <form>
                        <TextField variant="outlined" type="email" label="Email" fullWidth margin="normal" onChange={(e)=>onEmailChange(e)} error={emailErr} helperText={emailErr ? "Invalid Email" : ""}/>
                        <TextField variant="outlined" type="password" label="Password" fullWidth margin="normal" onChange={(e)=>onPasswordChange(e)} error={passwordErr} helperText={passwordErr ? "Invalid Password" : ""}/>
                        <Button variant="contained" type="submit" fullWidth sx={{marginTop: '1vh'}} onClick={(e)=>onSubmit(e)}>
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