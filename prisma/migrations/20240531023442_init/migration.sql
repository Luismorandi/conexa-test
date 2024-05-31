-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('BASIC', 'ADMIN');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Roles" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_email" ON "Users"("email");

-- CreateIndex
CREATE INDEX "idx_username" ON "Users"("username");

-- CreateIndex
CREATE INDEX "idx_role" ON "Users"("role");

-- CreateIndex
CREATE INDEX "idx_id" ON "Users"("id");
