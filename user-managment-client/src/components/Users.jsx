import React from "react";
import { use } from "react";

const Users = ({ usersPromise }) => {
  const userData = use(usersPromise);
  console.log(userData);
  return (
    <>
      <div>
        <h2>Add user Data</h2>
        <form>
          <label>Name : </label>
          <input type="text" name="name" />
          <br />
          <label>Email : </label>
          <input type="text" name="email" />
          <br />
          <br />
          <br />
          <button>Add user</button>
        </form>
      </div>

      <div>
        {userData.map((user) => (
          <p key={user.id}>
            {user.name} {user.email}
          </p>
        ))}
      </div>
    </>
  );
};
export default Users;
