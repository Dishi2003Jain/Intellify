import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src="/assets/elearning.png" // Replace with your icon/image path
          alt="LearnHub Icon"
          width={70}
          height={70}
        />
        <h2>LearnHub</h2>
      </div>
      <div className={styles.cont}>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            src="/assets/pageimage.jpg" // Replace with your course image path
            alt="Course Image"
            width={500}
            height={400}
          />
        </div>

        <div className={styles.buttonsContainer}>
          <h2>Start your learning journey now!</h2>
          <div className={styles.buttons}>
            <Link href="/home">
              <button className={styles.getStartedButton}>Get Started</button>
            </Link>
            <Link href="/login">
              <button className={styles.loginButton}>Already have an account</button>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
