import React, { useState, useMemo, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { getBasePath } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface Program {
    id: string;
    name: string;
    agency: string;
    sub_agency: string;
    al_number: string;
    popular_name?: string | null;
    categories?: string[];
    applicant_types?: string[];
}

interface ProgramDiscoveryProps {
    programs: Program[];
}

export function ProgramDiscovery({ programs }: ProgramDiscoveryProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAgency, setSelectedAgency] = useState<string>('all');
    const [selectedApplicantTypes, setSelectedApplicantTypes] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    // Extract unique values for filters
    const agencies = useMemo(() => {
        const unique = new Set(programs.map(p => p.agency).filter(Boolean));
        return Array.from(unique).sort();
    }, [programs]);

    const applicantTypes = useMemo(() => {
        const unique = new Set(programs.flatMap(p => p.applicant_types || []).filter(Boolean));
        return Array.from(unique).sort();
    }, [programs]);

    const categories = useMemo(() => {
        const unique = new Set(programs.flatMap(p => p.categories || []).filter(Boolean));
        return Array.from(unique).sort();
    }, [programs]);

    useEffect(() => {
        // Check for query param 'q' and 'agency' on mount
        const params = new URLSearchParams(window.location.search);
        const q = params.get('q');
        const agency = params.get('agency');

        if (q) setSearchQuery(q);
        if (agency && agencies.includes(agency)) setSelectedAgency(agency);
    }, [agencies]);

    const filteredPrograms = useMemo(() => {
        return programs.filter(program => {
            // Search Query
            if (searchQuery) {
                const lowerQuery = searchQuery.toLowerCase();
                const matchesSearch =
                    program.name.toLowerCase().includes(lowerQuery) ||
                    program.id.toLowerCase().includes(lowerQuery) ||
                    program.agency.toLowerCase().includes(lowerQuery) ||
                    (program.popular_name && program.popular_name.toLowerCase().includes(lowerQuery));

                if (!matchesSearch) return false;
            }

            // Agency Filter
            if (selectedAgency !== 'all' && program.agency !== selectedAgency) {
                return false;
            }

            // Applicant Type Filter (OR logic within filter, AND logic with other filters)
            if (selectedApplicantTypes.length > 0) {
                const hasMatch = program.applicant_types?.some(type => selectedApplicantTypes.includes(type));
                if (!hasMatch) return false;
            }

            // Category Filter
            if (selectedCategories.length > 0) {
                const hasMatch = program.categories?.some(cat => selectedCategories.includes(cat));
                if (!hasMatch) return false;
            }

            return true;
        });
    }, [programs, searchQuery, selectedAgency, selectedApplicantTypes, selectedCategories]);

    const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
    const paginatedPrograms = filteredPrograms.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const toggleApplicantType = (type: string) => {
        setSelectedApplicantTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
        setCurrentPage(1);
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSelectedAgency('all');
        setSelectedApplicantTypes([]);
        setSelectedCategories([]);
        setCurrentPage(1);
    };

    const activeFilterCount = (selectedAgency !== 'all' ? 1 : 0) + selectedApplicantTypes.length + selectedCategories.length;

    return (
        <div className="space-y-8">
            {/* Search Section */}
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-3xl font-serif font-medium text-center text-foreground">
                    Find Federal Programs
                </h1>

                <div className="flex gap-4">
                    <div className="relative flex-1">
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
                            placeholder="Search by keyword, agency, or CFDA number..."
                            className="pl-10 h-12 text-lg bg-white"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="h-12 px-6 gap-2 bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Filter Programs</SheetTitle>
                                <SheetDescription>
                                    Narrow down your search results.
                                </SheetDescription>
                            </SheetHeader>

                            <div className="py-6 space-y-8">
                                {/* Agency Filter */}
                                <div className="space-y-4">
                                    <Label>Agency</Label>
                                    <Select value={selectedAgency} onValueChange={(val) => { setSelectedAgency(val); setCurrentPage(1); }}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Agency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Agencies</SelectItem>
                                            {agencies.map(agency => (
                                                <SelectItem key={agency} value={agency}>{agency}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Applicant Type Filter */}
                                <div className="space-y-4">
                                    <Label>Applicant Type</Label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {applicantTypes.map(type => (
                                            <div key={type} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`app-${type}`}
                                                    checked={selectedApplicantTypes.includes(type)}
                                                    onCheckedChange={() => toggleApplicantType(type)}
                                                />
                                                <label
                                                    htmlFor={`app-${type}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {type}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div className="space-y-4">
                                    <Label>Category</Label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {categories.map(cat => (
                                            <div key={cat} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`cat-${cat}`}
                                                    checked={selectedCategories.includes(cat)}
                                                    onCheckedChange={() => toggleCategory(cat)}
                                                />
                                                <label
                                                    htmlFor={`cat-${cat}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {cat}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button onClick={clearFilters} variant="outline" className="w-full">
                                    Clear All Filters
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Showing {filteredPrograms.length} programs
                </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPrograms.map((program) => (
                    <a key={program.id} href={getBasePath(`/program/${program.id}/`)} className="block group h-full">
                        <Card className="h-full hover:shadow-md transition-shadow duration-200 bg-white border-border group-hover:border-primary/50">
                            <CardHeader>
                                <div className="text-xs text-muted-foreground mb-1">{program.agency}</div>
                                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                                    {program.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    <span className="font-medium text-foreground">ID:</span> {program.al_number}
                                </div>
                                {program.popular_name && (
                                    <div className="text-sm text-muted-foreground mt-1">
                                        <span className="font-medium text-foreground">Also known as:</span> {program.popular_name}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </a>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}

            {filteredPrograms.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No programs found matching your search.
                </div>
            )}
        </div>
    );
}
