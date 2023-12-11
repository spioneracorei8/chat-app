import mongoose from "mongoose";
import { IUser, UserModel, IUserResponse } from "../models/usermodel"
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
            const errorMessage = (error as Error).message;
            return {
                "message": "An error occurred while fetching users data.",
                "statusCode": 500,
                "error": errorMessage,
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
            const errorMessage = (error as Error).message;
            return {
                "message": "An error occurred while inserting new user data.",
                "statusCode": 500,
                "error": errorMessage,
            }
        }
    }

    async deleteUser(userId: mongoose.Types.ObjectId): Promise<IUserResponse> {
        try {
            const userData = await UserModel.findById({ _id: userId })
            if (userData === null) return { "statusCode": 404, "message": "userId does not exists" }

            await UserModel.findByIdAndDelete({ _id: userId })

            return {
                "statusCode": 200,
                "message": `Deleted user in _id ${userId} successfully.`
            }
        } catch (error) {
            const errorMessage = (error as Error).message;
            return {
                "statusCode": 500,
                "message": "An error occurred while deleting user.",
                "error": errorMessage
            }
        }
    }

}


const userSevice = new UserService();

export default userSevice;