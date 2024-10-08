import React from 'react';
import { Course } from '../../../types';
import styles from './Basket.module.css';
import Button from '../Button/Button';

interface BasketProps {
    basketCourses: Course[];
    onConfirm: (course: Course) => void;
    onRemove: (course: Course) => void;
}

const Basket: React.FC<BasketProps> = ({ basketCourses, onConfirm, onRemove }) => {
    return (
        <div className={styles.basketContainer}>
            <h2 className={styles.header}>Subscription Basket</h2>
            {basketCourses.length === 0 ? (
                <p>The basket is empty.</p>
            ) : (
                <>
                    {basketCourses.map(course => (
                        <div className={styles.basketItem} key={course.sys_id}>
                            <span className={styles.courseTitle}>{course.title}</span>
                            <div className={styles.buttonContainer}>
                                <button className={styles.removeButton} onClick={() => onRemove(course)}>Remove</button>
                                <button className={styles.confirmButton} onClick={() => onConfirm(course)}>Confirm</button>
                            </div>
                        </div>
                    ))}
                    <Button onClick={() => basketCourses.forEach(onConfirm)} className={styles.confirmAllButton}>
                        Confirm All Subscriptions
                    </Button>
                </>
            )}
        </div>
    );
};

export default Basket;
