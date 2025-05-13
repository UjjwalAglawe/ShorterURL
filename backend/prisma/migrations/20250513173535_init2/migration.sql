/*
  Warnings:

  - A unique constraint covering the columns `[Suburl]` on the table `url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "url_Suburl_key" ON "url"("Suburl");
