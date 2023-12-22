-- CreateEnum
CREATE TYPE "role" AS ENUM ('user', 'superadmin');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "organization_name" TEXT NOT NULL,
    "organization_email" TEXT NOT NULL,
    "pic_firstname" TEXT NOT NULL,
    "pic_lastname" TEXT NOT NULL,
    "pic_role_institution" "role" NOT NULL,
    "password" TEXT NOT NULL,
    "isPremium" BOOLEAN NOT NULL,
    "premium_limit_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "polution" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,
    "polution" TEXT NOT NULL,
    "timeId" INTEGER NOT NULL,

    CONSTRAINT "polution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "cityName" TEXT NOT NULL,
    "cityLat" TEXT NOT NULL,
    "cityLon" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "healthCost" (
    "id" SERIAL NOT NULL,
    "caseRespiratory" INTEGER NOT NULL,
    "costverifRespiratory" BIGINT NOT NULL,
    "dateout" TIMESTAMP(3) NOT NULL,
    "timeId" INTEGER NOT NULL,
    "polutionId" INTEGER NOT NULL,

    CONSTRAINT "healthCost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_organization_email_key" ON "user"("organization_email");

-- AddForeignKey
ALTER TABLE "polution" ADD CONSTRAINT "polution_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "healthCost" ADD CONSTRAINT "healthCost_timeId_fkey" FOREIGN KEY ("timeId") REFERENCES "time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "healthCost" ADD CONSTRAINT "healthCost_polutionId_fkey" FOREIGN KEY ("polutionId") REFERENCES "polution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
