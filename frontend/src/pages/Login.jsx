import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

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
      setError("Неправильний логін або пароль");
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>

        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          style={styles.input}
        />

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button}>Login</button>

        <a href="/forgot-password" style={styles.link}>
          Forgot password?
        </a>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)"
  },
  form: {
    width: "320px",
    padding: "30px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  title: {
    textAlign: "center",
    marginBottom: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  },
  button: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#667eea",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center"
  },
  link: {
    textAlign: "center",
    fontSize: "13px",
    marginTop: "5px",
    color: "#667eea",
    textDecoration: "none"
  }
};