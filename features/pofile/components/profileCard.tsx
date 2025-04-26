import React from "react";
import { useAuthStore } from "../../../stores/auth";

const ProfileCard = () => {
    const { user } = useAuthStore();

    return (
        <div>
            <h2>Profile Card</h2>
            <p><strong>Name:</strong> {user?.username || "N/A"}</p>
            <p><strong>Email:</strong> {user?.email || "N/A"}</p>
            <p><strong>Username:</strong> {user?.username || "N/A"}</p>
        </div>
    );
};

export default ProfileCard;
