import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Header from "../layout/Header";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { ref, get } from "firebase/database";

export default function Admin() {
    const [ordersByStatus, setOrdersByStatus] = useState({ pending: [], confirmed: [], completed: [] });

    useEffect(() => {
        async function fetchAllOrders() {
            const usersRef = ref(db, 'users');
            const snapshot = await get(usersRef);
            const data = snapshot.val();
            const byStatus = { pending: [], confirmed: [], completed: [] };
            if (data) {
                Object.entries(data).forEach(([uid, user]) => {
                    if (user.orders) {
                        let orderArr = Array.isArray(user.orders)
                            ? user.orders.filter(order => order && typeof order === "object").map((order, idx) => ({ ...order, uid: order.uid || idx }))
                            : Object.entries(user.orders).filter(([_, order]) => order && typeof order === "object").map(([oid, order]) => ({ ...order, uid: oid }));
                        orderArr.forEach(order => {
                            const status = (order.status || 'pending').toLowerCase();
                            if (byStatus[status]) {
                                byStatus[status].push({ ...order, customer: user });
                            } else {
                                byStatus['pending'].push({ ...order, customer: user });
                            }
                        });
                    }
                });
            }
            setOrdersByStatus(byStatus);
        }
        fetchAllOrders();
    }, []);

    const renderOrderCard = (order, idx) => (
        <Grid item xs={12} sm={6} md={4} key={order.uid + '-' + idx}>
            <Box sx={{ width: '50vh', p: 3, textAlign: 'center', m: '0 auto' }}>
                <Card sx={{ borderRadius: 2, p: 2 }}>
                    <CardContent>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', letterSpacing: 1 }}>
                            Order #{order.uid}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: order.status === 'cancelled' ? 'error.main' : order.status === 'confirmed' ? 'success.main' : order.status === 'completed' ? 'info.main' : 'warning.main', letterSpacing: 1 }}>
                            Status: {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                        </Typography>
                        <Box sx={{ mb: 2, mt: 1 }}>
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
                                        let base = order.brand === 'maxi-cosi' ? 55 : order.brand === 'britex' ? 75 : 0;
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
                                        let total = duration * (base + accTotal) + delivery;
                                        return `$${total}`;
                                    })()}
                                </span>
                            </Typography>
                        </Box>
                        {/* Customer details */}
                        <Box sx={{ mt: 2, mb: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>Customer Details</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Name: <span style={{ color: '#333' }}>{order.customer?.name || 'N/A'}</span></Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Email: <span style={{ color: '#333' }}>{order.customer?.email || 'N/A'}</span></Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Phone: <span style={{ color: '#333' }}>+61 {order.customer?.phone || 'N/A'}</span></Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Address: <span style={{ color: '#333' }}>{order.customer?.address || 'N/A'}</span></Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    );

    return (
        <Box>
            <Header />
            <Box sx={{ px: 2 }}>
                <Typography variant="h4" sx={{ my: 3, fontWeight: 700, color: 'primary.main', textAlign: 'center', letterSpacing: 1 }}>
                    Admin Dashboard
                </Typography>
                {['pending', 'confirmed', 'completed'].map(status => (
                    <Box key={status} sx={{ mb: 5 }}>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: status === 'pending' ? 'warning.main' : status === 'confirmed' ? 'success.main' : 'info.main', letterSpacing: 1, textAlign: 'left' }}>
                            {status.charAt(0).toUpperCase() + status.slice(1)} Orders
                        </Typography>
                        <Grid container spacing={2}>
                            {ordersByStatus[status].length === 0 ? (
                                <Grid item xs={12}><Typography>No {status} orders found.</Typography></Grid>
                            ) : (
                                ordersByStatus[status].map(renderOrderCard)
                            )}
                        </Grid>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
