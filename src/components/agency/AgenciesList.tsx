import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Agency {
    id: number;
    name: string;
    slug: string;
    program_count: number;
    program_count_rollup: number;
    parent_id: number;
}

interface AgenciesListProps {
    agencies: Agency[];
}

export function AgenciesList({ agencies }: AgenciesListProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAgencies = useMemo(() => {
        if (!searchQuery) return agencies;

        const lowerQuery = searchQuery.toLowerCase();
        return agencies.filter(agency =>
            agency.name.toLowerCase().includes(lowerQuery)
        );
    }, [agencies, searchQuery]);

    // Sort by name
    const sortedAgencies = useMemo(() => {
        return [...filteredAgencies].sort((a, b) => a.name.localeCompare(b.name));
    }, [filteredAgencies]);

    return (
        <div className="space-y-8">
            {/* Search Section */}
            <div className="max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl font-serif font-medium text-center text-foreground">
                    Federal Agencies
                </h1>
                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                    <Input
                        type="search"
                        placeholder="Search agencies..."
                        className="pl-10 h-12 text-lg bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                    Showing {sortedAgencies.length} agencies
                </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedAgencies.map((agency) => (
                    <a
                        key={agency.id}
                        href={`/?q=${encodeURIComponent(agency.name)}`}
                        className="block group h-full"
                    >
                        <Card className="h-full hover:shadow-md transition-shadow duration-200 bg-white border-border group-hover:border-primary/50">
                            <CardHeader>
                                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                                    {agency.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">{agency.program_count_rollup}</span> programs
                                </div>
                            </CardContent>
                        </Card>
                    </a>
                ))}
            </div>

            {sortedAgencies.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No agencies found matching your search.
                </div>
            )}
        </div>
    );
}
