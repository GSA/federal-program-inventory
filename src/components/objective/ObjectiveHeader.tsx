import React from 'react';
import { Clock, Goal } from 'lucide-react';

interface ObjectiveHeaderProps {
    title: string;
    description: string;
    updated: string;
    tags: string[];
}

export function ObjectiveHeader({ title, description, updated, tags }: ObjectiveHeaderProps) {
    return (
        <div className="">
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground mb-8">
                <Goal className="w-4 h-4" />
                <span>Government-wide Objective</span>
            </div>

            <h1 className="text-[40px] mb-[10px] leading-[1.15] font-serif text-foreground maxw-content-2">
                {title}
            </h1>

            <div className="flex items-center gap-1 text-xs leading-none text-muted-foreground mt-3 mb-[10px]">
                <Clock className="w-3 h-3" />
                <span className="pt-[1px]">Updated {updated}</span>
            </div>

            <p className="text-sm text-foreground leading-normal maxw-content-5">
                {description}
            </p>

            <div className="flex flex-wrap gap-2 pt-3">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-parchment-200 text-parchment-900"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
