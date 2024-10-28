import { NextResponse } from "next/server";
import pool from "@/lib/mysql";

export async function POST(
    request:  Request
) {
    const data = await request.json();
    const user_id: number = data.user_id;
    const sequenceFrom: string = data.sequenceFrom;
    const sequenceTo: string = data.sequenceTo;

    try {
        const db = await pool.getConnection();

        let sql = 'SELECT shopping_item_id FROM shopping_item WHERE user_id = ? AND sequence = ?';
        let [rows] = await db.execute(sql, [user_id, sequenceFrom]);
        let updatedId = [rows][0].shopping_item_id;

        sql = 'UPDATE shopping_item SET sequence = sequence + CASE WHEN sequence = ? THEN ? - ? WHEN ? > ? AND sequence > ? AND sequence <= ? THEN -1 WHEN ? < ? AND sequence < ? AND sequence >= ? THEN 1 ELSE 0 END WHERE user_id = ?'
        await db.execute(sql, [sequenceFrom, sequenceTo, sequenceFrom, sequenceTo, sequenceFrom, sequenceFrom, sequenceTo, sequenceTo, sequenceFrom, sequenceFrom, sequenceTo, user_id]);

        sql = 'UPDATE shopping_item S, (SELECT shopping_item_id, ROW_NUMBER() OVER () new_sequence FROM shopping_item WHERE user_id = ? ORDER BY sequence) AS R SET S.sequence = R.new_sequence WHERE S.shopping_item_id = R.shopping_item_id';
        await db.execute(sql, [user_id]);

        db.release();

        return NextResponse.json(rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}