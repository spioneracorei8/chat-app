import { IUser, UserModel, IUserResponse } from "../models/user.model"
import bcrypt from "bcrypt"

class UserService {
    constructor() {
    }

    async getUsers(): Promise<IUserResponse> {
        try {
            const usersData: IUser[] = await UserModel.find()
            return {
                data: usersData,
                statusCode: 200,
            }
        } catch (error) {
            console.log(error);
            // const errorMessage = (error as Error).message;
            // return res.status(500).json({ "error message": errorMessage });
            return {
                "message": "An error occurred while inserting data",
                "statusCode": 500,
                "error": error,
            }
        }
    }

    async register(newUserData: IUser): Promise<IUserResponse> {
        try {
            const salt: string = await bcrypt.genSalt(10)
            newUserData.password = await bcrypt.hash(newUserData.password, salt)
            newUserData.role = "user";
            newUserData.createdAt = new Date();
            newUserData.updatedAt = new Date();
            await UserModel.create(newUserData)
            return {
                "message": `Created new user successfully.`,
                "statusCode": 200,

            }
        } catch (error) {
            console.log(error);
            return {
                "message": "An error occurred while inserting data",
                "statusCode": 500,
                "error": error,
            }
        }
    }

}


const userSevice = new UserService();

export default userSevice;