"use server";

import { z } from "zod";
import BCrypt from "bcrypt";

const schemaSignUp = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address',
    }),
    password: z.string().min(6).max(50, {
        message: 'Password must be between 6 and 50 characters',
    }),
});

export async function signUpNewUser(prevState: any, formData: FormData) {
    const validatedFields = schemaSignUp.safeParse({
        email: formData.get('email') as string,
        name: formData.get('name') as string,
        password: formData.get('password') as string,
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            message: 'Invalid Fields. Sign up failed',
            zodErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const password = (formData.get('password') !== null ? formData.get('password') : '') as string;

    const hashedPassword = await BCrypt.hash(password, 10)

    const body = JSON.stringify({
        user_id: 0,
        email: formData.get('email'),
        name: formData.get('name'),
        password: hashedPassword
    });

    const response = await fetch('http://localhost:3000/api/user', {
        cache: 'no-store',
        method: 'POST',
        body: body
    });

    return response.json();
}

export async function logInUser(prevState: any, formData: FormData) {
    const validatedFields = schemaSignUp.safeParse({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            message: 'Invalid Fields. Log in failed',
            zodErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const password = (formData.get('password') !== null ? formData.get('password') : '') as string;

    const body = JSON.stringify({
        user_id: 0,
        email: formData.get('email'),
        password: password
    });

    const response = await fetch('http://localhost:3000/api/user/login', {
        cache: 'no-store',
        method: 'POST',
        body: body
    });

    return response.json();
}