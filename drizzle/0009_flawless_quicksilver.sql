CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"text" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"pulished_date" timestamp DEFAULT now(),
	"image" text
);
