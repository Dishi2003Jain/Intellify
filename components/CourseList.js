import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import styles from '../styles/Home.module.css';
function CourseList() {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const fetchCourseList = async () => {
      try {
        const response = await fetch('/course_list.json'); // Fetch the JSON file
        if (!response.ok) {
          throw new Error('Failed to fetch course list');
        }
        const data = await response.json(); // Parse JSON data
        setCourseList(data); // Set the fetched data in state
      } catch (error) {
        console.error('Error fetching course list:', error);
      }
    };

    fetchCourseList(); // Call the function to fetch data when the component mounts
  }, []);

  return (
    <>
    <h2 style={{textAlign:'center'}}>Welcome to LearnHub</h2>
    <div className={styles.CourseListcont}>
      {courseList.map((course) => (
        // Assuming CourseCard is a component that receives a course object as a prop
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
    </>
  );
}

export default CourseList;
