DO $$ BEGIN
 CREATE TYPE "caseColor" AS ENUM('black', 'blue', 'rose');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "CaseFinish" AS ENUM('smooth', 'textured');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "CaseMaterial" AS ENUM('silicone', 'polycarbonate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "orderStatus" AS ENUM('awaiting_shipment', 'shipped', 'delivered');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "phoneModel" AS ENUM('iphoneX', 'iphone11', 'iphone12', 'iphone13', 'iphone14', 'iphone15');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Configuration" (
	"id" text PRIMARY KEY DEFAULT 'd3ca8e51-1df0-4ea0-a691-a7b07135bdd2' NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"imageUrl" text NOT NULL,
	"color" "caseColor",
	"model" "phoneModel",
	"material" "CaseMaterial",
	"finish" "CaseFinish",
	"croppedImageUrl" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Order" (
	"id" serial PRIMARY KEY NOT NULL,
	"configurationId" text NOT NULL,
	"user_Id" text NOT NULL,
	"amount" numeric(7, 2) NOT NULL,
	"isPaid" boolean DEFAULT false NOT NULL,
	"status" "orderStatus" DEFAULT 'awaiting_shipment' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"user_id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_configurationId_Configuration_id_fk" FOREIGN KEY ("configurationId") REFERENCES "Configuration"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_user_Id_User_user_id_fk" FOREIGN KEY ("user_Id") REFERENCES "User"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
