import { Box, Typography, Paper } from "@mui/material";
import Header from "../layout/Header";


export default function About() {
    return (
        <Box>
            <Header />
            <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4, px: 2 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 3, textAlign: 'center', letterSpacing: 1 }}>
                    The complete baby equipment hire service
                </Typography>
                <Paper elevation={0} sx={{ p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
                    <Typography variant="body1" sx={{ mb: 2, color: 'text.primary' }}>
                        Let Hire for Baby help you with all your baby equipment hire needs for a day, a week or a few months with our friendly, professional service. Here at Hire for Baby, we offer high quality baby equipment rental services at great prices. We stock a wide range of products from car capsules and car seats, to breast pumps and portacots.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, color: 'text.primary' }}>
                        You and your baby deserve the best, so hire baby equipment from one of our branches all around Australia. From Perth, Darwin and Adelaide and with baby equipment branches located all along the East Coast from Brisbane, Sydney and Melbourne. All of our baby equipment for hire is purchased brand new, carefully cleaned & safety checked to ensure it is in the best possible condition for your use.
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mt: 3, mb: 1 }}>
                        Why buy, when you can hire your baby equipment?
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, color: 'text.primary' }}>
                        For your fast growing baby, buying expensive equipment like rockers and swings may not make sense. What your baby uses now might not be of any use after a couple months.  We at Hire for Baby provide an extensive range of cost-effective, hygienic and completely safe to use baby equipment from capsules, strollers to prams and portacots.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, color: 'text.primary' }}>
                        Our restraint fitters who are trained, provide complimentary fitting of hired baby capsules and car seats (when you collect) so that you can rest assured of your baby’s safety. Save your time, money and storage space by hiring for home – capsules, bassinettes, hammocks, strollers, swings, entertainers and much more. We also stock baby twin prams and baby twin strollers.
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                        For holidays, reduce stress, excess baggage fees (and potential damage to your baby equipment in transit) by having prams, portacots and car seats waiting for you on arrival. Hiring makes sense for a stress-free holiday! Prices vary according to the item & length of hire, so email us or ring your nearest branch today for a quote!
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}