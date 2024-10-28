"use client";

import { Button } from '@/components/ui/Button';
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
import { ZodErrors } from '@/components/forms/ZodErrors';
import React, { useState } from 'react';
import { addNewItem } from "@/app/data/actions/new-shopping-item";
import { getUserId } from "@/lib/utils";
import { redirect } from "next/navigation";

const INITIAL_STATE = {
    data: null,
    message: null,
    zodErrors: null,
}

export default function LogInForm() {
    const [formState, formAction] = React.useActionState(addNewItem, INITIAL_STATE);
    const [newShoppingItemName, setNewShoppingItemName] = useState('');
    const [newQuantity, setNewQuantity] = useState(1);
    const [newPrice, setNewPrice] = useState(0);
    const user_id = getUserId();

    const handleShoppingItemNameChange = (e: any) => {
        const value = e.target.value;
        setNewShoppingItemName(value);
    };

    const handleQuantityChange = (e: any) => {
        const value = e.target.valueAsNumber;
        setNewQuantity(value);
    };

    const handlePriceChange = (e: any) => {
        const value = e.target.valueAsNumber;
        setNewPrice(value);
    };

    if (user_id === 0) redirect('/');

    if (formState.data !== null) redirect('/shopping-list');

    return (
        <div className={'w-full max-w-md'}>
            <form action={formAction}>
                <Card>
                    <CardHeader className={'space-y-1'}>
                        <CardTitle className={'text-3xl font-bold'}>Add a shopping item</CardTitle>
                        <CardDescription>
                            Add an item to the shopping list
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={'space-y-4'}>
                        <div className={'space-y-2'}>
                            <input
                                id={'hidden'}
                                name={'user_id'}
                                type={'hidden'}
                                value={user_id}
                            />
                            <Label htmlFor={'shopping_item_name'}>Name</Label>
                            <Input
                                id={'shopping_item_name'}
                                name={'shopping_item_name'}
                                type={'text'}
                                onChange={handleShoppingItemNameChange}
                                placeholder={'Shopping item (e.g Bananas)'}
                                value={newShoppingItemName}
                            />
                            <ZodErrors error={formState?.zodErrors?.shopping_item_name} />
                        </div>
                        <div className={'flex gap-[20px]'}>
                            <div className={'space-y-2'}>
                                <Label htmlFor={'quantity'}>Quantity</Label>
                                <Input
                                    id={'quantity'}
                                    name={'quantity'}
                                    type={'number'}
                                    onChange={handleQuantityChange}
                                    placeholder={'Shopping item (e.g Bananas)'}
                                    value={newQuantity}
                                />
                                <ZodErrors error={formState?.zodErrors?.quantity} />
                            </div>
                            <div className={'space-y-2'}>
                                <Label htmlFor={'price'}>Price</Label>
                                <Input
                                    id={'price'}
                                    name={'price'}
                                    type={'number'}
                                    onChange={handlePriceChange}
                                    placeholder={'The price of the item'}
                                    value={newPrice}
                                />
                                <ZodErrors error={formState?.zodErrors?.price} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className={'gap-[5px] items-baseline justify-end space-y-4'}>
                        <Button className={'w-full'}>
                            <span className="material-symbols-outlined">
                                add
                            </span>
                            Add new item
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}