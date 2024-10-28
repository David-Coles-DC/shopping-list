//Create a type for the shopping item
export interface ShoppingItem {
    completed: string[];
    deleted: boolean;
    shopping_item_id: number;
    shopping_item_name: string;
    price: number;
    quantity: number;
    sequence: number;
    user_id: number;
};

//Create a type for the user
export interface UserDetails {
    email: string;
    name: string;
    password: string;
    user_id: number;
};