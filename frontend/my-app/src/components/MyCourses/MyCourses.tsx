import React from 'react';
import { Course } from '../../../types';
import Button from '../Button/Button';
import styles from './MyCourses.module.css';

interface MyCoursesProps {
    courses: Course[];
    onUnsubscribe: (course: Course) => void;
}

const MyCourses: React.FC<MyCoursesProps> = ({ courses, onUnsubscribe }) => {
    return (
        <div className={styles.myCoursesContainer}>
            <h3 className={styles.header}>My Courses</h3>
            {courses.length === 0 ? (
                <p className={styles.emptyState}>No subscriptions. Start adding courses!</p>
            ) : (
                <ul className={styles.courseList}>
                    {courses.map(course => (
                        <li key={course.sys_id} className={styles.courseItem}>
                            <span className={styles.courseTitle}>{course.title}</span>
                            <div className={styles.buttonContainer}>
                                <Button onClick={() => onUnsubscribe(course)} className={styles.unsubscribeButton}>
                                    Cancel subscription
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyCourses;
