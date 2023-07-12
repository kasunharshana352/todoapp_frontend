import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.reload) {
      fetchUserProfile();
    }
  }, [location]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3001/api/auth/profile",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.username}</p>
      <p>Email: {user.email}</p>
      <Link onClick={handleLogout}>Logout</Link>
    </div>
  );
}

export default Profile;
