export const PasswordUtils = {
    generatePasswordWithPrefix(prefix = "Re@") {
        const randomDigits = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
        return `${prefix}${randomDigits}`;
    }
};// end PasswordUtils