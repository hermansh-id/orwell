import { db } from "@/database/database";
import { workspace, workspaceMember } from "@/database/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import { t } from "elysia";

abstract class Workspace {
    static async getWorkspacesByUserId(userId: string) {
        const workspaces = await db.select().from(workspace)
                    .leftJoin(workspaceMember, eq(workspaceMember.workspaceId, workspace.id))
                    .where(eq(workspaceMember.userId, userId))
        return Response.json({
            "message": "Workspaces fetched successfully.",
            "data": {
                "workspaces": workspaces
            }
        })
    }

    static async createWorkspace(name: string, userId: string) {
        const now = new Date();
        const workspaceId = await db.insert(workspace).values({
            id: randomUUID(),
            name,
            createdAt: now,
            updatedAt: now
        }).returning({
            id: workspace.id
        });
        const workspaceMemberId = await db.insert(workspaceMember).values({
            id: randomUUID(),
            userId: userId,
            workspaceId: workspaceId[0].id,
            role: "owner",
            createdAt: now,
            updatedAt: now
        });
        
        return Response.json({
            "message": "Workspace created successfully.",
            "data": {
                "workspaceId": workspaceId[0].id
            }
        })
    }

    static async deleteWorkspace(workspaceId: string) {
        await db.delete(workspace).where(eq(workspace.id, workspaceId));
        return Response.json({
            "message": "Workspace deleted successfully.",
            "data": {}
        })
    }
}

const workspaceInput = t.Object({
    name: t.String(),
    userId: t.String()
})

type workspaceInput = typeof workspaceInput.static

export { Workspace, workspaceInput }