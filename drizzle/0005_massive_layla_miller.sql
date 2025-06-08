CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"subscribe_newsletter" boolean NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
