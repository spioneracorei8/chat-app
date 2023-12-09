import express from "express"
import Database from "./config/database";

class App {
    public app: express.Application;
    private port: number;
    private dbUri: string;
    private database: Database;

    constructor(port: number, dbUri: string) {
        this.app = express();
        this.port = port;
        this.dbUri = dbUri
        this.database = new Database(this.dbUri);
    }

    public async connectToDatabase() {
        await this.database.connect().catch((error) => {
            console.log(error);
        })

    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Chat app listening on the port ${this.port}`);
        })
    }


}

export default App;