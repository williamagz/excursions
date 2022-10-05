-- CreateTable
CREATE TABLE "excursion" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "cost" MONEY NOT NULL,

    CONSTRAINT "excursion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activityType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "activityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "descripton" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "minimunDuration" TEXT NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "cost" MONEY NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activityPictures" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,

    CONSTRAINT "activityPictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_activityToexcursion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "activityType_name_key" ON "activityType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "activity_typeId_key" ON "activity"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "_activityToexcursion_AB_unique" ON "_activityToexcursion"("A", "B");

-- CreateIndex
CREATE INDEX "_activityToexcursion_B_index" ON "_activityToexcursion"("B");

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "activityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activityPictures" ADD CONSTRAINT "activityPictures_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_activityToexcursion" ADD CONSTRAINT "_activityToexcursion_A_fkey" FOREIGN KEY ("A") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_activityToexcursion" ADD CONSTRAINT "_activityToexcursion_B_fkey" FOREIGN KEY ("B") REFERENCES "excursion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
