export default class RandomDataUtil {

    /**
     * This method is used to generate a unique email address based on a base email
     * @param {String} emailPrefix 
     */
    async generateUniqueEmail(emailPrefix) {
        try {
            const randomNum = Math.floor(Math.random() * 10000);
            const uniqueEmail = `${emailPrefix}+${randomNum}@gmail.com`;
            console.log(`Generated unique email - ${uniqueEmail}`);
            return uniqueEmail;
        } catch (error) {
            console.error('An error occured in generateUniqueEmail', error.message);
        }
    }

    /**
     * This method is used to generate a random password with a specified length
     * @param {Number} length 
     */
    async generateRandomPassword(length = 10) {
        try {
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            console.log(`Generated random password - ${password}`);
            return password;
        } catch (error) {
            console.error('An error occured in generateRandomPassword', error.message);
        }
    }

    /**
     * This method is used to pick a random value out of an array
     * @param {Array} array
     */
    async choice(array) {
        try {
            return array[Math.trunc(Math.random() * array.length)];
        } catch (error) {
            console.error('An error occured in choice', error.message);
        }
    }
}