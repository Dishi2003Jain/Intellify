import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        name:name,
        email:email,
        password:password,
      });
  
      if (error) {
        console.error('Error signing up:', error.message);
        // Show error message to the user
      } else {
        console.log('Signup successful!');
        window.alert("Please check your mail to confirm your signup")
        // Redirect or show success message
      }
      const { data, insertError } = await supabase
        .from('users')
        .insert([{ name, email,password }]); // Modify this based on your 'users' table structure

      if (insertError) {
        console.error('Error inserting user into the table:', insertError.message);
        // Handle the error while inserting user details
        // You may also want to handle the case where the user sign-up succeeded but table insertion failed
        return;
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Show error message to the user
    }
  };
  

  return (
    <div className={styles.containerfluid}>
      <div className={styles.bgimage}></div>
      <div className={styles.cardcontainer}>
        <div className={styles.cardbody}>
          <h2>Signup now</h2>
          <div className={styles.inputs}>
            <input
              className={styles.forminput}
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <button className={styles.submitbtn} onClick={handleSignUp}>
              SIGN UP
            </button>
            </div>
            <Link href='/login' style={{ color: '#1266f1'}}>
                    Already have an account?Login
                  </Link>
          </div>
        </div>
      </div>
      )
    }
    