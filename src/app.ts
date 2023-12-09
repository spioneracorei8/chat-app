import express, { Request, Response } from "express"
import Database from "./config/database";
import UserRoutes from "./routes/user.routes";
import ChatMessage from "./routes/chatMessage.routes";
class App {
    public app: express.Application;
    private port: number;
    private dbUri: string;
    private database: Database;
    private userRouter: UserRoutes;
    private chatMessageRouter: ChatMessage;

    constructor(port: number, dbUri: string) {
        this.app = express();
        this.port = port;
        this.dbUri = dbUri;
        this.database = new Database(this.dbUri);
        this.userRouter = new UserRoutes();
        this.chatMessageRouter = new ChatMessage();
    }

    public configRoutes() {
        this.app.get("/", (req: Request, res: Response) => {
            return res.send("Hello world!")
        })
        this.app.use("/api", this.userRouter.router)
        this.app.use("/api", this.chatMessageRouter.router)
    }

    public async connectToDatabase() {
        await this.database.connect().catch((error) => {
            console.log(error);
        })

    }


    public async start() {
        await this.app.listen(this.port, () => {
            console.log(`Chat app listening on the port ${this.port}`);
        })
    }


}

export default App;