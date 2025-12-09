import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react";

interface ProgramOversightProps {
    isSubpartF?: number;
    gaoReports?: any[];
}

export function ProgramOversight({ isSubpartF, gaoReports }: ProgramOversightProps) {
    // If isSubpartF is undefined, we consider data not available for that specific field
    // But if we have either field, we should show the content
    const hasData = isSubpartF !== undefined || (gaoReports && gaoReports.length > 0);

    if (hasData) {
        return (
            <div className="space-y-12">
                {isSubpartF !== undefined && (
                    <div className="space-y-6">
                        <div className="bg-sky-100 p-4 -mx-4 sm:mx-0 sm:rounded-sm">
                            <h2 className="text-xl font-bold text-foreground">Single Audit</h2>
                        </div>

                        <div className="pl-2 space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-foreground">
                                    Single Audit Applies (2 CFR Part 200 Subpart F):
                                </span>
                                {isSubpartF === 1 ? (
                                    <CheckCircle2 className="h-6 w-6 text-green-600 fill-green-100" />
                                ) : (
                                    <XCircle className="h-6 w-6 text-red-600 fill-red-100" />
                                )}
                            </div>

                            <p className="text-lg text-foreground">
                                For additional information on single audit requirements for this program, review the current{' '}
                                <a
                                    href="https://www.whitehouse.gov/omb/office-federal-financial-management/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                                >
                                    Compliance Supplement.
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </p>
                        </div>
                    </div>
                )}

                {gaoReports && gaoReports.length > 0 && (
                    <div className="space-y-6">
                        <div className="bg-sky-100 p-4 -mx-4 sm:mx-0 sm:rounded-sm">
                            <h2 className="text-xl font-bold text-foreground">Program oversight reports</h2>
                        </div>
                        {/* Render GAO reports here if available */}
                        <div className="pl-2">
                            {/* Placeholder for GAO reports list */}
                            <p>Reports listed here...</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

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
