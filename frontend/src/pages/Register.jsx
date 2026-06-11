import { useState } from "react";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/register", {
      name,
      email,
      password,
    });

    console.log(res.data);
    alert("User Registered Successfully");
  } catch (error) {
    console.log(error);
    alert("Registration Failed");
  }
};

return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">

    <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px]">

      <h1 className="text-4xl font-bold text-center mb-8">
        Register
      </h1>

      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-5"
      >

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          Register
        </button>

      </form>
    </div>
  </div>
);
}

export default Register;