-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gym" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "telephone" TEXT,
    "location" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "gym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkIn_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "gym_id" TEXT NOT NULL,

    CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "gym_name_key" ON "gym"("name");

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
