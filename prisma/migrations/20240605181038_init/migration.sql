-- CreateTable
CREATE TABLE "Rubrique" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Rubrique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SousRubrique" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rubriqueId" INTEGER NOT NULL,

    CONSTRAINT "SousRubrique_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SousRubrique" ADD CONSTRAINT "SousRubrique_rubriqueId_fkey" FOREIGN KEY ("rubriqueId") REFERENCES "Rubrique"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
