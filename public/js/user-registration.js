const { handleUserRegistration } = require('../public/js/user-registration'); // Import your registration function

// Define a mock User model
const mockUserModel = {
    create: jest.fn((user) => {
        return { id: 1, ...user };
    }),
};

describe('User Registration', () => {
    beforeEach(() => {
        // Clear the mock function's calls before each test
        mockUserModel.create.mockClear();
    });

    it('should insert a user into the database', async () => {
        const registrationData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
        };

        // Use the mock User model to create a user
        const newUser = await handleUserRegistration(registrationData, mockUserModel);

        // You can add assertions here to check if the user was inserted correctly
        expect(newUser).toBeDefined();
        expect(newUser.username).toBe(registrationData.username);
        expect(newUser.email).toBe(registrationData.email);

        // Check if the create method of the mock User model was called with the registration data
        expect(mockUserModel.create).toHaveBeenCalledWith(registrationData);
    });

    // Add more test cases for different scenarios, including error cases
});

