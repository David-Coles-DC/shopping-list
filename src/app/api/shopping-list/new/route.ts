import { NextResponse } from "next/server";
import pool from "@/lib/mysql";

export async function POST(
    request:  Request
) {
    const data = await request.json();
    console.log(data);
    const user_id: number = data.user_id;
    const shopping_item_name: string = data.shopping_item_name;
    const price: number = data.price;
    const quantity: number = data.quantity;

    try {
        const db = await pool.getConnection();
        let sql = 'INSERT INTO shopping_item(user_id, shopping_item_name, price, quantity, sequence) VALUES(?, ?, ?, ?, 0)';
        const [rows] = await db.execute(sql, [user_id, shopping_item_name, price, quantity]);

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