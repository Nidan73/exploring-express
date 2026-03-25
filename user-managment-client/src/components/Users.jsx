import React, { useState } from "react";
import { use } from "react";

const Users = ({ usersPromise }) => {
  const initialUserData = use(usersPromise);
  const [users, setUsers] = useState(initialUserData);
  // console.log(userData);
  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const newUser = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("My new Data", data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        form.reset();
      });
  };
  return (
    <>
      <div>
        <h2>Add user Data</h2>
        <form onSubmit={handleAdd}>
          <label>Name : </label>
          <input type="text" name="name" />
          <br />
          <label>Email : </label>
          <input type="text" name="email" />
          <br />
          <br />
          <button>Add user</button>
        </form>
      </div>

      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.name} {user.email}
          </p>
        ))}
      </div>
    </>
  );
};
export default Users;
