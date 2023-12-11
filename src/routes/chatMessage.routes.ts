import express, { Router } from "express"
import ChatMessageController from "../controllers/chatMessage.controller.ts";

class ChatMessageRoutes {
    public router: Router;
    private controller: ChatMessageController;


    constructor() {
        this.router = express.Router();
        this.controller = new ChatMessageController();
        this.chatMessageRoutes();
    }

    chatMessageRoutes() {
        this.router.get("/chat-inbox/:userId", this.controller.getChatInboxByUserId)
        this.router.post("/conversation/:userId", this.controller.sendMessageToAdmin)
        this.router.post("/conversation/admin/:userId", this.controller.sendMessageToUser)
        this.router.put("/conversation/:messageId", this.controller.editMessage)
        this.router.delete("/conversation/:messageId", this.controller.deleteMessage)
        this.router.delete("/chat-inbox/:userId", this.controller.deleteUserChatInbox)

    }



}


export default ChatMessageRoutes;