import Newsletter from "../model/newsletter.model";

/**
 * Adds a new user's email to the newsletter database.
 *
 * @param {string} user_email - The email address of the user to be added.
 * @returns {Promise<Newsletter>} A promise that resolves to the newly created Newsletter object.
 */
export const addUserEmail = async (user_email: string, user_firstname: string, user_lastname: string, user_contact_number: number) => {
    const newsletter = await Newsletter.create({
        user_email: user_email,
        user_contact_number: user_contact_number,
        user_firstname: user_firstname,
        user_lastname: user_lastname
    });

    return newsletter;
};


/**
 * Retrieves all user emails from the newsletter database.
 *
 * @returns {Promise<Newsletter[]>} A promise that resolves to an array of Newsletter objects.
 */
export const getAllUserEmail = async () => {
    const newsletter = await Newsletter.find();
    return newsletter;
};


/**
 * Retrieves a single user's email from the newsletter database by its id.
 *
 * @param {string} id - The id of the Newsletter object to be retrieved.
 * @returns {Promise<Newsletter>} A promise that resolves to the Newsletter object with the given id.
 */
export const getOneUserEmail = async (id: string) => {
    const newsletter = await Newsletter.findById(id);
    return newsletter;
};


/**
 * Retrieves a single user's email from the newsletter database by its email address.
 *
 * @param {string} email - The email address of the Newsletter object to be retrieved.
 * @returns {Promise<Newsletter>} A promise that resolves to the Newsletter object with the given email address.
 */
export const getOneUserByEmail = async (email: string) => {
    const newsletter = await Newsletter.findOne({
        user_email: email
    });
    return newsletter;
};


/**
 * Removes a user's email from the newsletter database by its id.
 *
 * @param {string} id - The id of the Newsletter object to be removed.
 * @returns {Promise<Newsletter>} A promise that resolves to the Newsletter object that was removed.
 */
export const removeUserEmail = async (id: string) => {
    const newsletter = await Newsletter.findByIdAndDelete(id);
    return newsletter;
};