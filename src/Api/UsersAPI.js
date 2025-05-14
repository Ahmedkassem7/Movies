import axios from "axios";
const baseUrl = "http://localhost:3001/users";

const authenticateUser = async (email, password) => {
    console.log(email, password)
    try {
        const response = await axios.get(`${baseUrl}/`, {
            params: { email, password }
        });
        if (response.data.length === 0) {
            throw new Error('Invalid email or password');
        }
        const user = response.data[0];
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    } catch (error) {
        console.error('Authentication failed:', error);
        throw error;
    }
};
const addNewUser = async (user) => {
    try {
        const checkResponse = await axios.get(baseUrl, {
            params: { email: user.email }
        });

        if (checkResponse.data.length > 0) {
            throw new Error("email already exists");
        }
        const addResponse = await axios.post(baseUrl, user);
        return addResponse.data;

    } catch (error) {
        console.error('Error :', error);
        throw error;
    }
  };
export { addNewUser, authenticateUser };
