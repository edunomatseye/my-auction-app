CREATE TABLE IF NOT EXISTS "composite" (
	"id" integer,
	"name" text,
	CONSTRAINT "composite_id_name_unique" UNIQUE("id","name"),
	CONSTRAINT "custom_name" UNIQUE("id","name")
);
