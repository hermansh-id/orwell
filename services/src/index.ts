import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { cors } from '@elysiajs/cors'
import { Workspace, workspaceInput } from "@/routes/workspace";
import betterAuthView from "@/libs/auth/auth-view";



const app = new Elysia()
                .use(swagger())
                .use(cors())
                .all("/api/auth/*", betterAuthView)
                .group("/workspaces", (app) => 
                        app
                          .get("/user/:userId", ({params}) => {
                            return Workspace.getWorkspacesByUserId(params.userId)
                          })
                          .post("/create",({body}) => {
                            return Workspace.createWorkspace(body.name, body.userId)
                          }, {
                            body: workspaceInput
                          })
                          .delete("/:workspaceId", ({params}) => {
                            return Workspace.deleteWorkspace(params.workspaceId)
                          })
                      )
                .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;