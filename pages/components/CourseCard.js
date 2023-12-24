import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import { supabase } from '../../services/supabase'; // Import your Supabase client instance
import { useState, useEffect } from 'react';

const CourseCard = ({ course }) => {
  const { id, course_name, image_link, course_type } = course;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        const { user } = session
        setUser(user || null); // Set user to null if currentUser is undefined
      } catch (error) {
        console.error('Error fetching session:', error.message);
        setUser(null); // Set user to null in case of an error
      }
    };

    fetchSession();
  }, []);

  const showDetails = () => {
    if (user) {
      // If user is logged in, allow to see details for both free and premium courses
      return true;
    } else {
      // If user is not logged in, only allow to see details for free courses
      if (course_type === 'premium') {
        // Show an alert if a non-logged-in user clicks on the "More Details" button for a premium course
        return false;
      }
      return course_type === 'free';
    }
  };
 console.log(user)
  return (
    <div className={styles.cardheight}>
    <div className={`${styles.card} ${styles.centered}`}>
      <div className={styles.imageContainer}>
        <Image src={image_link} alt={course_name} width={300} height={250} />
      </div>
      <div className={styles.cardBody}>
        <h4 style={{ color: course_type === 'premium' ? 'red' : 'green', textDecoration: 'underline' }}>
          {course_type}
        </h4>
        <h5 className={styles.title}>{course_name}</h5>
        {showDetails() ? (
          <Link href={`/course/${id}`}>
            <button className={styles.buttoncourse} style={{ backgroundColor: '#17a2b8', width: '100%' }}>
              More Details
            </button>
          </Link>
        ) : (
          <Link href="/login" style={{color:'black'}}>
          <h5 style={{textAlign:'center'}}>Login to view more details</h5>
          </Link>
        )}
      </div>
      </div>
    </div>
  );
};

export default CourseCard;
