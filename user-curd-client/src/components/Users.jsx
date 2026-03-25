import react from "react";

const Users = () => {
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
      .then((data) => console.log("Added Data ", data));
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
    </>
  );
};
export default Users;
