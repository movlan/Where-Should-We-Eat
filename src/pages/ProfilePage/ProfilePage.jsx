import React from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

const ProfilePage = (props) => {
  return <ProfileCard user={props.user} />;
};

export default ProfilePage;
