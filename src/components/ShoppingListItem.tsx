import { Button } from '@/components/ui/Button'
import { Seperator } from '@/components/ui/Seperator';
import { updateShoppingItem } from '@/lib/utils';
import { useState } from 'react'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function ShoppingListItem(props: {
    completed: number;
    itemName: string;
    price: number;
    quantity: number;
    sequence: number;
    shoppingItemId: number;
    updateShoppingTotal: any;
}) {
    const [isCompleted, setIsCompleted] = useState(props.completed);
    const [isDeleted, setIsDeleted] = useState(false);
    const [completedButtonDisabled, setCompletedButtonDisabled] = useState(false);
    const [deletedButtonDisabled, setDeletedButtonDisabled] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: props.sequence });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        zIndex: isDragging ? "100" : "auto",
        opacity: isDragging ? 0.3 : 1
    };

    async function handleCompletedClick() {
        setCompletedButtonDisabled(true);
        const data = await updateShoppingItem(props.shoppingItemId, 'completed', isCompleted === 1 ? 0 : 1);
        if (data?.affectedRows > 0) {
            setIsCompleted(isCompleted === 1 ? 0 : 1);
            setCompletedButtonDisabled(false);
        }
    }

    async function handleDisabledClick() {
        setDeletedButtonDisabled(true);
        const data = await updateShoppingItem(props.shoppingItemId, 'deleted', 1);
        if (data?.affectedRows > 0) {
            const newItemTotal = (props.price * props.quantity) * -1;
            props.updateShoppingTotal(newItemTotal);
            setIsDeleted(true);
            setDeletedButtonDisabled(false);
        }
    }

    return <div
        ref={setNodeRef}
        style={style}
        className={`${isDeleted ? 'hidden' : ''}`}
    >
        <div className={`flex gap-[5px] p-1 ${isCompleted === 1 ? 'item_completed' : ''}`}>
            <Button variant={'ghost'} className={'cursor-move px-0'} {...listeners} {...attributes}>
                <span className={'material-symbols-outlined text-gray-400'}>
                    drag_indicator
                </span>
            </Button>
            <div className={'bg-gray-100 flex-none py-[5px] rounded-md text-center w-[40px]'}>{props.quantity}</div>
            <div className={'bg-gray-100 flex-1 px-[15px] py-[5px] rounded-md w-[250px]'}>{props.itemName}</div>
            <div className={'bg-gray-100 flex-none flex justify-between px-[15px] py-[5px] rounded-md w-[90px]'}>
                <div>£</div>
                <div>{Number.parseFloat(props.price + '').toFixed(2)}</div>
            </div>
            <Button disabled={completedButtonDisabled} onClick={handleCompletedClick}>
                <span className={'material-symbols-outlined'}>
                    {isCompleted === 0 ? 'check_circle' : 'unpublished'}
                </span>
            </Button>
            <Button disabled={deletedButtonDisabled} variant={'destructive'} onClick={handleDisabledClick}>
                <span className={'material-symbols-outlined'}>
                    delete
                </span>
            </Button>
        </div>
        <Seperator/>
    </div>
}