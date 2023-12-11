import { ChatMessageModel, IChatMessage, IChatMessageResponse } from "../models/chatMessage.model";
import { IUser, UserModel, IUserResponse } from "../models/user.model"
import mongoose, { Schema } from "mongoose";
class ChatMessageService {
    constructor() {

    }

    async getChatInboxByUserId(userId: mongoose.Types.ObjectId): Promise<IChatMessageResponse> {
        try {
            const userChatInboxData: IChatMessage[] = await ChatMessageModel.find({ userId: userId })
            if (userChatInboxData.length === 0) {
                return {
                    "message": "UserId does not exists or this user never send message to admin.",
                    "statusCode": 404
                }
            }

            return {
                data: userChatInboxData,
                statusCode: 200,
            }
        } catch (error) {
            console.log(error);
            // const errorMessage = (error as Error).message;
            // return res.status(500).json({ "error message": errorMessage });
            return {
                "message": "An error occurred while fetching user chat inbox.",
                "statusCode": 500,
                "error": error,
            }
        }
    }

    async sendMessageToAdmin(newMessageData: IChatMessage, userId: mongoose.Types.ObjectId): Promise<IChatMessageResponse> {
        try {
            const userData: IUser = await UserModel.findById({ _id: userId }) as IUser
            if (userData === null) return { "message": "UserId does not exists", statusCode: 404 }

            newMessageData.userId = userId
            newMessageData.role = "user"
            newMessageData.name = userData.name
            newMessageData.createdAt = new Date();
            newMessageData.updateAt = new Date();

            await ChatMessageModel.create(newMessageData)

            return {
                "message": "User sent message to Admin has been recorded.",
                "statusCode": 200
            }
        } catch (error) {
            console.log(error);
            // const errorMessage = (error as Error).message;
            // return res.status(500).json({ "error message": errorMessage });
            return {
                "message": "An error occurred while sending message to admin.",
                "statusCode": 500,
                "error": error,
            }
        }
    }

    async sendMessageToUser(newMessageData: IChatMessage, userId: mongoose.Types.ObjectId): Promise<IChatMessageResponse> {
        try {
            const userData: IUser = await UserModel.findById({ _id: userId }) as IUser
            if (userData === null) return { "message": "UserId does not exists", statusCode: 404 }

            newMessageData.name = "Admin"
            newMessageData.userId = userId
            newMessageData.role = "admin"
            newMessageData.createdAt = new Date()
            newMessageData.updateAt = new Date()

            await ChatMessageModel.create(newMessageData)

            return {
                "statusCode": 200,
                "message": "Admin sent message to User has been recorded."

            }
        } catch (error) {
            console.log(error);
            return {
                "statusCode": 500,
                "message": "An error occurred while sending message to user.",
                "error": error
            }

        }
    }


    async deleteMessage(messageObjId: mongoose.Types.ObjectId, role: string): Promise<IChatMessageResponse> {
        try {
            const messageData = await ChatMessageModel.findById({_id: messageObjId}) as IChatMessage
            if (messageData.role != role) return {"statusCode": 401, "message": "Something went wrong deleting chat inbox."}
            
            const deletedData = await ChatMessageModel.findByIdAndDelete({ _id: messageObjId })
            if (deletedData === null) return { "statusCode": 404, "message": `MessageId does not exists.` }

            return {
                "statusCode": 200,
                "message": `Message id ${messageObjId} has been deleted successfully.`
            }
        } catch (error) {
            console.log(error);
            return {
                "statusCode": 500,
                "message": "An error occurred while deleting message.",
                "error": error
            }

        }
    }

    async deleteUserChatInbox(userObjId: mongoose.Types.ObjectId): Promise<IChatMessageResponse> {
        try {
            const chatInboxData = await ChatMessageModel.find({ userId: userObjId });
            if (chatInboxData.length === 0) return { "statusCode": 404, "message": `UserId does not exists or this user never send any message.` }

            await ChatMessageModel.deleteMany({ userId: userObjId })

            return {
                "statusCode": 200,
                "message": `Deleted chat inbox in userId ${userObjId} successfully.`
            }
        } catch (error) {
            console.log(error);
            return {
                "statusCode": 500,
                "message": "An error occurred while deleting user chat inbox",
                "error": error
            }

        }
    }

}

const chatMessageService = new ChatMessageService();

export default chatMessageService