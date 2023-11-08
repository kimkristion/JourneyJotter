const { handleUserRegistration } = require('../public/js/user-registration'); // Import your registration function
const { mockSequelize } = require('sequelize-mock');

describe('User Registration', () => {
    let mockDb;

    beforeAll(() => {
        // Set up a mock database
        mockDb = mockSequelize();
    });

    it('should insert a user into the database', async () => {
        const registrationData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'TestPassword123',
        };

        // Mock the User model and its create method
        const createUserSpy = jest.spyOn(mockDb.models.User, 'create').mockResolvedValue({
            username: registrationData.username,
            email: registrationData.email,
            password: 'hashed_password', // Replace with the actual hashed password
        });

        // Call the registration function
        const newUser = await handleUserRegistration(registrationData);

        // Expectations
        expect(newUser).toBeDefined();
        expect(newUser.username).toBe(registrationData.username);
        expect(newUser.email).toBe(registrationData.email);

        // Ensure that the create method was called with the correct data
        expect(createUserSpy).toHaveBeenCalledWith({
            username: registrationData.username,
            email: registrationData.email,
            password: expect.any(String), // Password should be a hashed string
        });

        // Restore the original create method
        createUserSpy.mockRestore();
    });

    // Add more test cases for different scenarios, including error cases
});
