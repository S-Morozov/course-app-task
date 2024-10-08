import React, { useEffect, useState } from 'react';
import CourseList from './components/CourseList/CourseList';
import { Course, User } from '../types'; 
import axios from 'axios';
import './App.css'; 
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Basket from './components/Basket/Basket';
import MyCourses from './components/MyCourses/MyCourses';

const App: React.FC = () => {
    const [subscribedCourses, setSubscribedCourses] = useState<Course[]>([]);
    const [basketCourses, setBasketCourses] = useState<Course[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [draggedCourseId, setDraggedCourseId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/users');
                const users = response.data.result;
                if (users.length > 0) {
                    const userAccount = users[0].user_account; 
                    const userEmail = users[0].email; 
                    const userId = users[0].sys_id;

                    console.log('Fetched user:', { userAccount, userEmail, userId });

                    setCurrentUser({ 
                        user_id: userAccount, 
                        username: 'Guest',
                        sys_id: userId, 
                        email: userEmail,
                    });
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleSubscribe = (course: Course) => {
        if (!basketCourses.some(basketCourse => basketCourse.sys_id === course.sys_id)) {
            setBasketCourses(prevBasket => [...prevBasket, course]);
        }
    };

    const handleDragStart = (course: Course) => {
        setDraggedCourseId(course.sys_id);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (draggedCourseId) {
            const droppedCourse = basketCourses.find(course => course.sys_id === draggedCourseId);
            if (droppedCourse) {
                handleSubscribe(droppedCourse);
                setDraggedCourseId(null);
            }
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleConfirmSubscription = async () => {
      if (currentUser && currentUser.user_id) {
          try {
              await Promise.all(
                  basketCourses.map(course =>
                      axios.post('http://localhost:5001/api/subscribe', {
                          course: course.sys_id, // Используем sys_id
                          learner: currentUser.user_id // Используем user_id
                      })
                  )
              );
              setSubscribedCourses(prevSubscribed => [...prevSubscribed, ...basketCourses]);
              setBasketCourses([]);
              setNotification(`You have successfully subscribed to: ${basketCourses.map(course => course.title).join(', ')}`);
          } catch (error) {
              console.error('Error subscribing to courses:', error);
              setNotification('An error occurred during subscription. Please try again later.');
          }
      } else {
          console.error('Current user not found or userId is undefined');
          setNotification('User ID is not available. Please log in again.');
      }
  };
  
    const handleUnsubscribe = async (course: Course) => {
        if (currentUser) {
            try {
                await axios.delete(`http://localhost:5001/api/unsubscribe`, {
                    data: { learner: currentUser.user_id, title: course.sys_id }
                });
                setSubscribedCourses(prevSubscribed => prevSubscribed.filter(sub => sub.sys_id !== course.sys_id));
                setNotification(`You have successfully unsubscribed from: ${course.title}`);
            } catch (error) {
                console.error('Error unsubscribing from course:', error);
                setNotification('An error occurred during unsubscription. Please try again later.');
            }
        }
    };

    return (
        <div className="App">
            <NavBar />
            <header className="App-header">
                <h1>Welcome, {currentUser ? currentUser.sys_id : 'Guest'}!</h1>
            </header>
            <main>
                <section className='coursesListContainer'>
                    <div className='titleCard'>
                        <h3>Our Best Courses</h3>
                    </div>
                    <div className='coursesList'>
                        <CourseList onSubscribe={handleSubscribe} onDragStart={handleDragStart} /> 
                    </div>
                </section>

                <section className='basketContainer' onDrop={handleDrop} onDragOver={handleDragOver}>
                    <Basket 
                        basketCourses={basketCourses}
                        onConfirm={handleConfirmSubscription}
                        onRemove={(course) => setBasketCourses(basketCourses.filter(c => c.sys_id !== course.sys_id))}
                    />
                </section>

                <section className="myCoursesContainer">
                    {subscribedCourses.length > 0 && <MyCourses courses={subscribedCourses} onUnsubscribe={handleUnsubscribe} />}
                </section>
            </main>

            {notification && <div className="notification">{notification}</div>}
            <Footer />
        </div>
    );
};

export default App;
