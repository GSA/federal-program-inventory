import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function ProgramPolicies() {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-serif font-medium text-foreground">Policies & Regulations</h2>
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
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                    </svg>
                    <p className="text-lg font-medium text-foreground mb-1">Data Not Available</p>
                    <p>Policy and regulation information is not currently available.</p>
                </CardContent>
            </Card>
        </div>
    );
}
