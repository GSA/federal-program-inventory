import React from 'react';
import { getBasePath } from '@/lib/utils';

export function Footer() {
    return (
        <footer className="bg-parchment-100 border-t border-parchment-200 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-4 mb-4">
                            <a href={getBasePath("/")} className="flex items-center">
                                <img src={getBasePath("/fpi-logo.svg")} alt="Federal Program Inventory" className="h-8" />
                            </a>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-md">
                            The Federal Program Inventory is a comprehensive source of information about major federal programs.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif font-medium text-lg mb-4">About</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground hover:underline">About FPI</a></li>
                            <li><a href="#" className="hover:text-foreground hover:underline">Data Sources</a></li>
                            <li><a href="#" className="hover:text-foreground hover:underline">Release Notes</a></li>
                            <li><a href="#" className="hover:text-foreground hover:underline">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-serif font-medium text-lg mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="https://www.whitehouse.gov/omb/management/performance-management/" className="hover:text-foreground hover:underline">Performance.gov</a></li>
                            <li><a href="https://www.usaspending.gov" className="hover:text-foreground hover:underline">USASpending.gov</a></li>
                            <li><a href="https://www.benefits.gov" className="hover:text-foreground hover:underline">Benefits.gov</a></li>
                            <li><a href="https://www.grants.gov" className="hover:text-foreground hover:underline">Grants.gov</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-parchment-200 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="#" className="hover:text-foreground hover:underline">Accessibility</a>
                            <a href="#" className="hover:text-foreground hover:underline">Privacy Policy</a>
                            <a href="#" className="hover:text-foreground hover:underline">Freedom of Information Act</a>
                            <a href="#" className="hover:text-foreground hover:underline">No FEAR Act</a>
                            <a href="#" className="hover:text-foreground hover:underline">Inspector General</a>
                        </div>
                        <p>&copy; {new Date().getFullYear()} Federal Program Inventory</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
