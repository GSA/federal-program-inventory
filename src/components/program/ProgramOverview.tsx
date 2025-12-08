import React from 'react';
import { ArrowRight, Goal, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBasePath } from '@/lib/utils';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface Obligation {
    fiscal_year: number;
    sam_estimate: number | null;
    sam_actual: number | null;
    usa_spending_actual: number | null;
}

interface ProgramOverviewProps {
    objective: string;
    obligations: Obligation[];
    categories?: string[];
}

interface NavigationCardProps {
    title: string;
    count: number;
    Icon: React.ElementType;
    href?: string;
}

function NavigationCard({ title, count, Icon, href = "#" }: NavigationCardProps) {
    return (
        <a href={getBasePath(href)} className="block group">
            <Card className="bg-parchment-100 border border-parchment-250 shadow-none rounded-md group-hover:border-parchment-400 group-hover:bg-parchment-100 transition-all duration-200">
                <CardContent className="p-4 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-base mb-0.5 font-medium group-hover:text-primary transition-colors">{title}</p>
                        <p className="text-xs text-muted-foreground">Targeted by {count} other programs</p>
                    </div>
                    <Icon className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
            </Card>
        </a>
    );
}

export function ProgramOverview({ objective, obligations = [], categories = [] }: ProgramOverviewProps) {
    // Process data for the chart
    // Filter for recent years (e.g., last 3 years + next year)
    const currentYear = new Date().getFullYear();
    const safeObligations = obligations || [];
    const chartData = safeObligations
        .filter(o => o.fiscal_year >= currentYear - 1 && o.fiscal_year <= currentYear + 1)
        .map(o => ({
            year: o.fiscal_year.toString(),
            amount: o.sam_actual || o.sam_estimate || 0,
        }))
        .sort((a, b) => parseInt(a.year) - parseInt(b.year));

    const formatCurrency = (value: number) => {
        if (value >= 1e9) {
            return `$${(value / 1e9).toFixed(2)}B`;
        }
        if (value >= 1e6) {
            return `$${(value / 1e6).toFixed(2)}M`;
        }
        return `$${value.toLocaleString()}`;
    };

    const latestExpenditure = chartData.length > 0 ? chartData[chartData.length - 1] : null;

    return (
        <div className="">
            {/* Summary Section */}
            <section className="space-y-2 mb-9">
                <h2 className="text-2xl font-semibold text-foreground">Overview</h2>
                <p className="text-sm text-foreground leading-normal maxw-content-5">
                    {objective}
                </p>
                {categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {categories.map((category, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-parchment-200 text-parchment-900">
                                {category}
                            </span>
                        ))}
                    </div>
                )}
            </section>

            <div className="border-dashed-custom" />

            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-0 gap-12">
                {/* Purpose Section */}
                <section className="space-y-6 lg:pr-5 lg:col-span-5 relative h-full pb-11">
                    {/* Vertical Divider for Desktop */}
                    <div className="hidden lg:block absolute h-full right-0 top-[2.25px] bottom-0 w-[1px] border-r-dashed-custom" />

                    <div className="flex items-center justify-between mt-5">
                        <h2 className="text-lg text-foreground font-semibold">Purpose</h2>
                        <a href="#" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <span className="underline">View results</span>
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xs font-medium mb-3">Objective</h3>
                            <NavigationCard
                                title="Sustain Public Roadway System"
                                count={32}
                                Icon={Goal}
                                href="/objective/sustain-public-roadway-system/"
                            />
                        </div>

                        <div>
                            <h3 className="text-xs font-medium mb-3">Outcomes</h3>
                            <div className="space-y-2">
                                <NavigationCard
                                    title="Quis autem vel eum iur reprehenderit"
                                    count={12}
                                    Icon={Target}
                                />
                                <NavigationCard
                                    title="Et harum quidem rerum facilis"
                                    count={16}
                                    Icon={Target}
                                />
                                <NavigationCard
                                    title="Et harum quidem rerum facilis"
                                    count={16}
                                    Icon={Target}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Expenditures Section */}
                <section className="flex flex-col space-y-6 lg:pl-5 h-full lg:col-span-7 pb-11">
                    <div className="flex items-center justify-between mt-5">
                        <h2 className="text-lg text-foreground font-semibold">Expenditures</h2>
                        <a href="#" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <span className="underline">View spending</span>
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    <Card className="bg-parchment-150 border-none shadow-none rounded-none flex-1">
                        <CardContent className="p-6 h-full flex flex-col justify-center">
                            <div className="flex flex-col gap-6 w-full">
                                <div className="flex gap-6 items-center">
                                    {/* Stats */}
                                    <div className="w-[232px]">
                                        {latestExpenditure && (
                                            <div className="bg-white px-4 py-5 h-[304px] flex flex-col rounded-sm">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-3 h-3 rounded-full bg-[#FF8060]" />
                                                    <p className="text-sm text-muted-foreground">FY {latestExpenditure.year} Expenditure</p>
                                                </div>
                                                <p className="text-3xl font-bold text-foreground mb-1">{formatCurrency(latestExpenditure.amount)}</p>
                                                <p className="text-[12px] text-muted-foreground">+2.5% from previous year</p>
                                                <div className="bg-white px-4 py-6 rounded-md border border-parchment-250 mt-auto">
                                                    <p className="text-sm text-muted-foreground mb-2">Improper Payment Rate</p>
                                                    <p className="text-3xl font-bold text-foreground">10%</p>
                                                    <div className="w-full bg-stone-100 rounded-full h-2 mt-4">
                                                        <div className="bg-parchment-950 h-2 rounded-l-full" style={{ width: '10%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Chart */}
                                    <div className="flex-1 h-[200px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData}>
                                                <XAxis
                                                    dataKey="year"
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tick={{ fontSize: 12, fill: '#666' }}
                                                />
                                                <Tooltip
                                                    cursor={{ fill: 'transparent' }}
                                                    content={({ active, payload }) => {
                                                        if (active && payload && payload.length) {
                                                            return (
                                                                <div className="bg-white p-2 border rounded shadow-sm text-xs">
                                                                    <p className="font-bold">{payload[0].payload.year}</p>
                                                                    <p>{formatCurrency(payload[0].value as number)}</p>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }}
                                                />
                                                <Bar dataKey="amount" fill="#333" radius={[2, 2, 0, 0]} barSize={40} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                        <p className="text-xs text-center mt-2 text-muted-foreground">Expenditure by Fiscal Year</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </div >
    );
}
