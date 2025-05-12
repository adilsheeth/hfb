import Header from "../layout/Header";
import { Box, Grid, Typography } from "@mui/material";


export default function Home() {

    if (!false) { return (
        <Box>
            <Header />
            <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'} height='84vh' spacing={5} padding={5}>
                <Box maxWidth='50vh'>
                    <Typography variant="h3" textAlign={'center'} color='primary'>
                        Welcome to Hire for Baby!
                    </Typography>
                    <Typography>
                        Placeholder text for a basic homepage about HFB.
                    </Typography>
                </Box>
            </Grid>
            
        </Box>
    )}
}