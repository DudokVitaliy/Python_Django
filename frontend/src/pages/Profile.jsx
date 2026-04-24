import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      setError("Немає токена. Спочатку увійдіть.");
      setLoading(false);
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("PROFILE DATA:", res.data);

        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("PROFILE ERROR:", err.response?.status);
        console.log("DETAIL:", err.response?.data);

        if (err.response?.status === 401) {
          setError("Токен недійсний або протермінований");
        } else if (err.response?.status === 404) {
          setError("API /profile/ не знайдено");
        } else {
          setError("Не вдалося завантажити профіль");
        }

        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={styles.center}>
        <p>⏳ Завантаження...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.center}>
        <div>
          <p style={{ color: "red" }}>{error}</p>

          <button
            onClick={() => window.location.href = "/"}
            style={styles.button}
          >
            Увійти знову
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1>Профіль користувача</h1>

        <div style={styles.infoBox}>
          <p><b>Username:</b> {user?.username}</p>
          <p><b>Email:</b> {user?.email}</p>
          <p><b>Ім’я:</b> {user?.first_name || "—"}</p>
          <p><b>Прізвище:</b> {user?.last_name || "—"}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    background: "#f5f5f5",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    width: "350px",
    textAlign: "center",
  },
  infoBox: {
    marginTop: "20px",
    textAlign: "left",
    lineHeight: "1.8",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    flexDirection: "column",
    gap: "10px"
  },
  button: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "white",
    cursor: "pointer"
  }
};