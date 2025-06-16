import { Box, Button, Typography, Grid, Card, CardContent, CardActions } from "@mui/material";
import Header from "../layout/Header";
import { useAuth } from "../firebase/authContext";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase/auth";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { ref, onValue } from "firebase/database";

export default function Dashboard(){
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!currentUser) return;
        const userRef = ref(db, `users/${currentUser.uid}`);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.orders && Array.isArray(data.orders)) {
                // Filter out empty string if present
                setOrders(data.orders.filter(order => order && typeof order === "object"));
            } else {
                setOrders([]);
            }
        });
        return () => unsubscribe();
    }, [currentUser]);

    const onSignOut = () => {
        signOutUser()
        .then(() => {
            navigate("/")
        })
        .catch((e) => {
            console.log(e)
        })
    }

     return (
        <Box>
            <Header />
            <Box>
            <Typography
                variant="h5"
                sx={{ mb: 2, textAlign: "center", mx: 2 }}
            >
                Hi {currentUser ? currentUser.email : ""}
            </Typography>
            <Button onClick={onSignOut} sx={{ mb: 4 }}>
                Sign Out
            </Button>
            <Typography variant="h6" sx={{ mb: 2 }}>
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
                    <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                        Order #{idx + 1}
                        </Typography>
                        {/* Render order details here. Adjust fields as per your order object structure */}
                        {Object.entries(order).map(([key, value]) => (
                        <Typography key={key} variant="body2">
                            <strong>{key}:</strong> {String(value)}
                        </Typography>
                        ))}
                    </CardContent>
                    <CardActions>
                        {/* Add actions like "View", "Cancel", etc. if needed */}
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
            </Box>
        </Box>
        )}
