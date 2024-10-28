import { NextResponse } from "next/server";
import pool from "@/lib/mysql";

export async function POST(
    request:  Request
) {
    const data = await request.json();
    const shopping_item_id = data.shopping_item_id;
    const user_id: number = data.user_id;
    const update_field: string = data.update_field;
    const update_value: string = data.update_value;

    try {
        const db = await pool.getConnection();
        const sql = `UPDATE shopping_item SET ${update_field} = ? WHERE user_id = ? AND shopping_item_id = ?`;
        const [rows] = await db.execute(sql, [update_value, user_id, shopping_item_id]);
        db.release();

        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}