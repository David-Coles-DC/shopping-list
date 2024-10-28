import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import {Seperator} from "@/components/ui/Seperator";
import React from "react";

export default function ShoppingListSkeleton() {
    return <div>
        <div className={'flex gap-[5px] p-1'}>
            <Button disabled variant={'ghost'} className={'cursor-move px-0'}>
                <span className={'material-symbols-outlined text-gray-400'}>
                    drag_indicator
                </span>
            </Button>
            <Skeleton className={'w-[40px] h-[36px] rounded-md'}/>
            <Skeleton className={'w-[250px] h-[36px] rounded-md'}/>
            <Skeleton className={'w-[90px] h-[36px] rounded-md'}/>
            <Button disabled>
                <span className="material-symbols-outlined">
                    check_circle
                </span>
            </Button>
            <Button disabled variant={'destructive'}>
                <span className={'material-symbols-outlined'}>
                    delete
                </span>
            </Button>
        </div>
        <Seperator/>
    </div>
}