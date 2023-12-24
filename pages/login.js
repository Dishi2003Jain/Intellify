import React, { useState } from "react";
import { supabase } from "../services/supabase";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password:password
      })
      if (error) {
        throw new Error("Invalid credentials");
      }
   
      console.log("Logged in successfully:", data);
      router.push("/home");
      // Redirect or perform actions after successful login
    } catch (error) {
      setError(error.message);
      console.error("Error logging in:", error.message);
    }
   };

  return (
    <div className={styles.containerfluid}>
      <div className={styles.bgimage}></div>
      <div className={styles.cardcontainer}>
        <div className={styles.cardbody}>
          <h2>Login now</h2>
          <div className={styles.inputs}>
            <input
              className={styles.forminput}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.forminput}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.submitbtn} onClick={handleLogin}>
              LOGIN
            </button>
          </div>
          <Link href="/signup" style={{ color: "#1266f1" }}>
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
