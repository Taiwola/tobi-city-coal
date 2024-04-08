"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserEmail = exports.getOneUserByEmail = exports.getOneUserEmail = exports.getAllUserEmail = exports.addUserEmail = void 0;
const newsletter_model_1 = __importDefault(require("../model/newsletter.model"));
/**
 * Adds a new user's email to the newsletter database.
 *
 * @param {string} user_email - The email address of the user to be added.
 * @returns {Promise<Newsletter>} A promise that resolves to the newly created Newsletter object.
 */
const addUserEmail = (user_email, user_firstname, user_lastname, user_contact_number) => __awaiter(void 0, void 0, void 0, function* () {
    const newsletter = yield newsletter_model_1.default.create({
        user_email: user_email,
        user_contact_number: user_contact_number,
        user_firstname: user_firstname,
        user_lastname: user_lastname
    });
    return newsletter;
});
exports.addUserEmail = addUserEmail;
/**
 * Retrieves all user emails from the newsletter database.
 *
 * @returns {Promise<Newsletter[]>} A promise that resolves to an array of Newsletter objects.
 */
const getAllUserEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    const newsletter = yield newsletter_model_1.default.find();
    return newsletter;
});
exports.getAllUserEmail = getAllUserEmail;
/**
 * Retrieves a single user's email from the newsletter database by its id.
 *
 * @param {string} id - The id of the Newsletter object to be retrieved.
 * @returns {Promise<Newsletter>} A promise that resolves to the Newsletter object with the given id.
 */
const getOneUserEmail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const newsletter = yield newsletter_model_1.default.findById(id);
    return newsletter;
});
exports.getOneUserEmail = getOneUserEmail;
/**
 * Retrieves a single user's email from the newsletter database by its email address.
 *
 * @param {string} email - The email address of the Newsletter object to be retrieved.
 * @returns {Promise<Newsletter>} A promise that resolves to the Newsletter object with the given email address.
 */
const getOneUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const newsletter = yield newsletter_model_1.default.findOne({
        user_email: email
    });
    return newsletter;
});
exports.getOneUserByEmail = getOneUserByEmail;
/**
 * Removes a user's email from the newsletter database by its id.
 *
 * @param {string} id - The id of the Newsletter object to be removed.
 * @returns {Promise<Newsletter>} A promise that resolves to the Newsletter object that was removed.
 */
const removeUserEmail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const newsletter = yield newsletter_model_1.default.findByIdAndDelete(id);
    return newsletter;
});
exports.removeUserEmail = removeUserEmail;
