import { ReactNode } from "react";

export default function AuthLayout({ children }: {
    readonly children: ReactNode
}) {
    return (
        <div className={'h-full'}>
            { children }
        </div>
    );
}