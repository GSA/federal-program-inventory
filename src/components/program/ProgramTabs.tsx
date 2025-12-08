import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgramOverview } from './ProgramOverview';
import { ProgramSpending } from './ProgramSpending';
import { ProgramResults } from './ProgramResults';
import { ProgramPolicies } from './ProgramPolicies';
import { ProgramOversight } from './ProgramOversight';

interface Obligation {
    fiscal_year: number;
    sam_estimate?: number | null;
    sam_actual?: number | null;
    usa_spending_actual?: number | null;
}

interface ProgramTabsProps {
    objective: string;
    obligations: Obligation[];
    categories: string[];
}

export function ProgramTabs({ objective, obligations, categories }: ProgramTabsProps) {
    return (
        <Tabs defaultValue="overview" className="w-full">
            <div className="relative mb-8">
                <div className="absolute bottom-0 left-0 w-full h-px bg-parchment-300" />
                <div className="overflow-x-auto relative z-10">
                    <TabsList className="h-auto p-0 bg-transparent min-w-max flex justify-start">
                        <TabsTrigger
                            value="overview"
                            className="cursor-pointer rounded-none border-b-2 border-transparent px-[10px] h-12 flex items-center justify-center text-sm font-normal text-muted-foreground hover:text-foreground hover:border-black data-[state=active]:border-black data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="spending"
                            className="cursor-pointer rounded-none border-b-2 border-transparent px-[10px] h-12 flex items-center justify-center text-sm font-normal text-muted-foreground hover:text-foreground hover:border-black data-[state=active]:border-black data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent"
                        >
                            Spending
                        </TabsTrigger>
                        <TabsTrigger
                            value="results"
                            className="cursor-pointer rounded-none border-b-2 border-transparent px-[10px] h-12 flex items-center justify-center text-sm font-normal text-muted-foreground hover:text-foreground hover:border-black data-[state=active]:border-black data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent"
                        >
                            Results
                        </TabsTrigger>
                        <TabsTrigger
                            value="policies"
                            className="cursor-pointer rounded-none border-b-2 border-transparent px-[10px] h-12 flex items-center justify-center text-sm font-normal text-muted-foreground hover:text-foreground hover:border-black data-[state=active]:border-black data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent"
                        >
                            Policies
                        </TabsTrigger>
                        <TabsTrigger
                            value="oversight"
                            className="cursor-pointer rounded-none border-b-2 border-transparent px-[10px] h-12 flex items-center justify-center text-sm font-normal text-muted-foreground hover:text-foreground hover:border-black data-[state=active]:border-black data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent"
                        >
                            Oversight
                        </TabsTrigger>
                    </TabsList>
                </div>
            </div>

            <TabsContent value="overview" className="mt-0">
                <ProgramOverview
                    objective={objective}
                    obligations={obligations}
                    categories={categories}
                />
            </TabsContent>
            <TabsContent value="spending" className="mt-0">
                <ProgramSpending obligations={obligations} />
            </TabsContent>
            <TabsContent value="results" className="mt-0">
                <ProgramResults />
            </TabsContent>
            <TabsContent value="policies" className="mt-0">
                <ProgramPolicies />
            </TabsContent>
            <TabsContent value="oversight" className="mt-0">
                <ProgramOversight />
            </TabsContent>
        </Tabs>
    );
}
