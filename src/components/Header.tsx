import React from 'react';
import { cn, getBasePath } from '@/lib/utils';

export function Header() {
    return (
        <header className="w-full">
            {/* US Gov Banner */}
            <div className="h-6 bg-parchment-500/10 text-stone-700 text-[11px] tracking-wide flex items-center justify-center px-4 sm:px-6 lg:px-8 gap-1.5">
                <img src={getBasePath("/usa-flag.svg")} alt="US Flag" className="h-3" />
                <span>Official website of the U.S. government</span>
            </div>

            {/* Navbar */}
            <div className="h-16 border-b border-parchment-250 bg-parchment-100 flex items-center px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <a href={getBasePath("/")} className="flex items-center">
                        <img
                            src={getBasePath("/fpi-logo.svg")}
                            alt="Federal Program Inventory"
                            className="h-6 w-auto"
                        />
                    </a>
                </div>
                <nav className="ml-auto flex items-center gap-6">
                    {/* Placeholder nav items */}
                    <a href={getBasePath("/")} className="text-sm font-medium hover:underline underline-offset-4">Discover</a>
                </nav>
            </div>
        </header>
    );
}
