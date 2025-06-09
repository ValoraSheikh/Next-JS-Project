
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User.model";
import { Message } from "@/app/User.model";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "usernot found",
        },
        { status: 404 }
      );
    }

    if (!user?.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "user in not accepting messages",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);

    await user.save();

    return Response.json(
      {
        success: true,
        message: "mesasge sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Getting errors in sending messages", error)
    return Response.json(
        {
          success: false,
          message: "Failed to sending messages",
        },
        { status: 500 }
      );
  }
}
