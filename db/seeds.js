const sequelize = require('../config/connection');
const User = require('../models/User');
const Logs = require('../models/Logs');

// Define your seed data
const userData = [
    {
        username: 'jacklund1',
        email: 'jacklund1@example.com',
        password: 'jacklund1',
    },
    {
        username: 'junior1',
        email: 'junior1@example.com',
        password: 'junior1',
    },
    // Add more user data as needed
];

const logsData = [
    {
        title: 'Log Entry 1',
        description: 'Description for Log Entry 1',
        user_id: 1,
    },
    {
        title: 'Log Entry 2',
        description: 'Description for Log Entry 2',
        user_id: 2,
    },
];

async function seedDatabase() {
    try {
        await sequelize.sync({ force: true })

        await User.bulkCreate(userData);

        await Logs.bulkCreate(logsData);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await sequelize.close();
    }
}

seedDatabase();
