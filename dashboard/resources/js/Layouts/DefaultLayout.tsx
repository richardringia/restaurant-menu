import { PropsWithChildren, ReactNode } from 'react';

export default function DefaultLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">{children}</div>
        </div>
    );
}
