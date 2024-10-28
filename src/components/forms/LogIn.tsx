"use client";

import Link from 'next/link';

import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { redirect } from "next/navigation";
import { getUserId, setUserId } from '@/lib/utils';
import React, {useState} from "react";
import { logInUser } from "@/app/data/actions/auth-actions";
import { ZodErrors } from "@/components/forms/ZodErrors";

const INITIAL_STATE = {
    data: null,
    message: null,
    zodErrors: null,
}

export default function LogInForm() {
    const [ formState, formAction ] = React.useActionState(logInUser, INITIAL_STATE);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const user_id = getUserId();

    let emailError = null;
    let passwordError = null;

    if (user_id > 0) redirect('/shopping-list');

    if (formState.message === "User doesn't exist") {
        emailError = formState.message;
    }

    if (formState.message === 'Password is incorrect') {
        passwordError = formState.message;
    }

    if (formState.user_id > 0) {
        setUserId(formState.user_id);
        redirect('/shopping-list');
    }

    const handleEmailChange = (e: any) => {
        const value = e.target.value;
        setEmail(value);
    };

    const handlePasswordChange = (e: any) => {
        const value = e.target.value;
        setPassword(value);
    };

    return (
        <div className={'w-full max-w-md'}>
            <form action={formAction}>
                <Card>
                    <CardHeader className={'space-y-1'}>
                        <CardTitle className={'text-3xl font-bold'}>Log In</CardTitle>
                        <CardDescription>
                            Enter your details to sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={'space-y-4'}>
                        <div className={'space-y-2'}>
                            <Label htmlFor={'email'}>Email</Label>
                            <Input
                                id={'email'}
                                name={'email'}
                                type={'email'}
                                placeholder={'Your email'}
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <ZodErrors error={formState?.zodErrors?.email} />
                            <ZodErrors error={[emailError]} />
                        </div>
                        <div className={'space-y-2'}>
                            <Label htmlFor={'password'}>Password</Label>
                            <Input
                                id={'password'}
                                name={'password'}
                                type={'password'}
                                placeholder={'Your password'}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <ZodErrors error={formState?.zodErrors?.password} />
                            <ZodErrors error={[passwordError]} />
                        </div>
                    </CardContent>
                    <CardFooter className={'flex flex-col'}>
                        <Button className={'w-full'}>Log In</Button>
                    </CardFooter>
                </Card>
                <div className={'mt-4 text-center text-sm'}>
                    Don&#39;t have an account?
                    <Link className={'underline ml-2'} href={'/sign-up'}>
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
}