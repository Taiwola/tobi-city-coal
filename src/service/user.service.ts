import User, { UserType } from "../model/user.model";

/**
 * Retrieves a single user's email from the User database by its email address.
 *
 * @param {string} email - The email address of the User object to be retrieved.
 * @returns {Promise<UserType>} A promise that resolves to the User object with the given email address.
 */
export const getOneUserByEmail = async (
  email: string
): Promise<UserType | null> => {
  return await User.findOne({
    email: email,
  });
};

/**
 * Adds a new user's email to the newsletter database.
 *
 * @param {user} user - The user object of the user to be added.
 * @returns {Promise<UserType>} A promise that resolves to the newly created User object.
 */
export const create = async (user: UserType): Promise<UserType> => {
  return await User.create(user);
};
