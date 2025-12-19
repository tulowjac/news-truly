import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-serif font-bold text-slate-900">NewsTruly</h1>
                </div>
                {children}
                <div className="mt-8 text-center">
                    <a href="/" className="text-sm text-slate-500 hover:text-slate-800">&larr; Back to Home</a>
                </div>
            </div>
        </div>
    );
}
