import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Header from "../layout/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../firebase/authContext";
import { createUser } from "../firebase/auth"


export default function Signup(){
    const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ emailErr, setEmailErr ] = useState(false);
    const [ passwordErr, setPasswordErr ] = useState([false, false, false]);
    const [ confirmPasswordErr, setConfirmPasswordErr ] = useState(false);
    const { userLoggedIn, currentUser, loading } = useAuth();

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
        const pwd = e.target.value
        setPassword(pwd);
        setPasswordErr([pwd.length >= 8,  /\d/.test(pwd), /[!@#$%^&*]/.test(pwd)]);
    }

    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordErr(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Submit!", email, password, confirmPassword) //TODO remove

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailErr(true);
            return;
        }
        if (confirmPassword !== password) {
            setConfirmPasswordErr(true);
            return;
        }

        createUser(email, password)
        .then((u) => {
            console.log("Account Created", u) //TODO remove
            navigate("/dashboard")
        })
        .catch((e) => {
            console.log(e)
        })

    }

    if (!false) { return (
        <Box>
            <Header />
            <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'} height='84vh' spacing={5} padding={5}>
                <Box maxWidth={'50vh'}>
                    <Typography variant="h6" textAlign={'center'}>
                        Create an Account
                    </Typography>
                    <form>
                        <TextField variant="outlined" type="email" label="Email" fullWidth margin="normal" onChange={(e)=>onEmailChange(e)} error={emailErr} helperText={emailErr?"Invalid Email":""}/>
                        <TextField variant="outlined" type="password" label="Password" fullWidth margin="normal" onChange={(e)=>onPasswordChange(e)} />
                        <Box>
                            <Typography variant="caption" color="primary">
                                Your password must contain:
                            </Typography>
                            <br/>
                            <Typography variant="caption" color={passwordErr[0]?"success":"error"}>
                                - At least 8 characters
                            </Typography>
                            <br/>
                            <Typography variant="caption" color={passwordErr[1]?"success":"error"}>
                                - At least 1 number
                            </Typography>
                            <br/>
                            <Typography variant="caption" color={passwordErr[2]?"success":"error"}>
                                - At least 1 special character
                            </Typography>
                        </Box>

                        <TextField variant="outlined" type="password" label="Confirm Password" fullWidth margin="normal" onChange={(e)=>onConfirmPasswordChange(e)} disabled={!(passwordErr[0] && passwordErr[1] && passwordErr[2])} error={confirmPasswordErr} helperText={confirmPasswordErr?"Passwords do not match":""} />
                        <Button type="submit" color="primary" variant="contained" fullWidth sx={{marginTop: '1vh'}} onClick={(e)=>onSubmit(e)}>
                            Create Account
                        </Button>
                    </form>
                    <Button color="secondary" variant="outlined" fullWidth sx={{marginTop: '1vh'}} onClick={()=>navigate("/login")}>
                        Log In 
                    </Button>
                </Box>
            </Grid>
        </Box>
    )}
}
