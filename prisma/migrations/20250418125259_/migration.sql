-- AlterEnum
ALTER TYPE "likeTypes" ADD VALUE 'wow';

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "body" DROP NOT NULL;
