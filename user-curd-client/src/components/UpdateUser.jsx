import React from "react";
import { useLoaderData } from "react-router";

const UpdateUser = () => {
  const data = useLoaderData();
  console.log(data);
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const updatedUser = { name, email };
    console.log(name, email);
    fetch(`http://localhost:3000/users/${data._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data updated", data);
        if (data.modifiedCount) {
          alert("Data Succesfully updated");
        }
      });
  };
  return (
    <>
      <div>edit user</div>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={data.name} />
        <br />
        <input type="email" name="email" defaultValue={data.email} />
        <br />
        <input type="submit" value="Update Users" />
      </form>
    </>
  );
};
export default UpdateUser;
