import React from "react";
import EditProfileCard from "../../components/EditProfileCard/EditProfileCard";

const EditProfilePage = (props) => {
  return (
    <EditProfileCard
      user={props.user}
      setUser={props.setUser}
      history={props.history}
    />
  );
};

export default EditProfilePage;
