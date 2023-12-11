import mongoose from "mongoose";
import chatMessageService from "../services/chatMessage.service";
import { Request, Response } from "express";
import { IChatMessage, IChatMessageResponse } from "../models/chatMessagemodel";

class ChatMessageController {

    constructor() { }

    async getChatInboxByUserId(req: Request, res: Response): Promise<Response> {
        try {
            const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.userId);

            const response: IChatMessageResponse = await chatMessageService.getChatInboxByUserId(userId);

            return res.status(response.statusCode).json({
                "data": response.data,
                "message": response.message,
                "error": response.error
            })
        } catch (error) {
            const errorMessage = (error as Error).message;
            return res.status(500).json({
                "error": errorMessage,
                "error message": "An error occurred while fetching user chat inbox."
            })
        }
    }

    async sendMessageToAdmin(req: Request, res: Response): Promise<Response> {
        try {
            const newMessageData: IChatMessage = req.body;
            if (newMessageData.message.length <= 0) return res.status(400).send("Message can not blank.")

            const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.userId);

            const response: IChatMessageResponse = await chatMessageService.sendMessageToAdmin(newMessageData, userId)

            return res.status(response.statusCode).json({
                "message": response.message,
                "error": response.error
            })
        } catch (error) {
            const errorMessage = (error as Error).message;
            return res.status(500).json({
                "error": errorMessage,
                "error message": "An error occurred while sending message to admin."
            })
        }
    }
    async sendMessageToUser(req: Request, res: Response): Promise<Response> {
        try {
            const newMessageData: IChatMessage = req.body
            if (newMessageData.message.length <= 0) return res.status(400).send("Message can not blank.")

            const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.userId);

            const response: IChatMessageResponse = await chatMessageService.sendMessageToUser(newMessageData, userId)

            return res.status(response.statusCode).json({
                "message": response.message,
                "error": response.error
            })

        } catch (error) {
            const errorMessage = (error as Error).message;
            return res.status(500).json({
                "error message": "An error occurred while sending message to user.",
                "error": errorMessage
            })
        }
    }

    async editMessage(req: Request, res: Response): Promise<Response> {
        try {
            const editMessageData: IChatMessage = req.body;
            if (editMessageData.message.length <= 0) return res.status(400).send(`Message can not blank.`)

            const messageId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.messageId);

            const response: IChatMessageResponse = await chatMessageService.editMessage(messageId, editMessageData);

            return res.status(response.statusCode).json({
                "message": response.message,
                "error": response.error
            })
        } catch (error) {
            const errorMessage = (error as Error).message;
            return res.status(500).json({
                "error message": `An error occurred while editing message.`,
                "error": errorMessage
            })
        }
    }

    async deleteMessage(req: Request, res: Response): Promise<Response> {
        try {
            const role: string = req.query.role as string

            const messageId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.messageId);

            const response: IChatMessageResponse = await chatMessageService.deleteMessage(messageId, role)

            return res.status(response.statusCode).json({
                "message": response.message,
                "error": response.error
            })
        } catch (error) {
            return res.status(500).json({
                "error message": "An error occurred while deleting message.",
                "error": error
            })
        }
    }

    async deleteUserChatInbox(req: Request, res: Response): Promise<Response> {
        try {
            const role = req.query.role as string
            if (role != "admin") return res.status(401).send("Something went wrong deleting chat inbox.")

            const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.userId);

            const response: IChatMessageResponse = await chatMessageService.deleteUserChatInbox(userId)

            return res.status(response.statusCode).json({
                "message": response.message,
                "error": response.error
            })


        } catch (error) {
            const errorMessage = (error as Error).message;
            return res.status(500).json({
                "error message": "An error occured while deleting user chat inbox.",
                "controller error": errorMessage
            })
        }
    }
}

export default ChatMessageController