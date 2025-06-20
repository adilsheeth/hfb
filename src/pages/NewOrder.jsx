import Header from '../layout/Header';
import { Box, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';

export default function NewOrder() {

    const [ state, setState ] = useState("start");
    const [ age, setAge ] = useState("");
    const [ type, setType ] = useState("");

    if (!false) { return (
        <Box>
            <Header/>
            <Grid  container direction={'column'} alignItems={'center'} height={'84vh'} justifyContent={'center'} spacing={5} padding={5}>
                <Box>
                    <Typography variant="h3" sx={{ mb: 2, textAlign: "center", mx: 2, my: 4 }}>
                        Create New Order
                    </Typography>
                    <Typography>
                        How old is the child?
                    </Typography>
                    <Select value={age} fullWidth onChange={(e) => setAge(e.target.value)} sx={{ mt: 1 }}>
                        <MenuItem value="0-2">0-2 years</MenuItem>
                        <MenuItem value="3-8">3-8 years</MenuItem>
                        <MenuItem value="9+">9+ years</MenuItem>
                    </Select>
                    {
                        age ? (
                            age === "0-2" ? (
                                <Typography  sx={{ mt: 2 }}>
                                    For children aged 0-2, we recommend rear-facing car seats.
                                </Typography>
                            ) : age === "3-8" ? (
                                <Typography sx={{ mt: 2 }}>
                                    For children aged 3-8, we recommend front-facing car seats.
                                </Typography>
                            ) : (
                                <Typography sx={{ mt: 2 }}>
                                    For children aged 9 and above, we recommend booster seats.
                                </Typography>
                            )
                        ) : (
                            <></>
                        )
                    }
                    <Typography sx={{ mt: 2 }}>
                        What type of car seat do you need?
                    </Typography>
                    <Select value={type} fullWidth onChange={(e) => setType(e.target.value)} sx={{ mt: 1 }}>
                        <MenuItem value="0-2">Rear-facing car seat</MenuItem>
                        <MenuItem value="3-8">Front-facing car seat</MenuItem>
                        <MenuItem value="9+">Booster seat</MenuItem>
                    </Select>
                </Box>
            </Grid>
        </Box>
    )}
}