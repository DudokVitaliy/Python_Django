import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", form);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      window.location.href = "/profile";
    } catch (err) {
      console.log(err.response?.data);
      alert("Помилка входу");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        onChange={handleChange}
        placeholder="login"
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="password"
      />
      <button>Login</button>
    </form>
  );
}