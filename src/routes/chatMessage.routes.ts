import express, { Router } from "express"
import ChatMessageController from "../controllers/chatMessage.controller.ts";

class ChatMessageRoutes {
    public router: Router;
    private controller: ChatMessageController = new ChatMessageController();


    constructor() {
        this.router = express.Router();
        this.chatMessageRoutes();
    }

    chatMessageRoutes() {
        this.router.get("/chat-inbox/:userId", this.controller.getChatInboxByUserId)
        this.router.post("/conversation/:userId", this.controller.sendMessageToAdmin)
        this.router.post("/conversation/admin/:userId", this.controller.sendMessageToUser)
        this.router.put("/conversation/:chatInboxId", this.controller.editMessage)
        this.router.delete("/conversation/:messageId", this.controller.deleteMessage)
        this.router.delete("/chat-inbox/:userId", this.controller.deleteUserChatInbox)
        
    }



}


export default ChatMessageRoutes;