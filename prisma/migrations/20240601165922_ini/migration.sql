-- CreateTable
CREATE TABLE "Movies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "episode" INTEGER NOT NULL,
    "director" TEXT NOT NULL,
    "opening_crawl" TEXT NOT NULL,
    "producer" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "origin" TEXT NOT NULL,
    "other_details" JSONB NOT NULL,
    "zaga" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);
