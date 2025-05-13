-- CreateTable
CREATE TABLE "url" (
    "id" SERIAL NOT NULL,
    "Mainurl" TEXT NOT NULL,
    "Suburl" TEXT NOT NULL,
    "Created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "url_pkey" PRIMARY KEY ("id")
);
