import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ObjectiveBubbleChart } from "./ObjectiveBubbleChart";
import { ObjectiveProgramList } from "./ObjectiveProgramList";
import { type ObjectiveProgram } from '../../utils/objectiveData';

interface ObjectiveTabsProps {
    programs: ObjectiveProgram[];
    totalExpenditure: number;
    lastUpdated?: string;
}

export function ObjectiveTabs({ programs, totalExpenditure, lastUpdated }: ObjectiveTabsProps) {
    return (
        <Tabs defaultValue="programs" className="w-full">
            <div className="relative mb-8">
                <div className="absolute bottom-0 left-0 w-full h-px bg-parchment-300"></div>
                <div className="overflow-x-auto relative z-10">
                    <TabsList className="items-center rounded-md text-muted-foreground h-auto p-0 bg-transparent min-w-max flex justify-start">
                        <TabsTrigger
                            value="programs"
                            className="whitespace-nowrap py-1.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-none border-b-2 border-transparent px-[10px] h-12 flex items-center justify-center text-sm font-normal text-muted-foreground hover:text-foreground hover:border-black data-[state=active]:border-black data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent"
                        >
                            Programs
                        </TabsTrigger>
                        <TabsTrigger
                            value="outcomes"
                            className="whitespace-nowrap py-1.5 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-none border-b-2 border-transparent px-[10px] h-12 flex items-center justify-center text-sm font-normal text-muted-foreground hover:text-foreground hover:border-black data-[state=active]:border-black data-[state=active]:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent"
                        >
                            Goals
                        </TabsTrigger>
                    </TabsList>
                </div>
            </div>

            <TabsContent value="programs" className="space-y-12">
                <ObjectiveBubbleChart
                    programs={programs}
                    totalExpenditure={totalExpenditure}
                    lastUpdated={lastUpdated}
                />


                <ObjectiveProgramList
                    programs={programs}
                />
            </TabsContent>

            <TabsContent value="outcomes">
                <div className="py-12 text-center text-muted-foreground">
                    Outcomes content coming soon.
                </div>
            </TabsContent>
        </Tabs>
    );
}
