import { Box, Button, Grid, Typography } from "@mui/material";
import Header from "../layout/Header";
import { useNavigate } from "react-router-dom";

export default function Success() {
    const navigate = useNavigate();
    return (
        <Box>
            <Header />
            <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={5} sx={{ minHeight: '80vh', px: { xs: 1, sm: 5 } }}>
                <Box sx={{ maxWidth: 500, width: '100%', p: { xs: 2, sm: 3 }, mx: 'auto', my: 4, textAlign: 'center', boxSizing: 'border-box', bgcolor: 'background.paper', borderRadius: 2, boxShadow: { xs: 0, sm: 2 } }}>
                    <Typography variant="h3" sx={{ mb: 2, mt: 4, fontWeight: 700, color: 'success.main', letterSpacing: 1 }}>
                        Success!
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
                        Everything worked
                    </Typography>
                    <Button variant="contained" color="primary" size="large" fullWidth onClick={() => navigate("/dashboard")}>Go Home</Button>
                </Box>
            </Grid>
        </Box>
    );
}