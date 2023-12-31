import express, { Router } from "express";
import UserController from "../controllers/user.controller.ts";

class UserRoutes {
    public router: Router;
    private controller: UserController;

    constructor() {
        this.router = express.Router()
        this.controller = new UserController();
        this.userRoutes();
    }

    userRoutes() {
        this.router.get("/users", this.controller.getUsers)
        this.router.post("/auth/register", this.controller.register)
        this.router.delete("/user/:userId", this.controller.deleteUser)
    }
}

export default UserRoutes;