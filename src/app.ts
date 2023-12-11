import express, { Request, Response } from "express"
import Database from "./config/database.ts";
import UserRoutes from "./routes/user.routes.ts";
import ChatMessageRoutes from "./routes/chatMessage.routes.ts";
class App {
    // declare variable and assign Datatype
    public app: express.Application;
    private port: number;
    private dbUri: string;
    private database: Database;
    private userRouter: UserRoutes;
    private chatMessageRouter: ChatMessageRoutes;

    constructor(port: number, dbUri: string) {
        // Assign value in the variable
        this.app = express();
        this.port = port;
        this.dbUri = dbUri;
        this.database = new Database(this.dbUri);
        this.userRouter = new UserRoutes();
        this.chatMessageRouter = new ChatMessageRoutes();
    }

    // Function ในรูปแบบของการเขียนโปรแกรมแบบ OOP เรียกว่า method
    public configRoutes() {
        this.app.get("/", (req: Request, res: Response): Response => {
            return res.status(200).send("Hello world!")
        })

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        this.app.use("/api", this.userRouter.router)
        this.app.use("/api", this.chatMessageRouter.router)
    }

    public async connectToDatabase() {
        await this.database.connect().catch((error) => console.log(error))
    }

    public async start() {
        await this.app.listen(this.port, () => console.log(`Chat app listening on the port ${this.port}`))
    }

}



export default App;