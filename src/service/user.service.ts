import UserModel from "../model/user.model";

/**
 * Retrieves a single user's email from the User database by its email address.
 *
 * @param {string} email - The email address of the User object to be retrieved.
 * @returns {Promise<User>} A promise that resolves to the User object with the given email address.
 */
export const getOneUserByEmail = async (
  email: string
): Promise<User | null> => {
  return await UserModel.findOne({
    email: email.toLowerCase(),
  });
};

/**
 * Adds a new user's email to the newsletter database.
 *
 * @param {user} user - The user object of the user to be added.
 * @returns {Promise<User>} A promise that resolves to the newly created User object.
 */
export const create = async (user: Omit<User, "id">): Promise<User> => {
  return await UserModel.create(user);
};
