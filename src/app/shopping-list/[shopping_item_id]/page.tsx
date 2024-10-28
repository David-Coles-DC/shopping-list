"use client";

import { redirect } from 'next/navigation';
import { getUserId, setUserId } from '@/lib/utils';
import NewItem from '@/components/forms/NewItem';
import { Button } from "@/components/ui/Button";
import React from "react";

export default function ShoppingListItem() {
    const user_id = getUserId();
    if (user_id === 0) redirect('/');

    return (
        <main className={'relative h-full pt-14'}>
            <Button className={'loginButton'} onClick={() => {
                setUserId(0);
                redirect('/');
            }}>
                Logout
            </Button>
            <div className={'absolute left-1/2 transform -translate-x-1/2'}>
                <div className={'w-full'}>
                    <NewItem />
                </div>
            </div>
        </main>
    );
}