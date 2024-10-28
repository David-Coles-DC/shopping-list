import { NextResponse } from "next/server";
import pool from "@/lib/mysql";

export async function POST(request:  Request) {
    const data = await request.json();
    const user_id: number = data.user_id;
    const name: string = data.name;
    const email: string = data.email;
    const password: string = data.password;

    if (user_id === 0) {
        try {
            const db = await pool.getConnection();
            const sql = 'SELECT user_id FROM user WHERE email = ?';
            const checkIfUserExists = await db.execute(sql, [email]);
            db.release();

            if (checkIfUserExists[0].length > 0) {
                return NextResponse.json({
                    name: name,
                    email: email,
                    password: password,
                    message: 'User already exists'
                }, { status: 409 })
            }

            const sql2 = 'INSERT INTO user (name, email, password) VALUES(?, ?, ?)';
            const addUser = await db.execute(sql2, [name, email, password]);
            const updated_user_id = addUser[0].insertId;
            db.release();

            return NextResponse.json({
                updated_user_id: updated_user_id
            }, { status: 201 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({
                error: error
            }, { status: 500 })
        }
    } else {
        try {
            const db = await pool.getConnection();
            const sql = 'UPDATE user SET name = ?, email = ?, password = ?';
            await db.execute(sql, [name, email, password]);
            db.release();

            return NextResponse.json(user_id);
        } catch (error) {
            return NextResponse.json({
                error: error
            }, { status: 500 })
        }
    }
}