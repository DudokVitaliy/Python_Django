import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/password-reset/", {
        email
      });

      setMessage("Лист відправлено. Перевір пошту.");
    } catch (err) {
      setMessage("Помилка. Перевір email.");
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
      <h2 style={{ textAlign: "center", color: "#333" }}>Відновлення пароля</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Введи email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        onClick={sendEmail}
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
        Надіслати
      </button>

      {message && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: message.startsWith("📩") ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}