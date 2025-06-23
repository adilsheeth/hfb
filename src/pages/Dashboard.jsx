import { Box, Button, Typography, Grid, Card, CardContent, CardActions, CircularProgress } from "@mui/material";
import Header from "../layout/Header";
import { useAuth } from "../firebase/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";
import { getUserDetails, deleteOrder } from "../firebase/auth";

export default function Dashboard() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);
    const [ userDetails, setUserDetails ] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getUserDetails(currentUser).then(userDetails => {
            setUserDetails(userDetails);
        });
    }, [currentUser]);

    useEffect(() => {
        
        const userRef = ref(db, `users/${currentUser.uid}`);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.orders) {
                // Handle both array and object formats
                console.log("Fetched orders:", data.orders);
                // If orders is an object, preserve the key (order uid) as an attribute
                let orderArr = Array.isArray(data.orders)
                    ? data.orders
                        .filter(order => order && typeof order === "object")
                        .map((order, idx) => ({ ...order, uid: order.uid || idx }))
                    : Object.entries(data.orders)
                        .filter(([_, order]) => order && typeof order === "object")
                        .map(([uid, order]) => ({ ...order, uid }));
                console.log("Processed orders:", orderArr);
                setOrders(orderArr);
            } else {
                setOrders([]);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [currentUser]);

    const handleDeleteOrder = async (orderId) => {
        await deleteOrder(currentUser, orderId);
        navigate("/success");
    }

    return (
        <Box>
            <Header />
            <Box>
                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                        <CircularProgress size={60} thickness={5} sx={{ color: 'primary.main', mb: 2 }} />
                        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>Loading your dashboard...</Typography>
                    </Box>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, px: 2 }}>
                            <Typography
                                variant="h4"
                                sx={{ my: 2, fontWeight: 700, color: 'text.primary', letterSpacing: 1, textAlign: 'left' }}
                            >
                                Hey {(userDetails && userDetails.name) ? userDetails.name : currentUser ? currentUser.email : ""}!
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button onClick={() => navigate("/user-settings")} variant="outlined" color="secondary" size="large" sx={{ fontWeight: 600, borderRadius: 2 }} disabled>
                                    User Settings
                                </Button>
                                <Button onClick={() => navigate("/new-order")} variant="contained" size="large" sx={{ fontWeight: 600, borderRadius: 2 }}>
                                    Create New Order
                                </Button>
                            </Box>
                        </Box>
                        <Typography
                            variant="h4"
                            sx={{ mb: 4, mt: 2, textAlign: "center", fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}
                        >
                            Your Orders
                        </Typography>
                        <Grid container spacing={2}>
                            {orders.length === 0 && (
                                <Grid item xs={12}>
                                    <Typography>No orders found.</Typography>
                                </Grid>
                            )}
                            {orders.map((order, idx) => (
                                <Grid item xs={12} sm={6} md={4} key={idx}>
                                    <Box sx={{ width: '50vh', p: 3, textAlign: 'center', m: '0 auto' }}>
                                        <Card sx={{ borderRadius: 2, p: 2 }}>
                                            <CardContent>
                                                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>
                                                    Order #{order.uid}
                                                </Typography>
                                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: order.status === 'cancelled' ? 'error.main' : order.status === 'confirmed' ? 'success.main' : order.status === 'completed' ? 'info.main' : 'warning.main', letterSpacing: 1 }}>
                                                    Status: {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
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
                                                        <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{order.brand === "maxi-cosi" ? "Maxi-Cosi [Basic] - $55pw" : order.brand === "britex" ? "Britex [Premium] - $75pw" : order.brand}</span>
                                                    </Typography>
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                                                        Delivery:
                                                        <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{order.deliver === "yes" ? "Yes - $10 (metro areas)" : "No"}</span>
                                                    </Typography>
                                                    {order.accessories && (
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                                                            Accessories:
                                                            <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{(() => {
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
                                                    )}
                                                    {order.date && (
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                                                            Preferred Date:
                                                            <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{new Date(order.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                        </Typography>
                                                    )}
                                                    {order.time && (
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                                            Preferred Time:
                                                            <span style={{ fontWeight: 400, color: '#333', marginLeft: 8 }}>{(() => {
                                                                let dateObj = new Date(order.time);
                                                                if (!isNaN(dateObj.getTime())) {
                                                                    return dateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
                                                                } else {
                                                                    return order.time;
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
                                                    {/* Total Cost Calculation */}
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', mb: 0.5 }}>
                                                        Total Cost:
                                                        <span style={{ fontWeight: 700, color: '#1976d2', marginLeft: 8 }}>
                                                            {(() => {
                                                                let base = order.brand === 'britex' ? 75 : 55;
                                                                let duration = Number(order.duration) || 1;
                                                                let acc = {};
                                                                try { acc = typeof order.accessories === 'string' ? JSON.parse(order.accessories) : order.accessories; } catch { acc = {}; }
                                                                let accTotal = 0;
                                                                if (acc) {
                                                                    if (acc.breastPump) accTotal += 35;
                                                                    if (acc.pram) accTotal += 40;
                                                                    if (acc.cot) accTotal += 30;
                                                                    if (acc.feedingChair) accTotal += 35;
                                                                }
                                                                let delivery = order.deliver === 'yes' ? 10 : 0;
                                                                // Total
                                                                let total = duration * (base + accTotal) + delivery;
                                                                return `$${total}`;
                                                            })()}
                                                        </span>
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                            <CardActions sx={{ justifyContent: 'center' }}>
                                                <Button 
                                                    variant="contained" 
                                                    color="error" 
                                                    onClick={() => handleDeleteOrder(order.uid)}
                                                    disabled={order.status && (order.status.toLowerCase() === 'confirmed' || order.status.toLowerCase() === 'completed')}
                                                >
                                                    Cancel Order
                                                </Button>
                                            </CardActions>
                                            <Typography variant="caption" sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
                                                Note: Orders can only be cancelled if they are not confirmed. Please contact us for further assistance.
                                            </Typography>
                                        </Card>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Box>
        </Box>
    );
}
