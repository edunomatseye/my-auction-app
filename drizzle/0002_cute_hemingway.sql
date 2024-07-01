ALTER TABLE "chat_groups" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "chat_groups" DROP COLUMN IF EXISTS "popularity";--> statement-breakpoint
ALTER TABLE "chat_groups" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "chat_groups" DROP COLUMN IF EXISTS "updated_at";