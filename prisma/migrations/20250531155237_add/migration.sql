/*
  Warnings:

  - Added the required column `authorId` to the `ChapterPart` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ChapterPart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chapterId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ChapterPart_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChapterPart_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ChapterPart" ("chapterId", "content", "createdAt", "id", "order", "updatedAt") SELECT "chapterId", "content", "createdAt", "id", "order", "updatedAt" FROM "ChapterPart";
DROP TABLE "ChapterPart";
ALTER TABLE "new_ChapterPart" RENAME TO "ChapterPart";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
