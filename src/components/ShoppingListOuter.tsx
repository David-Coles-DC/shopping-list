"use client";

import React from "react";
import ShoppingListItem from "@/components/ShoppingListItem";
import ShoppingListSkeleton from "@/components/ShoppingListSkeleton";
import { ShoppingItem } from '@/lib/types';
import { useState, useEffect } from 'react'
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { reorderShoppingItem } from "@/lib/utils";

export default function ShoppingListOuter(props: any) {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [totalCost, setTotalCost] = useState(0);
    const [activeId, setActiveId] = useState(null);
    const body = JSON.stringify({user_id: props.userId});

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function updateShoppingTotalItem(itemTotal: number) {
        const newCost = totalCost + itemTotal;
        setTotalCost(newCost);
        props.updateShoppingTotal(newCost);
    }

    useEffect(() => {
        fetch('http://localhost:3000/api/shopping-list', {
            cache: 'no-store',
            method: 'POST',
            body: body
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
                const itemTotals = data
                    .reduce(function (a: number, b: { completed: { data: number[]; }; price: number; quantity: number; }) {
                        return a + (b.completed.data[0] === 0 ? (b.price * b.quantity) : 0);
                    }, 0)
                setTotalCost(itemTotals);
                props.updateShoppingTotal(itemTotals);
            })
    }, [])

    if (isLoading || data?.length === 0) return <div className={'skeleton_outer'}>
        <ShoppingListSkeleton />
        <ShoppingListSkeleton />
        <ShoppingListSkeleton />
        {!isLoading ? (<div className={'absolute font-bold text-center top-[32px] w-full'}>No shopping items yet</div>) : (<div className={'absolute italic text-center top-[32px] w-full'}>Loading...</div>)}
    </div>

    const onDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    function onDragEnd(event: DragEndEvent) {
        setActiveId(null);
        const { active, over } = event;
        if (active.id === over?.id) {
            return;
        }
        reorderShoppingItem(active.id, over?.id).then(r => {});
        setData((data) => {
            const oldIndex = data?.findIndex((item: any) => item.sequence === active.id);
            const newIndex = data?.findIndex((item: any) => item.sequence === over?.id);
            return arrayMove(data, oldIndex, newIndex);
        });
        setData((data) => {
            for(let item in data) {
                data[item].sequence = item;
            }
            return data
        });
        console.log(data);
    }

    return (
        <div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
            >
                <SortableContext items={data} strategy={verticalListSortingStrategy}>
                    {data?.map((shoppingItem: ShoppingItem) => (
                        <ShoppingListItem
                            completed={shoppingItem.completed.data[0]}
                            itemName={shoppingItem.shopping_item_name}
                            key={shoppingItem.sequence}
                            price={shoppingItem.price}
                            quantity={shoppingItem.quantity}
                            shoppingItemId={shoppingItem.shopping_item_id}
                            sequence={shoppingItem.sequence}
                            updateShoppingTotal={(shoppingItemTotal: number) => updateShoppingTotalItem(shoppingItemTotal)}
                        />
                    ))}
                </SortableContext>
                <DragOverlay>
                    {activeId ? (
                        <div
                            style={{
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                height: "45px",
                                marginTop: "-113px",
                                width: "100%",
                                marginLeft: "calc(-50vw + 314px)",
                            }}
                        ></div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}