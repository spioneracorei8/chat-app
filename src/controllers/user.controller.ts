import userSevice from "../services/user.service"
import { Request, Response } from "express";
import { IUser, IRegisterResponse } from "../models/user.model";
class UserController {

    constructor() {
    }

    async getUsers(req: Request, res: Response): Promise<Response> {
        try {
            const usersData = await userSevice.getUsers()
            return res.status(200).json(usersData);
        } catch (error) {
            console.log(error);
            return res.json(500).json({
                "error": error,
                "error message": "An error occurred while fetching data"
            })
        }
    }


    async register(req: Request, res: Response): Promise<Response> {
        try {
            const newUserData: IUser = req.body;

            // Validate each field user must fill in information
            const requiredFields: (keyof IUser)[] = ['name', 'username', 'email', 'password'];
            const missingFields: string[] = [];
            for (const field of requiredFields) {
                if (requiredFields.includes(field) && newUserData[field] === undefined) {
                    missingFields.push(field)
                }
            }
            if (missingFields.length > 0) {
                return res.status(400).json({
                    "message": `Missing required field(s) ${missingFields.join(", ")} infomation.`
                });
            };

            // Validate length of name and username
            const regexpName = new RegExp(/^[a-zA-Z0-9-_.].{5,9}$/);
            if (!regexpName.test(newUserData.name)) {
                return res.status(400).json({
                    "message": `name required at least 6 characters and not more than 10 characters`
                })
            }
            const regexpUsername = new RegExp(/^[a-zA-Z0-9-_.].{7,11}$/);
            if (!regexpUsername.test(newUserData.username)) {
                return res.status(400).json({
                    "message": `username required at least 8 characters and not more than 12 characters`
                })
            }

            // Validate email
            const regexpValidateEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            if (!regexpValidateEmail.test(newUserData.email)) {
                return res.status(400).json({
                    "message": `Invalid email address type.`,
                })
            }

            // Validate password must have 10 characters and contain numbers and letters
            const regexpValidatePassword = new RegExp(/^(?=.*\d)(?=.*[a-z]).{9,}$/)
            if (!regexpValidatePassword.test(newUserData.password)) {
                return res.status(400).json({
                    "message": `password required at least 10 characters`
                })
            }

            const response: IRegisterResponse = await userSevice.register(newUserData);

            return res.status(response.statusCode).json({
                "message": response.message,
                "error": response.error,
            })

        } catch (error) {
            return res.json(500).json({
                "controller error": error,
                "message": "An error occurred while inserting data"
            })
        }
    }
}


export default UserController