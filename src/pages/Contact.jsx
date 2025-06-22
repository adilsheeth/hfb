import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import Header from "../layout/Header";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';


export default function Contact() {
    return (
        <Box>
            <Header />
            <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, px: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 3, textAlign: 'center', letterSpacing: 1 }}>
                    Contact Us
                </Typography>
                <Paper elevation={0} sx={{ p: 3, bgcolor: '#f9f9f9', borderRadius: 2, mb: 3 }}>
                    <Typography variant="body1" sx={{ mb: 2, color: 'text.primary', textAlign: 'center' }}>
                        For all enquiries, call us on:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mb: 2, textAlign: 'center', letterSpacing: 1 }}>
                        1300 363 755
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', textAlign: 'center' }}>
                        Or connect with us on social media:
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" color="primary" sx={{ borderRadius: 2, minWidth: 44, p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }} href="https://www.facebook.com/HireforBabyHQ/" target="_blank" aria-label="Facebook">
                            <FacebookIcon sx={{ mx: 'auto' }} />
                        </Button>
                        <Button variant="contained" color="primary" sx={{ borderRadius: 2, minWidth: 44, p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }} href="https://www.instagram.com/hireforbabyhq/" target="_blank" aria-label="Instagram">
                            <InstagramIcon sx={{ mx: 'auto' }} />
                        </Button>
                        <Button variant="contained" color="primary" sx={{ borderRadius: 2, minWidth: 44, p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }} href="https://www.youtube.com/channel/UCw60k9BLPcSD8pAf_yKyT_Q" target="_blank" aria-label="YouTube">
                            <YouTubeIcon sx={{ mx: 'auto' }} />
                        </Button>
                        <Button variant="contained" color="primary" sx={{ borderRadius: 2, minWidth: 44, p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }} href="https://www.pinterest.com.au/hireforbaby2/" target="_blank" aria-label="Pinterest">
                            <PinterestIcon sx={{ mx: 'auto' }} />
                        </Button>
                        <Button variant="contained" color="primary" sx={{ borderRadius: 2, minWidth: 44, p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }} href="https://twitter.com/HireForBaby" target="_blank" aria-label="Twitter">
                            <TwitterIcon sx={{ mx: 'auto' }} />
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </Box>
    );
}