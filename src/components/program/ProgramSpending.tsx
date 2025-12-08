import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Obligation {
    fiscal_year: number;
    sam_estimate?: number | null;
    sam_actual?: number | null;
    usa_spending_actual?: number | null;
}

interface ProgramSpendingProps {
    obligations: Obligation[];
}

export function ProgramSpending({ obligations }: ProgramSpendingProps) {
    // Process data for the chart
    const chartData = obligations
        .filter(o => o.fiscal_year >= 2018 && o.fiscal_year <= 2024)
        .map(o => ({
            year: o.fiscal_year.toString(),
            amount: o.usa_spending_actual || o.sam_actual || 0
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
            <h2 className="text-2xl font-serif font-medium text-foreground">Program Spending</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Obligations History (2018-2024)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="year"
                                        tick={{ fontSize: 12 }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        tickFormatter={formatCurrency}
                                        tick={{ fontSize: 12 }}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        formatter={(value: number) => [formatFullCurrency(value), 'Obligation']}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Table Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Detailed Obligations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                                    <tr>
                                        <th className="px-4 py-3 rounded-tl-lg">Fiscal Year</th>
                                        <th className="px-4 py-3 text-right rounded-tr-lg">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {obligations.slice().sort((a, b) => b.fiscal_year - a.fiscal_year).map((obs) => (
                                        <tr key={obs.fiscal_year} className="hover:bg-muted/50 transition-colors">
                                            <td className="px-4 py-3 font-medium">{obs.fiscal_year}</td>
                                            <td className="px-4 py-3 text-right font-mono">
                                                {formatFullCurrency(obs.usa_spending_actual || obs.sam_actual || 0)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
