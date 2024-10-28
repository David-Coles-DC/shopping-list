import { NextResponse } from "next/server";
import pool from "@/lib/mysql";
import BCrypt from "bcrypt";

export async function POST(request:  Request) {
    const data = await request.json();
    const email: string = data.email;
    const password: string = data.password;

    try {
        const db = await pool.getConnection();
        console.log(data);
        const sql = 'SELECT user_id, password FROM user WHERE email = ?';
        const loginUser = await db.execute(sql, [email]);
        const loginUser0 = loginUser[0]
        const user_id = loginUser0[0].user_id;
        const currentPassword = loginUser0[0].password;
        db.release();

        console.log(loginUser[0]);
        console.log(password);
        console.log(currentPassword);

        const compareResult = await BCrypt.compare(password, currentPassword);

        console.log(compareResult);

        if (loginUser0.length === 0) {
            return NextResponse.json({
                message: "User doesn't exist"
            }, { status: 403 })
        }

        if (!compareResult) {
            return NextResponse.json({
                message: 'Password is incorrect'
            }, { status: 403 })
        }

        return NextResponse.json({
            user_id: user_id
        }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}