import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface Result {
    year: string;
    description: string;
}

interface ProgramResultsProps {
    results?: Result[];
}

export function ProgramResults({ results }: ProgramResultsProps) {
    if (results && results.length > 0) {
        return (
            <div className="space-y-8">
                <h2 className="text-2xl font-serif font-medium text-foreground">Program Results</h2>
                <div className="space-y-8">
                    {results.map((result, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full border-2 border-foreground flex-shrink-0" />
                                <span className="text-3xl font-bold text-foreground">{result.year}</span>
                            </div>
                            <p className="text-base leading-relaxed text-foreground/90 max-w-4xl">
                                {result.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-serif font-medium text-foreground">Program Results</h2>
            <Card className="bg-muted/30 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mb-4 opacity-50"
                    >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M12 18v-6" />
                        <path d="M8 15h8" />
                    </svg>
                    <p className="text-lg font-medium text-foreground mb-1">Data Not Available</p>
                    <p>Performance results data is not currently available for this program.</p>
                </CardContent>
            </Card>
        </div>
    );
}
