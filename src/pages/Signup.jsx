import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import Header from "../layout/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../firebase/authContext";
import { createUser, createUserRecord } from "../firebase/auth"
import { usePlacesWidget } from "react-google-autocomplete";


export default function Signup(){
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const [ appState, setAppState ] = useState(false);
    const [ userDetails, setUserDetails ] = useState([{}]);

    useEffect(()=>{
        if (userLoggedIn) {
            navigate("/dashboard")
        }
    })

    if (!false) { return (
        <Box>
            <Header />
            <Grid container direction={'column'} alignItems={'center'} height={'84vh'} justifyContent={'center'} spacing={5} padding={5}>
                <Box maxWidth={'50vh'}>
                    <Typography variant="h6" textAlign={'center'}>
                        Create an Account
                    </Typography>
                    {
                        !appState ? ( <AccountDetails setAppState={setAppState} setUserDetails={setUserDetails}/> )
                        : ( <UserDetails userDetails={userDetails} /> )
                    }
                </Box>
            </Grid>
        </Box>
    )}
}

export function AccountDetails({setAppState, setUserDetails}) {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ emailErr, setEmailErr ] = useState(false);
    const [ passwordErr, setPasswordErr ] = useState([false, false, false]);
    const [ confirmPasswordErr, setConfirmPasswordErr ] = useState(false);

    const onNext = (e) => {
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
        setUserDetails([{
            'email': email,
            'password': password
        }])
        setAppState(true);
    }
    
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

    return (
        <Box>
            <form onSubmit={(e)=>onNext(e)}>
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
                <Button type="submit" color="primary" variant="contained" fullWidth sx={{marginTop: '1vh'}}>
                    Next
                </Button>
            </form>
            <Button color="secondary" variant="outlined" fullWidth sx={{marginTop: '1vh'}} onClick={()=>navigate("/login")}>
                Log In 
            </Button>
        </Box>
    )
}

export function UserDetails({userDetails}) {
    const navigate = useNavigate();

    const { ref: materialRef } = usePlacesWidget({
        apiKey: 'AIzaSyCilWQw8rYxjVxv-jggzpaxBPbPP1brJD0',
        onPlaceSelected: (place) => {
            if (place.formatted_address){
                onAddressChange(place.formatted_address)
            }
        },
        options: {
          componentRestrictions: { country: 'au' },
          types: [],
        },
      });

    const [ name, setName ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ nameErr, setNameErr ] = useState(false);
    const [ phoneNumberErr, setPhoneNumberErr ] = useState(false);
    const [ addressErr, setAddressErr ] = useState(false);
    const [ finalErr, setFinalErr ] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            setNameErr(true);
            return;
        }
        if (!phoneNumber) {
            setPhoneNumberErr(true);
            return;
        }
        if (!address) {
            setAddressErr(true);
            return;
        }

        console.log("Submit!", name, phoneNumber, address, userDetails[0].email, userDetails[0].password) //TODO remove debug statement

        createUser(userDetails[0].email, userDetails[0].password)
        .then((u) => {
            console.log("Account Created", u) //TODO remove
            createUserRecord(u.user, {
                'email': userDetails[0].email,
                'name': name,
                'phone': phoneNumber,
                'address': address
            });
        })
        .then(() => {
            navigate("/dashboard");
        })
        .catch((e) => {
            if (e.code === "auth/email-already-in-use") {
                setFinalErr("Email already in use!")
            } else {
                setFinalErr("An error occurred. Please try again.")
            }
        })

    }

    const onNameChange = (e) => {
        setName(e.target.value);
        setNameErr(false);
    }
    const onPhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        setPhoneNumberErr(false);
    }
    const onAddressChange = (e) => {
        setAddress(e);
        setAddressErr(false);
    }

    return (
        <Box>
            <form onSubmit={(e)=>onSubmit(e)}>
                <TextField variant='outlined' type="text" label='Full Name' fullWidth margin="normal" onChange={(e)=>onNameChange(e)} error={nameErr} helperText={nameErr?"Name Required":""} />
                
                <TextField variant="outlined" type="tel" label="Phone Number" fullWidth margin="normal" onChange={(e)=>onPhoneNumberChange(e)} error={phoneNumberErr} helperText={phoneNumberErr?"Phone Number required":""} slotProps={{input: { startAdornment: <InputAdornment position="start">+61</InputAdornment>}}} />

                <TextField label="Address" inputRef={materialRef} fullWidth margin="normal" color="secondary" variant="outlined" error={addressErr} helperText={addressErr?"Address Required":""} />

                <Typography variant="caption" color="error" textAlign="center">
                    {finalErr}
                </Typography>

                <Button variant="contained" color="primary" fullWidth sx={{marginTop: '1vh'}} type="submit">
                    Create Account
                </Button>
            </form>
        </Box>
    )
}