const express = require('express');
const cors = require('cors');
const axios = require('axios'); 
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get('https://dev197735.service-now.com/api/now/table/x_quo_coursehub_learner?sysparm_limit=10', {
            auth: { username: 'admin', password: '2h/qSeX^8jZQ' },
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        });
        const users = response.data.result.map(user => ({
            user_account: user.user_account.value,
            email: user.email,
            sys_id: user.sys_id 
        }));
        res.json({ result: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server Error');
    }
});


app.get('/api/courses', async (req, res) => {
    try {
        const response = await axios.get('https://dev197735.service-now.com/api/now/table/x_quo_coursehub_course?sysparm_limit=10', {
            auth: { username: 'admin', password: '2h/qSeX^8jZQ' },
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        });
        const courses = response.data.result;
        res.json({ result: courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Server Error');
    }
});

app.post('/api/subscribe', async (req, res) => {
    const { course, learner } = req.body;

    if (!learner || !course) {
        return res.status(400).send('Learner and course are required');
    }

    try {
        const response = await axios.post('https://dev197735.service-now.com/api/now/table/x_quo_coursehub_course_subscription', {
            course: { value: course },
            learner: { value: learner }, 
        }, {
            auth: {
                username: 'admin',
                password: '2h/qSeX^8jZQ',
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        console.log('Response from ServiceNow:', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error subscribing:', error.response ? error.response.data : error.message);
        res.status(500).send('Error subscribing');
    }
});

app.delete('/api/unsubscribe', async (req, res) => {
    const { learner, title } = req.body;

    if (!learner || !title) {
        return res.status(400).send('Learner and title are required');
    }

    try {
        await axios.delete(`https://dev197735.service-now.com/api/now/table/x_quo_coursehub_course_subscription`, {
            data: { learner, title },
            auth: { username: 'admin', password: '2h/qSeX^8jZQ' },
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        });

        res.status(200).send('Unsubscribed successfully!');
    } catch (error) {
        console.error('Error unsubscribing:', error);
        res.status(500).send('Error unsubscribing');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
