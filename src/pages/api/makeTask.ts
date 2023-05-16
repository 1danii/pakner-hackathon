// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        await prisma.
        res.status(200).json({ timetable: "te" });
    }
    else {
        res.status(400).json({ error: "Only POST requests allowed" });
    }
}