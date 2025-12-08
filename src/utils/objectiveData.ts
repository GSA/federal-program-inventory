import programsData from '../../data/programs.json';

export interface ObjectiveProgram {
    id: string;
    title: string;
    agency: string;
    expenditure: number;
    fiscalYear: number;
}

export interface ObjectiveData {
    id: string;
    title: string;
    description: string;
    updated: string;
    tags: string[];
    programs: ObjectiveProgram[];
    totalExpenditure: number;
}

export function getObjectiveData(id: string): ObjectiveData | null {
    // Mock data for the specific objective requested
    if (id === 'sustain-public-roadway-system') {
        const targetProgramCount = 32;

        // Filter programs that have necessary data
        // Since we don't have obligations in the summary, we'll mock the expenditure
        // and filter by keywords to get relevant programs
        const validPrograms = programsData.filter(p => {
            const title = p.title.toLowerCase();
            return title.includes('road') || title.includes('highway') || title.includes('transportation');
        }).map(p => {
            return {
                id: p.id,
                title: p.title,
                agency: p.agency,
                expenditure: Math.floor(Math.random() * 100000000) + 1000000, // Mock expenditure
                fiscalYear: 2024
            };
        });

        // Sort by expenditure descending to get "interesting" programs, or just take the first 32 valid ones
        // Let's sort by expenditure to have a nice distribution for the bubble chart
        validPrograms.sort((a, b) => b.expenditure - a.expenditure);

        // Take top 32
        const selectedPrograms = validPrograms.slice(0, targetProgramCount);

        const totalExpenditure = selectedPrograms.reduce((sum, p) => sum + p.expenditure, 0);

        return {
            id: 'sustain-public-roadway-system',
            title: 'Sustain Public Roadway System',
            description: 'Construction or maintenance of Public Roadway infrastructure system.',
            updated: 'Jan 2026',
            tags: ['Transportation', 'Ground Transportation'],
            programs: selectedPrograms,
            totalExpenditure
        };
    }

    return null;
}
