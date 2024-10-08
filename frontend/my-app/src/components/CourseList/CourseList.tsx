import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Course } from '../../../types';
import CourseCard from '../CourseCard/CourseCard'; 
import styles from './CourseList.module.css'; 

interface CourseListProps {
    onSubscribe: (course: Course) => void;
    onDragStart: (course: Course) => void; 
}

const CourseList: React.FC<CourseListProps> = ({ onSubscribe, onDragStart }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5001/api/courses');
                setCourses(response.data.result);
            } catch (error) {
                setError('Error fetching courses. Please try again later.');
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) return <p className={styles.loadingText}>Loading courses...</p>;
    if (error) return <p className={styles.errorText}>{error}</p>;

    return (
        <div className={styles.courseList}>
            {courses.map(course => (
                <CourseCard 
                    key={course.sys_id}
                    course={course}
                    onSubscribe={onSubscribe}
                    onDragStart={onDragStart}
                />
            ))}
        </div>
    );
};

export default CourseList;
