-- CreateTable
CREATE TABLE "Advogados" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "oab" TEXT NOT NULL,
    "tel" TEXT,
    "email" TEXT,
    "officeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Advogados_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clientes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "tel" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "OfficeId" INTEGER NOT NULL,

    CONSTRAINT "Clientes_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentarios" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "processId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Comentarios_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offices" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Offices_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Processos" (
    "id" SERIAL NOT NULL,
    "numberProcess" TEXT NOT NULL,
    "ClientId" INTEGER NOT NULL,
    "AdvogadoId" INTEGER NOT NULL,
    "secret" BOOLEAN NOT NULL,
    "limitTime" DATE NOT NULL,
    "limitTimeDesc" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "Processos_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Advogados_oab_key" ON "Advogados"("oab");

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_cpf_key" ON "Clientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Offices_username_key" ON "Offices"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Processos_numberProcess_key" ON "Processos"("numberProcess");

-- AddForeignKey
ALTER TABLE "Advogados" ADD CONSTRAINT "Advogados_fk0" FOREIGN KEY ("officeId") REFERENCES "Offices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Clientes" ADD CONSTRAINT "Clientes_fk0" FOREIGN KEY ("OfficeId") REFERENCES "Offices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comentarios" ADD CONSTRAINT "Comentarios_fk0" FOREIGN KEY ("processId") REFERENCES "Processos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Processos" ADD CONSTRAINT "Processos_fk0" FOREIGN KEY ("ClientId") REFERENCES "Clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Processos" ADD CONSTRAINT "Processos_fk1" FOREIGN KEY ("AdvogadoId") REFERENCES "Advogados"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
