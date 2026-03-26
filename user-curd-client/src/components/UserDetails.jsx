import React from "react";
import { useLoaderData } from "react-router";

const UserDetails = () => {
  const userDetails = useLoaderData();
  //   console.log(userDetails);
  return (
    <div>
      {userDetails.name} : {userDetails.email}
    </div>
  );
};

export default UserDetails;
