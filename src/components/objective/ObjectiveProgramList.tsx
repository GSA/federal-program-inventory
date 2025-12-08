import React, { useState } from 'react';
import { type ObjectiveProgram } from '../../utils/objectiveData';
import { getBasePath } from '@/lib/utils';

interface ObjectiveProgramListProps {
    programs: ObjectiveProgram[];
}

type SortKey = 'title' | 'agency' | 'expenditure';
type SortDirection = 'asc' | 'desc';

export function ObjectiveProgramList({ programs }: ObjectiveProgramListProps) {
    // Sort state
    const [sortKey, setSortKey] = useState<SortKey>('expenditure');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    // Format currency helper
    const formatCurrency = (amount: number) => {
        if (amount >= 1e9) {
            return `$${(amount / 1e9).toFixed(1)}B`;
        }
        if (amount >= 1e6) {
            return `$${(amount / 1e6).toFixed(1)}M`;
        }
        return `$${amount.toLocaleString()}`;
    };

    // Handle sort click
    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('asc'); // Default to asc for new column, except maybe expenditure?
            // Actually, usually text is asc, numbers desc. But let's stick to simple toggle.
            // If user wants default desc for expenditure, we can add logic.
            if (key === 'expenditure') {
                setSortDirection('desc');
            }
        }
    };

    // Sort programs
    const sortedPrograms = [...programs].sort((a, b) => {
        const modifier = sortDirection === 'asc' ? 1 : -1;
        if (sortKey === 'expenditure') {
            return (a.expenditure - b.expenditure) * modifier;
        }
        if (sortKey === 'title') {
            return a.title.localeCompare(b.title) * modifier;
        }
        if (sortKey === 'agency') {
            return a.agency.localeCompare(b.agency) * modifier;
        }
        return 0;
    });

    const totalExpenditure = programs.reduce((sum, p) => sum + p.expenditure, 0);
    // Determine the fiscal year to display in the header (stable, based on largest program or default)
    const displayFiscalYear = programs.reduce((max, p) => p.expenditure > max.expenditure ? p : max, programs[0])?.fiscalYear || 2025;

    // Render sort icon
    const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
        const isActive = sortKey === columnKey;
        // Inactive: Down (rotate-180), parchment-300
        // Active Desc (Default): Down (rotate-180)
        // Active Asc: Up (0deg)

        const color = isActive ? 'text-parchment-900' : 'text-parchment-300';

        // If Active AND Asc -> Up (0deg).
        // Else (Inactive OR Desc) -> Down (rotate-180).
        const finalRotation = (isActive && sortDirection === 'asc') ? '' : 'rotate-180';

        return (
            <svg
                viewBox="0 0 10 10"
                className={`w-3 h-3 fill-current ${color} ${finalRotation} transition-transform duration-200`}
                aria-hidden="true"
            >
                <path d="M5 1 L9 8 L1 8 Z" />
            </svg>
        );
    };

    return (
        <div className="space-y-6 mt-8">
            <h2 className="text-lg font-semibold text-foreground">Related Programs</h2>

            <div className="w-full">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="text-xs text-foreground bg-parchment-100 sticky top-0 z-10">
                        <tr>
                            <th
                                scope="col"
                                className="py-3 pr-4 pl-0 font-medium w-[40%] shadow-[inset_0_-2px_0_0_#1E1B16] cursor-pointer group select-none"
                                onClick={() => handleSort('title')}
                            >
                                <div className="flex items-center gap-2">
                                    Name
                                    <SortIcon columnKey="title" />
                                </div>
                            </th>
                            <th
                                scope="col"
                                className="py-3 px-4 font-medium w-[30%] shadow-[inset_0_-2px_0_0_#1E1B16] cursor-pointer group select-none"
                                onClick={() => handleSort('agency')}
                            >
                                <div className="flex items-center gap-2">
                                    Agency
                                    <SortIcon columnKey="agency" />
                                </div>
                            </th>
                            <th
                                scope="col"
                                className="py-3 pl-4 pr-0 font-medium text-right w-[30%] min-w-[200px] whitespace-nowrap shadow-[inset_0_-2px_0_0_#1E1B16] cursor-pointer group select-none"
                                onClick={() => handleSort('expenditure')}
                            >
                                <div className="flex items-center justify-end gap-2">
                                    FY {displayFiscalYear} Expenditure
                                    <SortIcon columnKey="expenditure" />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPrograms.map((program) => (
                            <tr
                                key={program.id}
                                className="border-b border-parchment-250 hover:bg-parchment-150 cursor-pointer transition-colors bg-transparent"
                                onClick={() => window.location.href = getBasePath(`/program/${program.id}/`)}
                            >
                                <td className="py-3 pr-4 pl-0 font-medium text-foreground">
                                    {program.title}
                                </td>
                                <td className="py-3 px-4 text-muted-foreground">
                                    {program.agency}
                                </td>
                                <td className="py-3 pl-4 pr-0 text-right font-medium text-foreground whitespace-nowrap">
                                    {formatCurrency(program.expenditure)}
                                </td>
                            </tr>
                        ))}

                        {/* Total Row */}
                        <tr className="font-semibold border-t-2 border-parchment-900">
                            <td className="py-3 pr-4 pl-0 text-foreground">Total</td>
                            <td className="py-3 px-4"></td>
                            <td className="py-3 pl-4 pr-0 text-right text-foreground whitespace-nowrap">
                                {formatCurrency(totalExpenditure)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
