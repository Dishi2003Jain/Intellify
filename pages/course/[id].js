import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

const CourseDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/course_list.json');
        const data = await response.json();
        const courseId = Number(id);

        const selectedCourse = data.find((course) => course.id === courseId);

        if (selectedCourse) {
          setCourse(selectedCourse);
        } else {
          console.error('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.CourseBox}>
     <h3 style={{textAlign:'center'}}>Course Details</h3>
     <div className={styles.courseitem}>
      <div className={styles.courseleft}>
      <Image src={course.image_link} className={styles.courseimage} width={70} height={70} />
      <p className={styles.title}>{course.course_name}</p>
      </div>
      <div className={styles.detailcontainer}>
      <p className={styles.details}>Description : {course.description}</p>
      <p className={styles.details}>Course Type: {course.course_type}</p>
      <div className={styles.videoLinks}>
        <p className={styles.details}>Video links:</p>
        <ul className={styles.videoList}>
          {course.video_links.map((link, index) => (
            <li key={index} className={styles.videoListItem}>
              <a href={link} target="_blank" rel="noopener noreferrer" className={styles.list}>
                Video {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
    </div>
  );
};

export default CourseDetails;
