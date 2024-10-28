"use client";

import React, { useState } from "react";
import { redirect } from 'next/navigation'
import Link from 'next/link';
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { signUpNewUser } from '@/app/data/actions/auth-actions';
import { ZodErrors } from '@/components/forms/ZodErrors';
import { getUserId, setUserId } from '@/lib/utils';

const INITIAL_STATE = {
    data: null,
    message: null,
    zodErrors: null,
}

export default function SignUpForm() {
    const [ formState, formAction ] = React.useActionState(signUpNewUser, INITIAL_STATE);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const user_id = getUserId();

    let emailError = null;

    if (user_id > 0) redirect('/shopping-list');

    if (formState.message === 'User already exists') {
        emailError = formState.message;
    }

    if (formState.updated_user_id > 0) {
        setUserId(formState.updated_user_id);
        redirect('/shopping-list');
    }

    const handleNameChange = (e: any) => {
        const value = e.target.value;
        setName(value);
    };

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
                        <CardTitle className={'text-3xl font-bold'}>Sign Up</CardTitle>
                        <CardDescription>
                            Enter your details to create a new account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={'space-y-4'}>
                        <div className={'space-y-2'}>
                            <Label htmlFor={'name'}>Name</Label>
                            <Input
                                id={'name'}
                                name={'name'}
                                type={'text'}
                                placeholder={'Your name'}
                                value={name}
                                onChange={handleNameChange}
                            />
                            <ZodErrors error={formState?.zodErrors?.name} />
                        </div>
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
                                placeholder={'Create a password'}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <ZodErrors error={formState?.zodErrors?.password} />
                        </div>
                    </CardContent>
                    <CardFooter className={'flex flex-col'}>
                        <Button className={'w-full'}>Sign Up</Button>
                    </CardFooter>
                </Card>
                <div className={'mt-4 text-center text-sm'}>
                    Already have an account?
                    <Link className={'underline ml-2'} href={'/log-in'}>
                        Log In
                    </Link>
                </div>
            </form>
        </div>
    );
}