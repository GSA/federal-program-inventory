import React, { useRef, useState, useLayoutEffect } from 'react';
import { Blocks, Settings, User } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow,
} from "@/components/ui/tooltip";

interface SidebarItemProps {
    text: string;
    icon: React.ReactNode;
}

function SidebarItem({ text, icon }: SidebarItemProps) {
    const textRef = useRef<HTMLSpanElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useLayoutEffect(() => {
        const element = textRef.current;
        if (element) {
            setIsTruncated(element.scrollWidth > element.clientWidth);
        }
    }, [text]);

    const content = (
        <div className="h-[36px] px-3 flex items-center gap-3 hover:bg-parchment-200 cursor-default group transition-colors w-full">
            {icon}
            <span ref={textRef} className="text-sm text-muted-foreground group-hover:text-foreground truncate transition-colors block flex-1 text-left">
                {text}
            </span>
        </div>
    );

    if (isTruncated) {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    {content}
                </TooltipTrigger>
                <TooltipContent className="bg-foreground text-background border-none max-w-[300px] break-words">
                    <p>{text}</p>
                    <TooltipArrow className="fill-foreground" />
                </TooltipContent>
            </Tooltip>
        );
    }

    return content;
}

interface ProgramSidebarProps {
    assistanceTypes: string[];
    beneficiaryTypes: string[];
    applicantTypes: string[];
}

export function ProgramSidebar({
    assistanceTypes,
    beneficiaryTypes,
    applicantTypes
}: ProgramSidebarProps) {
    return (
        <TooltipProvider>
            <div className="space-y-8 py-6 max-w-[264px]">
                {/* Program Type */}
                <div className="space-y-3">
                    <h3 className="text-xs font-medium mb-3 pl-2">Program Type</h3>
                    <ul className="space-y-0">
                        {assistanceTypes.map((type, index) => (
                            <li key={index}>
                                <SidebarItem
                                    text={type}
                                    icon={
                                        <Settings className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Beneficiaries */}
                <div className="space-y-3">
                    <h3 className="text-xs font-medium mb-3 pl-2">Beneficiaries</h3>
                    <ul className="space-y-0">
                        {beneficiaryTypes.map((type, index) => (
                            <li key={index}>
                                <SidebarItem
                                    text={type}
                                    icon={
                                        <User className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Applicants */}
                <div className="space-y-3">
                    <h3 className="text-xs font-medium mb-3 pl-2">Applicants</h3>
                    <ul className="space-y-0">
                        {applicantTypes.map((type, index) => (
                            <li key={index}>
                                <SidebarItem
                                    text={type}
                                    icon={
                                        <Blocks className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </TooltipProvider>
    );
}
