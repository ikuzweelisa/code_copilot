CREATE TABLE "chatDocument" (
	"id" uuid DEFAULT gen_random_uuid(),
	"title" varchar NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
