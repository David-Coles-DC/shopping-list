"use client";

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from '@/components/ui/Card';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/Popover';
import React, { useState } from "react";
import Link from 'next/link';
import ShoppingListOuter from '@/components/ShoppingListOuter';
import { redirect } from "next/navigation";
import {getUserId, getBudgetAmount, updateBudgetAmount, setUserId} from '@/lib/utils';

export default function ShoppingList() {
    const [ shoppingTotal, setShoppingTotal ] = useState(0);
    const [ budgetAmount, setBudgetAmount ] = useState(getBudgetAmount());

    let user_id = getUserId();
    if (user_id === 0) redirect('/');

    const handleBudgetUpdate = (e: any) => {
        const newBudget = e.target.valueAsNumber;
        setBudgetAmount(newBudget);
        updateBudgetAmount(newBudget);
    };

    return <main className={'relative h-full pt-14'}>
        <Button className={'loginButton'} onClick={() => {
            setUserId(0);
            redirect('/');
        }}>
            Logout
        </Button>
        <div className={'absolute left-1/2 transform -translate-x-1/2'}>
            <div className={'w-full'}>
                <Card>
                    <CardHeader className={'space-y-1'}>
                        <div className={'flex justify-between'}>
                            <div>
                                <CardTitle className={'text-3xl font-bold'}>Your shopping list</CardTitle>
                            </div>
                            <Link href={'/shopping-list/0'}>
                                <Button>
                                <span className="material-symbols-outlined">
                                    add
                                </span>
                                    Add new item
                                </Button>
                            </Link>
                        </div>
                        <CardDescription>
                            Items on your shopping list
                        </CardDescription>
                    </CardHeader>
                    <CardContent className={'space-y-4'}>
                        <div>
                            <div className={'flex gap-[5px] p-1'}>
                                <div className={'w-[24px]'}/>
                                <div className={'flex-none italic text-center text-gray-300 text-xs w-[40px]'}>Qty
                                </div>
                                <div
                                    className={'flex-none italic text-center text-gray-300 text-xs w-[250px]'}>Item
                                </div>
                                <div
                                    className={'flex-none italic text-center text-gray-300 text-xs w-[90px]'}>Each
                                </div>
                            </div>
                            <ShoppingListOuter
                                updateShoppingTotal={(shoppingTotal: number) => setShoppingTotal(shoppingTotal)}
                                userId={user_id}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className={'gap-[5px] items-baseline justify-end space-y-4'}>
                        <div className={'flex-none italic text-center text-gray-300 text-xs'}>Budget</div>
                        <div className={'bg-gray-100 flex-none flex justify-between px-[15px] py-[5px] rounded-md w-[90px]'}>
                            <div>£</div>
                            <div>{Number.parseFloat(budgetAmount + '').toFixed(2)}</div>
                        </div>
                        <div className={'mr-[70px]'}>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button className={'relative top-[8px] h-[33px]'}>
                                        <span className={'material-symbols-outlined'}>
                                            edit
                                        </span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className={'w-80'}>
                                    <div className={'grid gap-4'}>
                                        <div className={'space-y-2'}>
                                            <h4 className={'font-medium leading-none'}>Budget</h4>
                                            <p className={'text-sm text-muted-foreground'}>
                                                Set the budget for your shopping.
                                            </p>
                                        </div>
                                        <div className={'grid gap-2'}>
                                            <div className={'grid grid-cols-3 items-center gap-4'}>
                                                <Label htmlFor={'budget'}>Budget</Label>
                                                <Input
                                                    className={'col-span-2 h-8'}
                                                    id={'budget'}
                                                    name={'budget'}
                                                    onChange={handleBudgetUpdate}
                                                    type={'number'}
                                                    value={budgetAmount}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className={'flex-none italic text-right text-gray-300 text-xs'}>Total</div>
                        <div className={'bg-gray-100 flex-none flex justify-between px-[15px] mr-[125px] py-[5px] rounded-md w-[90px]'}>
                            <div>£</div>
                            <div>{shoppingTotal.toFixed(2)}</div>
                        </div>
                    </CardFooter>
                    {(shoppingTotal > budgetAmount) && (budgetAmount > 0) ? <div className={'font-bold italic relative text-center text-red-900 text-xl top-[-93px] w-full'}>Your shop is currently over budget!</div> : null}
                </Card>
            </div>
        </div>
    </main>;
}