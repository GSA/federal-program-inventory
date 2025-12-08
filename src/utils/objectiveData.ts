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
    const cleanId = id.replace(/\/$/, ''); // Remove trailing slash if present
    console.log(`getObjectiveData called with id: "${id}" (cleaned: "${cleanId}")`);
    console.log(`Total programs in data: ${programsData.length}`);

    // Find programs that target this GWO
    const validPrograms = programsData.filter(p => p.gwo && p.gwo.id === cleanId).map(p => {
        return {
            id: p.id,
            title: p.title,
            agency: p.agency,
            expenditure: Math.floor(Math.random() * 100000000) + 1000000, // Still mocking expenditure as it's not in summary
            fiscalYear: 2024
        };
    });

    console.log(`Found ${validPrograms.length} programs for GWO "${id}"`);

    if (validPrograms.length === 0) {
        // Fallback for the hardcoded example if it doesn't exist in data
        if (id === 'sustain-public-roadway-system') {
            const targetProgramCount = 32;
            const mockPrograms = programsData.filter(p => {
                const title = p.title.toLowerCase();
                return title.includes('road') || title.includes('highway') || title.includes('transportation');
            }).map(p => {
                return {
                    id: p.id,
                    title: p.title,
                    agency: p.agency,
                    expenditure: Math.floor(Math.random() * 100000000) + 1000000,
                    fiscalYear: 2024
                };
            });

            mockPrograms.sort((a, b) => b.expenditure - a.expenditure);
            const selectedPrograms = mockPrograms.slice(0, targetProgramCount);
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

    // Get GWO details from the first program that has it
    const firstProgram = programsData.find(p => p.gwo && p.gwo.id === id);
    const gwoTitle = firstProgram?.gwo?.name || "Government Wide Objective";

    validPrograms.sort((a, b) => b.expenditure - a.expenditure);
    const totalExpenditure = validPrograms.reduce((sum, p) => sum + p.expenditure, 0);

    return {
        id: id,
        title: gwoTitle,
        description: `Objective focused on ${gwoTitle}.`, // We might need a separate GWO definition source
        updated: 'Jan 2026',
        tags: ['Government Wide Objective'],
        programs: validPrograms,
        totalExpenditure
    };
}
