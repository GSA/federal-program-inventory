import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Obligation {
    fiscal_year: number;
    sam_estimate?: number | null;
    sam_actual?: number | null;
    usa_spending_actual?: number | null;
}

interface Outlay {
    x: string;
    outlay: number;
    obligation: number;
}

interface ProgramSpendingProps {
    obligations: Obligation[];
    outlays?: Outlay[];
}

export function ProgramSpending({ obligations, outlays = [] }: ProgramSpendingProps) {
    const [view, setView] = useState<"obligations" | "outlays">("obligations");

    // Process data for the chart
    const chartData = view === "obligations"
        ? obligations
            .filter(o => o.fiscal_year >= 2023 && o.fiscal_year <= 2025)
            .map(o => ({
                year: o.fiscal_year.toString(),
                sam: o.sam_actual || 0,
                usaspending: o.usa_spending_actual || 0
            }))
            .sort((a, b) => parseInt(a.year) - parseInt(b.year))
        : outlays
            .filter(o => parseInt(o.x) >= 2023 && parseInt(o.x) <= 2025)
            .map(o => ({
                year: o.x,
                usaspending: o.outlay || 0
            }))
            .sort((a, b) => parseInt(a.year) - parseInt(b.year));

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: "compact",
            maximumFractionDigits: 1
        }).format(value);
    };

    const formatFullCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <h2 className="text-2xl font-serif font-medium text-foreground">Program expenditures, by FY (2023 - 2025)</h2>
                <p className="text-lg text-foreground">
                    This chart shows {view} for the program by fiscal year. All data for this chart was provided by the administering agency and sourced from SAM.gov, USASpending.gov, and Treasury.gov.
                </p>
                <p className="text-lg text-foreground">
                    For more information on each of these data sources, please see the <a href="/about-data" className="text-blue-600 hover:underline">About the data page</a>.
                </p>

                <div className="flex items-center space-x-6 pt-4">
                    <span className="text-xl font-medium">View:</span>
                    <RadioGroup defaultValue="obligations" value={view} onValueChange={(v: "obligations" | "outlays") => setView(v)} className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="obligations" id="obligations" className="h-6 w-6 border-2 border-blue-600 text-blue-600" />
                            <Label htmlFor="obligations" className="text-lg font-normal cursor-pointer">Program obligations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="outlays" id="outlays" className="h-6 w-6 border-2 border-blue-600 text-blue-600" />
                            <Label htmlFor="outlays" className="text-lg font-normal cursor-pointer">Program outlays</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Chart Section */}
                <Card className="border-none shadow-none bg-transparent">
                    <CardContent className="p-0">
                        <div className="h-[400px] w-full max-w-4xl">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="year"
                                        tick={{ fontSize: 14 }}
                                        tickLine={false}
                                        axisLine={true}
                                    />
                                    <YAxis
                                        tickFormatter={formatCurrency}
                                        tick={{ fontSize: 14 }}
                                        tickLine={false}
                                        axisLine={true}
                                    />
                                    <Tooltip
                                        formatter={(value: number, name: string) => [
                                            formatFullCurrency(value),
                                            name === 'sam' ? 'SAM.gov' : 'USASpending.gov'
                                        ]}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="square"
                                        formatter={(value) => <span className="text-lg font-medium ml-2">{value === 'sam' ? 'SAM.gov' : 'USASpending.gov'}</span>}
                                    />
                                    {view === "obligations" && (
                                        <Bar dataKey="sam" name="sam" fill="#F9983F" radius={[0, 0, 0, 0]} barSize={60} />
                                    )}
                                    <Bar dataKey="usaspending" name="usaspending" fill="#185F82" radius={[0, 0, 0, 0]} barSize={60} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
