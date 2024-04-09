"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getOneUserByEmail = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
/**
 * Retrieves a single user's email from the User database by its email address.
 *
 * @param {string} email - The email address of the User object to be retrieved.
 * @returns {Promise<User>} A promise that resolves to the User object with the given email address.
 */
const getOneUserByEmail = async (email) => {
    return await user_model_1.default.findOne({
        email: email.toLowerCase(),
    });
};
exports.getOneUserByEmail = getOneUserByEmail;
/**
 * Adds a new user's email to the newsletter database.
 *
 * @param {user} user - The user object of the user to be added.
 * @returns {Promise<User>} A promise that resolves to the newly created User object.
 */
const create = async (user) => {
    return await user_model_1.default.create(user);
};
exports.create = create;
//# sourceMappingURL=user.service.js.map