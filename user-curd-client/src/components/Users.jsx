import react, { use, useState } from "react";
import { Link } from "react-router";

const Users = ({ userPromise }) => {
  const data = use(userPromise);
  const [users, setUser] = useState(data);

  const handleDelete = (id) => {
    console.log("Button clicked", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after delete", data);
        if (data.deletedCount === 1) {
          //   alert("deleted succesfully");
          const remaining = users.filter((users) => users._id !== id);
          setUser(remaining);
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const newUser = { name, email };
    console.log(name, email);
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Added Data ", data);
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUser(newUsers);
          //   alert("New User Added Successfully");
        }
      });
  };
  return (
    <>
      <div>users</div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Name : </label>
          <input type="text" name="name" />
          <br />
          <label>Email : </label>
          <input type="text" name="email" />
          <br />
          <input type="submit" />
        </form>
      </div>

      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} : {user.email}
            <Link to={`/users/${user._id}`}>details</Link>
            <button onClick={() => handleDelete(user._id)}>X</button>
          </p>
        ))}
      </div>
    </>
  );
};
export default Users;
