import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signOut } from '../services/auth';
import { supabase } from '../services/supabase';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Header = () => {
  const [session, setSession] = useState(null);
  const router = useRouter();

  const fetchSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    } catch (error) {
      console.error('Error fetching session:', error.message);
    }
   };
   

  useEffect(() => {
    fetchSession();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    console.log("signed out");
    setSession(null); // Reset the session state to null
    router.push('/');
    window.history.replaceState({}, document.title, '/');
  };
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Image
              src="/assets/elearning.png" // Replace with your icon/image path
              alt="LearnHub Icon"
              width={70}
              height={70}
            />
            <h2>LearnHub</h2>
          </div>
        </div>
        <div className={styles.right}>
          <ul>
            {session ? (
              // If user is logged in, show Sign Out button
              <li>
                <button onClick={handleSignOut} className={styles.button}>
                  Sign Out
                </button>
              </li>
            ) : (
              // If user is not logged in, show Login button or link (adjust this accordingly)
              <li>
                <Link href="/login" style={{textDecoration:'none'}}>
                  <div className={styles.button} >Login</div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
