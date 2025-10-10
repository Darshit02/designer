import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

interface UpdateProjectRequest {
  projectId: string;
  shapesData: {
    shapes: Record<string, unknown>;
    tool: string;
    selected: Record<string, unknown>;
    frameCounter: number;
  };
  viewPortData?: {
    scale: number;
    translate: {
      x: number;
      y: number;
    };
  };
}

export async function PATCH(request: NextRequest) {
  try {
    const body: UpdateProjectRequest & {
      userId?: string;
    } = await request.json();

    const { projectId, shapesData, viewPortData, userId } = body;
    if (!projectId || !userId || !shapesData) {
      return NextResponse.json(
        {
          error: "ProjectId , User Id and Shapes data are requied",
        },
        { status: 400 }
      );
    }
    const eventResult = await inngest.send({
      name: "project/autosave.requested",
      data: {
        projectId,
        userId,
        shapesData,
        viewPortData,
      },
    });
    return NextResponse.json({
      success: true,
      message: "Project autosave initiated",
      eventId: eventResult.ids[0],
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
    });
  }
}
