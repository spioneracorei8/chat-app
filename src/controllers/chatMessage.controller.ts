import mongoose, { Schema } from "mongoose";
import chatMessageService from "../services/chatMessage.service";
import { Request, Response } from "express";
import { IChatMessage, IChatMessageResponse } from "../models/chatMessage.model";


class ChatMessageController {

    constructor() { }

    async getChatInboxByUserId(req: Request, res: Response): Promise<Response> {
        const userId: string = req.params.userId
        if (userId.length !== 24) return res.status(400).json({ "message": "userId must have 24 characters and not more 24 characters" })

        const userObjId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(userId);

        try {
            const userChatInboxData: IChatMessageResponse = await chatMessageService.getChatInboxByUserId(userObjId);
            return res.status(userChatInboxData.statusCode).json({
                "data": userChatInboxData.data,
                "message": userChatInboxData.message
            })
        } catch (error) {
            return res.status(500).json({
                "error": error,
                "error message": "An error occurred while fetching user chat inbox."
            })
        }
    }

    async sendMessageToAdmin(req: Request, res: Response): Promise<Response> {
        try {
            const newMessageData: IChatMessage = req.body;
            if (newMessageData.message.length <= 0) return res.status(400).json({ "message": "Message can not blank." })

            const userId: string = req.params.userId
            if (userId.length !== 24) return res.status(400).json({ "message": "userId must have 24 characters and not more 24 characters" })

            const userObjId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(userId);

            const response = await chatMessageService.sendMessageToAdmin(newMessageData, userObjId)


            return res.status(response.statusCode).json({
                "message": response.message,
                "error": response.error

            })
        } catch (error) {
            return res.status(500).json({
                "controller error": error,
                "error message": "An error occurred while sending message to admin."
            })
        }
    }
    async sendMessageToUser() {

    }

    async editMessage() {

    }

    async deleteMessage() {

    }

    async deleteUserChatInbox() {

    }
}

export default ChatMessageController