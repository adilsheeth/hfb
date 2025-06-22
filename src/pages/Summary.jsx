import { Box, Button, Grid, Typography } from "@mui/material";
import Header from "../layout/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import { newOrder } from "../firebase/auth";



export default function Summary() {

    const { orderDetails } = useLocation().state || {};
    const order = orderDetails ? JSON.parse(orderDetails) : {};
    const { currentUser } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = () => {
        newOrder(currentUser, order);
        navigate("/success");
    };

    return (
        <Box>
            <Header />
            <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={5} padding={5}>
                <Box sx={{ maxWidth: 500, width: '100%', p: 3 }}>
                    <Typography variant="h3" sx={{ mb: 2, textAlign: "center", mx: 2, my: 4 }}>
                        Order Summary
                    </Typography>
                    <Box sx={{ mb: 3, mt: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                            Child's Age:
                            <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{order.age} years old</span>
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                            Car Seat Type:
                            <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{order.type === "rearfacing" ? "Rear-facing car seat" : order.type === "frontfacing" ? "Front-facing car seat" : "Booster seat"}</span>
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                            Brand:
                            <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{order.brand === "maxi-cosi" ? "Maxi-Cosi [Basic] - $55pw" : "Britex [Premium] - $75pw"}</span>
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                            Delivery:
                            <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{order.deliver === "yes" ? "Yes - $10 (metro areas)" : "No"}</span>
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                            Accessories:
                            <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{(() => {
                                if (!order.accessories) return "None";
                                let acc = {};
                                try { acc = typeof order.accessories === 'string' ? JSON.parse(order.accessories) : order.accessories; } catch { acc = {}; }
                                const selected = Object.entries(acc).filter(([_, v]) => v).map(([k]) => {
                                    switch(k) {
                                        case 'breastPump': return 'Breast Pump';
                                        case 'pram': return 'Pram';
                                        case 'cot': return 'Cot';
                                        case 'feedingChair': return 'Feeding Chair';
                                        default: return k;
                                    }
                                });
                                return selected.length ? selected.join(", ") : "None";
                            })()}</span>
                        </Typography>
                        {order.date && (
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                                Preferred Date:
                                <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{order.date && new Date(order.date).toLocaleDateString()}</span>
                            </Typography>
                        )}
                        {order.time && (
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                                Preferred Time:
                                <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{(() => {
                                    if (!order.time) return "";
                                    let dateObj;
                                    if (typeof order.time === 'string') {
                                        // Try to parse as ISO string or fallback
                                        dateObj = new Date(order.time);
                                        if (!isNaN(dateObj.getTime())) {
                                            return dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
                                        } else {
                                            // If not a valid date, just show the string
                                            return order.time;
                                        }
                                    } else {
                                        return new Date(order.time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
                                    }
                                })()}</span>
                            </Typography>
                        )}
                        {order.duration && (
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                                Duration:
                                <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{order.duration} week{order.duration > 1 ? 's' : ''}</span>
                            </Typography>
                        )}
                    </Box>
                    {/* Total Cost Calculation */}
                    <Box sx={{ mt: 3, mb: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', textAlign: 'center' }}>
                            Total Cost: {(() => {
                                // Base price per week
                                let base = order.brand === 'maxi-cosi' ? 55 : order.brand === 'britex' ? 75 : 0;
                                let duration = Number(order.duration) || 1;
                                let accessories = 0;
                                if (order.accessories) {
                                    let acc = {};
                                    try { acc = typeof order.accessories === 'string' ? JSON.parse(order.accessories) : order.accessories; } catch { acc = {}; }
                                    if (acc.breastPump) accessories += 35;
                                    if (acc.pram) accessories += 40;
                                    if (acc.cot) accessories += 30;
                                    if (acc.feedingChair) accessories += 35;
                                }
                                let delivery = order.deliver === 'yes' ? 10 : 0;
                                let total = duration * (base + accessories) + delivery;
                                return `$${total}`;
                            })()}
                        </Typography>
                    </Box>
                    <Button onClick={()=> handleSubmit()} variant="contained" fullWidth color="primary" size="large" sx={{ mt: 2}}>
                        Continue to Payment
                    </Button>
                </Box>
            </Grid>
        </Box>
    )
}