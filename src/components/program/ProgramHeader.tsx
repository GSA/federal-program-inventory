import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ProgramHeaderProps {
    agency: string;
    subAgency: string;
    title: string;
    popularName?: string;
    id: string;
    lastUpdated?: string;
}

export function ProgramHeader({
    agency,
    subAgency,
    title,
    popularName,
    id,
    lastUpdated = "Jan 2026" // Default/mock date as per screenshot
}: ProgramHeaderProps) {
    return (
        <div className="mb-5">
            {/* Breadcrumbs */}
            <nav className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap mb-8">
                <span>{agency}</span>
                <ChevronRight className="h-4 w-4" />
                <span>{subAgency}</span>
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-foreground">Program {id}</span>
            </nav>

            {/* Title Section */}
            <div className="">
                <h1 className="text-[40px] mb-2 leading-[1.15] font-serif text-foreground maxw-content-2">
                    {title}
                </h1>
                {popularName && (
                    <p className="text-xl font-serif italic text-foreground">
                        Known as {popularName}
                    </p>
                )}
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-1.5 text-xs leading-none text-muted-foreground mt-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clock"
                >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="pt-[1px]">Updated {lastUpdated}</span>
            </div>
        </div>
    );
}
