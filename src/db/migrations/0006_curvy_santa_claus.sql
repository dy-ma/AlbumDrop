CREATE TABLE "share" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" text NOT NULL,
	"org_id" text,
	"created_at" timestamp NOT NULL,
	"album_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "share" ADD CONSTRAINT "share_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "share" ADD CONSTRAINT "share_org_id_organization_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "share" ADD CONSTRAINT "share_album_id_album_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."album"("id") ON DELETE no action ON UPDATE no action;