"use server";

import { z } from "zod";

const schemaSignUp = z.object({
    shopping_item_name: z.string().min(1, {
        message: 'Please enter an item name',
    }),
    quantity: z.coerce.number().int().gte(0, {
        message: 'Please enter a quantity of at least 1',
    }),
    price: z.coerce.number().gte(0, {
        message: 'Please enter a price of at least £0.01',
    }),
});

export async function addNewItem(prevState: any, formData: FormData) {
    const validatedFields = schemaSignUp.safeParse({
        shopping_item_name: formData.get('shopping_item_name') as string,
        quantity: formData.get('quantity') as string,
        price: formData.get('price') as string,
    });

    if (!validatedFields.success) {
        return {
            ...prevState,
            message: 'Invalid Fields. Item add failed',
            zodErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const body = JSON.stringify({
        user_id: formData.get('user_id'),
        shopping_item_name: formData.get('shopping_item_name'),
        quantity: formData.get('quantity'),
        price: formData.get('price')
    });

    console.log('body', body);

    const response = await fetch('http://localhost:3000/api/shopping-list/new', {
        cache: 'no-store',
        method: 'POST',
        body: body
    });

    return response.json();
}