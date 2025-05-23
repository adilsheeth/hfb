import { Box, Button, Typography } from "@mui/material";
import Header from "../layout/Header";
import { useAuth } from "../firebase/authContext";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase/auth";


export default function Dashboard(){
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const onSignOut = () => {
        signOutUser()
        .then(() => {
            navigate("/")
        })
        .catch((e) => {
            console.log(e)
        })
    }

    if (!false){ return (
        <Box>
            <Header />
            <Box>
                <Typography>
                    Hi {currentUser ? currentUser.email : ""}
                </Typography>
                <Button onClick={()=>onSignOut()}>
                    Sign Out
                </Button>
            </Box>
        </Box>
    )}
}