CREATE TABLE "apiKey" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"publicKey" text NOT NULL,
	"secretKey" text NOT NULL,
	"displaySecretKey" text NOT NULL,
	"description" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"workspaceId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspaceMember" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"workspaceId" text NOT NULL,
	"role" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "apiKey" ADD CONSTRAINT "apiKey_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaceMember" ADD CONSTRAINT "workspaceMember_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaceMember" ADD CONSTRAINT "workspaceMember_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;