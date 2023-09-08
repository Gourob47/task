import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Task from "./Task";

const Profile = () => {
  const navigate = useNavigate();
  

  const [selectedImage, setSelectedImage] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  let userData = localStorage.getItem("loggedInUser");
  let user = JSON.parse(userData);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        user.picture = imageDataUrl;
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        localStorage.setItem("user-" + user.id, JSON.stringify(user));
        setSelectedImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const updateBio = (e) => {
    e.preventDefault();
    user.bio = bio;
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    localStorage.setItem("user-" + user.id, JSON.stringify(user));
  };

  const userLogout = (e) => {
    e.preventDefault();
    user.isLoggedIn = false;
    localStorage.setItem("loggedInUser", JSON.stringify(false));
    localStorage.setItem("user-" + user.id, JSON.stringify(user));
    navigate("/login");
  };

  useEffect(() => {
    let pro = localStorage.getItem("loggedInUser");
    let proImage = JSON.parse(pro);
    setImage(proImage.picture);
    setBio(proImage.bio);
  }, [selectedImage]);

  return (
    <>
      <div>
        <div className="signup-container">
          <div className="signup-form">
            <div>
              <h2>User Profile</h2>
              <img height={250} width={250} src={`${image}`} alt="Profile" />
            </div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            <p>Bio: {bio}</p>
            <input
              type="bio"
              name="bio"
              placeholder="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div>
              <button
                style={{ margin: "10px", padding: "10px" }}
                onClick={updateBio}
              >
                Update_Bio
              </button>
              <button
                style={{ margin: "10px", padding: "10px" }}
                onClick={userLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <Task />
      </div>
    </>
  );
};

export default Profile;
