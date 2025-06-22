import Header from "../layout/Header";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <Box>
            <Header />
            <Grid container direction="column" alignItems="center" justifyContent="center" height="84vh" spacing={0} padding={0} sx={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)' }}>
                <Box maxWidth="600px" width="100%" sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
                    <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 2, letterSpacing: 1 }}>
                        Welcome to Hire for Baby!
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'text.secondary', mb: 2, fontWeight: 500 }}>
                        Australia's trusted baby equipment hire service
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 3 }}>
                        Hire for Baby makes parenting easier by providing high quality, safe, and hygienic baby equipment for hire—whether you need it for a day, a week, or a few months. From car seats and capsules to prams, cots, and breast pumps, we have everything you need for your growing family or your next holiday.
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 3 }}>
                        With branches across Australia, all our equipment is purchased brand new, thoroughly cleaned, and safety checked. Our trained restraint fitters offer complimentary fitting for hired car seats and capsules, so you can travel with peace of mind.
                    </Typography>
                    <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 2, fontWeight: 600 }} onClick={() => navigate('/new-order')}>
                        Hire Now
                    </Button>
                </Box>
            </Grid>
        </Box>
    );
}