"use client";

import HeroImage from '/public/images/shopping-list-image.webp'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { redirect } from "next/navigation";
import { getUserId } from '@/lib/utils';

export default function Home() {
    const user_id: number = getUserId();

    if (user_id > 0) redirect('/shopping-list');

    return (
        <div>
            <div className={'hero'}>
                <Image alt={'Shopping List Hero'} priority={true} src={HeroImage}></Image>
                <div className={'hero_buttons'}>
                    <Link href={"/log-in"}><Button>Log In</Button></Link>
                    <Link href={"/sign-up"}><Button>Sign Up</Button></Link>
                </div>
            </div>
            <main className={'container mx-auto py-6'}>
                <div>
                    <h1>Welcome</h1>
                    <p>This is a shopping list app that will help you to add items to your shopping list, add prices for
                        each item, reorder the list and total the list so you can see if you are within budget on your
                        next
                        shop.</p>
                    <p>To start using the app please log in to your account or sign up for a new account below.</p>
                    <p className={'flex gap-[20px]'}>
                        <Link href={"/log-in"}><Button>Log In</Button></Link>
                        <Link href={"/sign-up"}><Button>Sign Up</Button></Link>
                    </p>
                </div>
            </main>
        </div>
    );
}