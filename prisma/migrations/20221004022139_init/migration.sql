/*
  Warnings:

  - You are about to drop the `_activityToexcursion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_activityToexcursion" DROP CONSTRAINT "_activityToexcursion_A_fkey";

-- DropForeignKey
ALTER TABLE "_activityToexcursion" DROP CONSTRAINT "_activityToexcursion_B_fkey";

-- DropTable
DROP TABLE "_activityToexcursion";

-- CreateTable
CREATE TABLE "activityOnExcursion" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "excursionId" TEXT NOT NULL,

    CONSTRAINT "activityOnExcursion_pkey" PRIMARY KEY ("activityId","excursionId")
);

-- AddForeignKey
ALTER TABLE "activityOnExcursion" ADD CONSTRAINT "activityOnExcursion_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityOnExcursion" ADD CONSTRAINT "activityOnExcursion_excursionId_fkey" FOREIGN KEY ("excursionId") REFERENCES "excursion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
