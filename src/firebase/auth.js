import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./config";
import { get, ref, set } from "firebase/database";


export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () => {
    return signOut(auth);
}

export const resetPassword = async (user) => {
    sendPasswordResetEmail(auth, user.email)
    .then(() => {
        // console.log("Password reset email sent successfully");
    })
    .catch((error) => {
        console.error("Error sending password reset email:", error);
    });
}

export const createUserRecord = async (user, details) => {
    const uid = user.uid; 
    set(ref(db, 'users/' + uid), {
        email: details.email,
        name: details.name,
        phone: details.phone,
        address: details.address,
        orders: [""],
    });
} 

export const newOrder = async (user, order) => {
    const uid = user.uid; 
    const orderId = new Date().getTime(); // Unique ID based on timestamp
    set(ref(db, 'users/' + uid + '/orders/' + orderId), {
        ...order,
        orderId: orderId,
        status: "pending", // Initial status
    });
}

export const getUserDetails = async (user) => {
    const uid = user.uid;
    const userRef = ref(db, 'users/' + uid);
    return get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    }).catch((error) => {
        console.error("Error fetching user details:", error);
        return null;
    });
}

export const deleteOrder = async (user, orderId) => {
    const uid = user.uid;
    const orderRef = ref(db, 'users/' + uid + '/orders/' + orderId);
    return set(orderRef, null).then(() => {
        // console.log("Order deleted successfully");
    }).catch((error) => {
        console.error("Error deleting order:", error);
    });
}

// Update order status by searching all users' orders for a matching orderId
export const confirmOrderByOrderId = async (orderId, newStatus = 'confirmed') => {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    const users = snapshot.val();
    if (!users) return false;
    for (const [uid, user] of Object.entries(users)) {
        if (user.orders) {
            // Handle both array and object formats
            let orderEntries = Array.isArray(user.orders)
                ? Object.entries(user.orders)
                : Object.entries(user.orders);
            for (const [oid, order] of orderEntries) {
                if (order && (order.uid === orderId || order.orderId === orderId || oid === orderId)) {
                    // Found the order, update its status
                    const orderRef = ref(db, `users/${uid}/orders/${oid}`);
                    await set(orderRef, { ...order, status: newStatus });
                    return true;
                }
            }
        }
    }
    return false;
};

