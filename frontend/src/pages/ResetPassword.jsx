import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const resetPassword = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/password-reset-confirm/", {
        token,
        password
      });

      setMessage("Пароль успішно змінено");
    } catch (err) {
      setMessage("Помилка при зміні пароля");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9"
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>Новий пароль</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="password"
          placeholder="Введи новий пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxSizing: "border-box",
            marginBottom: "10px",
            outline: "none",
            transition: "border-color 0.3s",
          }}
        />
      </div>

      <button
        onClick={resetPassword}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        Змінити пароль
      </button>

      {message && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: message.startsWith("✅") ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}