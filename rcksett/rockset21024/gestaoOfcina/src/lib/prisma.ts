import { PrismaClient } from '@prisma/client';
import {z} from "zod"

export const prisma = new PrismaClient();
export const zod = z