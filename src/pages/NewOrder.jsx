import Header from '../layout/Header';
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function NewOrder() {

    const [ age, setAge ] = useState("");
    const [ type, setType ] = useState("");
    const [ brand, setBrand ] = useState("");
    const [ deliver, setDeliver ] = useState("");
    const [ date, setDate ] = useState(null);
    const [ time, setTime ] = useState(null);
    const [ duration, setDuration ] = useState(1);
    const [ accessories, setAccessories ] = useState({
        breastPump: false,
        pram: false,
        cot: false,
        feedingChair: false,
    });

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (age && type && brand && deliver && date && time && duration) {
            const orderDetails = JSON.stringify({
                "age": age,
                "type": type,
                "brand": brand,
                "deliver": deliver,
                "date": date,
                "time": time,
                "duration": duration,
                "accessories": JSON.stringify(accessories)
            });
            navigate("/summary", { state: { orderDetails } });
        } else {
            alert("Please fill in all required fields.");
        }
    }

    return (
        <Box>
            <Header/>
            <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={5} padding={5}>
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
                                <Typography variant='body1' sx={{ mt: 2 }} color='info'>
                                    For children aged 0-2, we recommend rear-facing car seats.
                                </Typography>
                            ) : age === "3-8" ? (
                                <Typography variant='body1' sx={{ mt: 2 }} color='info'>
                                    For children aged 3-8, we recommend front-facing car seats.
                                </Typography>
                            ) : (
                                <Typography variant='body1' sx={{ mt: 2 }} color='info'>
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
                        <MenuItem value="rearfacing">Rear-facing car seat</MenuItem>
                        <MenuItem value="frontfacing">Front-facing car seat</MenuItem>
                        <MenuItem value="booster">Booster seat</MenuItem>
                    </Select>

                    <Typography sx={{ mt: 2 }}>
                        Which brand do you prefer?
                    </Typography>
                    <Select value={brand} fullWidth onChange={(e) => setBrand(e.target.value)} sx={{ mt: 1 }}>
                        <MenuItem value="maxi-cosi">Maxi-Cosi [Basic] - $55pw</MenuItem>
                        <MenuItem value="britex">Britex [Premium] - $75pw</MenuItem>
                    </Select>

                    <Typography sx={{ mt: 2 }}>
                        Do you need the car seat delivered?
                    </Typography>
                    <Select value={deliver} fullWidth onChange={(e) => setDeliver(e.target.value)} sx={{ mt: 1 }}>
                        <MenuItem value="yes">Yes - $10 (metro areas)</MenuItem>
                        <MenuItem value="no">No</MenuItem>
                    </Select>

                    <Typography sx={{ mt: 2 }} color='info'>
                        Installation is complimentary, and performed by our trained staff.
                    </Typography>

                    <Typography sx={{ mt: 2 }}>
                        Do you need any additional accessories?
                    </Typography>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={accessories.breastPump}
                                    onChange={(e) =>
                                        setAccessories({ ...accessories, breastPump: e.target.checked })
                                    }
                                />
                            }
                            label="Breast Pumps - $35pw"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={accessories.pram}
                                    onChange={(e) =>
                                        setAccessories({ ...accessories, pram: e.target.checked })
                                    }
                                />
                            }
                            label="Prams - $40pw"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={accessories.cot}
                                    onChange={(e) =>
                                        setAccessories({ ...accessories, cot: e.target.checked })
                                    }
                                />
                            }
                            label="Cot - $30pw"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={accessories.feedingChair}
                                    onChange={(e) =>
                                        setAccessories({ ...accessories, feedingChair: e.target.checked })
                                    }
                                />
                            }
                            label="Feeding Chair - $35pw"
                        />
                    </FormControl>
                    
                    <Typography sx={{ my: 2 }}>
                        Select preferred date and time to { deliver ? "deliver" : "pick up" } the car seat:
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            minDate={new Date()}
                            renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 1, mx: 1 }} />}
                        />
                        <TimePicker
                            label="Time"
                            value={time}
                            onChange={(newValue) => setTime(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 1, mx: 1 }} />}
                        />
                    </LocalizationProvider>

                    <Typography color='info' sx={{ mt: 2 }}>
                        You may be contacted to reschedule if there  are any issues <br /> with the selected date and time.
                    </Typography>

                    <Typography sx={{ mt: 2 }}>
                        How many weeks do you need to hire for?
                    </Typography>
                    <TextField
                        type="number"
                        inputProps={{ min: 1, max: 52 }}
                        value={duration}
                        onChange={e => setDuration(Math.max(1, Math.min(52, Number(e.target.value))))}
                        fullWidth
                        sx={{ mt: 1 }}
                        label="Duration (weeks)"
                    />

                    <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                        Next
                    </Button>
                </Box>
            </Grid>
        </Box>
    )}