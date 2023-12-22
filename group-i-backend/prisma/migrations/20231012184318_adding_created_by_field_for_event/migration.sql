-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "createdById" INTEGER NOT NULL DEFAULT ((RANDOM() * 4)::integer + 1);
-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
