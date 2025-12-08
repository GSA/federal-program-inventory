import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function ProgramOversight() {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-serif font-medium text-foreground">Oversight & Audits</h2>
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
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                    <p className="text-lg font-medium text-foreground mb-1">Data Not Available</p>
                    <p>Oversight and audit information is not currently available.</p>
                </CardContent>
            </Card>
        </div>
    );
}
