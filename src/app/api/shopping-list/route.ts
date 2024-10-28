import { NextResponse } from "next/server";
import pool from "@/lib/mysql";

export async function POST(request: Request) {
    const data = await request.json();
    const user_id: number = data.user_id;

    try {
        const db = await pool.getConnection();
        const sql = 'SELECT * FROM shopping_item WHERE user_id = ? AND deleted = false ORDER BY sequence';
        const [rows] = await db.execute(sql, [user_id]);
        db.release();

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}