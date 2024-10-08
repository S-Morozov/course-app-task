import React from 'react';
import { Course } from '../../../types';
import Button from '../Button/Button'; 
import styles from './CourseCard.module.css'; 

interface CourseCardProps {
    course: Course;  // The course object with title, description, etc.
    onSubscribe: (course: Course) => void;  // Callback for subscribing to a course
    onDragStart: (course: Course) => void;  // Callback for starting a drag event
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSubscribe, onDragStart }) => {
    return (
        <div
            className={styles.courseCard}
            draggable  // Enable drag functionality for the course card
            onDragStart={() => onDragStart(course)}  // Trigger drag start when the card is dragged
            onDragEnd={() => console.log('Drag Ended')}  // Log when dragging ends
        >
            <h4 className={styles.courseTitle}>{course.title}</h4>  {/* Display course title */}
            <div className={styles.courseDescriptionWrapper}>
                <p className={styles.courseDescription}>{course.description}</p>  {/* Display course description */}
            </div>
            <p className={styles.courseDuration}>Duration: {course.duration}</p>  {/* Display course duration */}
            
            {/* Button to trigger subscription to the course */}
            <Button onClick={() => onSubscribe(course)} className={styles.subscribeButton}>
                Subscribe
            </Button>

            {/* Button to trigger learn more action */}
            <button
                className={styles.learnMoreButton}
                onClick={() => console.log('Learn More clicked!', course)}  // Log action for learning more about the course
            >
                Learn More
            </button>
        </div>
    );
};

export default CourseCard;
