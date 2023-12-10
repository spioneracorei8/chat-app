import { IUser, UserModel, IRegisterResponse } from "../models/user.model"
import bcrypt from "bcrypt"

class UserService {
    constructor() {
    }

    async getUsers(): Promise<IUser[]> {
        try {
            const usersData = await UserModel.find()
            return usersData
        } catch (error) {
            console.log(error);
            throw new Error("Error retrieving users data")
        }
    }

    async register(newUserData: IUser): Promise<IRegisterResponse> {
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
                "message": "An error occurred while inserting data or you forgot ",
                "statusCode": 500,
                "error": error,
            }
        }
    }

}


const userSevice = new UserService();

export default userSevice;