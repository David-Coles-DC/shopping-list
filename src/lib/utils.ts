import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {UniqueIdentifier} from "@dnd-kit/core";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getUserId() : number {
    if (typeof window !== "undefined") {
        return (localStorage.getItem('user_id') !== null ? Number.parseInt('0' + localStorage.getItem('user_id')) : 0);
    }
    return 0;
}

export function setUserId(userId: string) {
    if (typeof window !== "undefined") {
        localStorage.setItem('user_id', userId);
    }
}

export function getBudgetAmount() : number {
    if (typeof window !== "undefined") {
        return (localStorage.getItem('budget_amount') !== null ? Number.parseInt('0' + localStorage.getItem('budget_amount')) : 0);
    }
    return 0;
}

export function updateBudgetAmount(budget_amount: string) {
    if (typeof window !== "undefined") {
        localStorage.setItem('budget_amount', budget_amount);
    }
}

export async function updateShoppingItem(shoppingItemId: Number, updateField: string, updateValue: any) {
    const user_id: Number = getUserId();

    const body: string = JSON.stringify({
        user_id: user_id,
        shoppingItemId: shoppingItemId,
        update_field: updateField,
        update_value: updateValue
    });

    const response = await fetch('http://localhost:3000/api/shopping-list/update', {
        cache: 'no-store',
        method: 'POST',
        body: body
    });

    return response.json();
}

export async function reorderShoppingItem(sequenceFrom: UniqueIdentifier, sequenceTo: UniqueIdentifier | undefined) {
    const user_id: Number = getUserId();

    const body: string = JSON.stringify({
        user_id: user_id,
        sequenceFrom: sequenceFrom,
        sequenceTo: sequenceTo
    });

    const response = await fetch('http://localhost:3000/api/shopping-list/swap', {
        cache: 'no-store',
        method: 'POST',
        body: body
    });

    return response.json();
}