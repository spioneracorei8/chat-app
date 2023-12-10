import UserService from "../services/user.service"
import { UserModel, IUser } from '../models/user.model';
class UserController {
    service: UserService = new UserService();
    user: IUser;
    constructor() {
        this.user = new UserModel();
    }

    async getUsers(): Promise<void> {
        try {
            const users = await this.user
        } catch (error) {

        }
    }


    async register() {

    }
}


export default UserController