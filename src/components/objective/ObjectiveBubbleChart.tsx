import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { type ObjectiveProgram } from '../../utils/objectiveData';
import { Key, Lightbulb } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getBasePath } from '@/lib/utils';

interface ObjectiveBubbleChartProps {
    programs: ObjectiveProgram[];
    totalExpenditure: number;
    lastUpdated?: string;
}

export function ObjectiveBubbleChart({ programs, totalExpenditure, lastUpdated = "Jan 2026" }: ObjectiveBubbleChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [hoveredProgram, setHoveredProgram] = useState<ObjectiveProgram | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!svgRef.current || !programs.length) return;

        const width = 600;
        const height = 600;
        const margin = 10;

        // Clear previous render
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr("viewBox", [0, 0, width, height])
            .attr("width", "100%")
            .attr("height", "100%")
            .style("display", "block")
            .style("margin", "0 auto");

        // Create a pack layout
        const pack = d3.pack<ObjectiveProgram>()
            .size([width - margin * 2, height - margin * 2])
            .padding(4);

        // Create hierarchy
        const root = d3.hierarchy({ children: programs } as any)
            .sum((d: any) => d.expenditure)
            .sort((a, b) => (b.value || 0) - (a.value || 0));

        const nodes = pack(root).leaves();

        // Color scale (using a single color for now, maybe vary opacity or lightness?)
        // The design shows magenta bubbles.
        const color = "#542A3F"; // Individual bubble fill color
        const strokeColor = "#F9F9EF"; // Bakckground color border

        // Find largest program for special styling
        const largestProgram = [...programs].sort((a, b) => b.expenditure - a.expenditure)[0];

        // Define noise filter
        const defs = svg.append("defs");
        const filter = defs.append("filter")
            .attr("id", "noiseFilter")
            .attr("x", "0%")
            .attr("y", "0%")
            .attr("width", "100%")
            .attr("height", "100%");

        filter.append("feTurbulence")
            .attr("type", "fractalNoise")
            .attr("baseFrequency", "1.5") // Higher frequency for finer/harsher grain
            .attr("numOctaves", "3")
            .attr("stitchTiles", "stitch")
            .attr("result", "noise");

        filter.append("feColorMatrix")
            .attr("type", "matrix")
            .attr("values", `0 0 0 0 0.29
                             0 0 0 0 0.24
                             0 0 0 0 0.33
                             10 0 0 0 -5`) // High contrast alpha for hard edges, color #4A3E55
            .attr("in", "noise")
            .attr("result", "coloredNoise");

        filter.append("feComposite")
            .attr("operator", "in")
            .attr("in", "coloredNoise")
            .attr("in2", "SourceGraphic")
            .attr("result", "compositeNoise");

        filter.append("feBlend")
            .attr("in", "SourceGraphic")
            .attr("in2", "compositeNoise")
            .attr("mode", "multiply");

        // Create a group for bubbles centered in SVG
        const g = svg.append("g")
            .attr("transform", `translate(${margin},${margin})`);

        // Add outer ring with custom dotted border
        svg.append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", (width / 2) - 1) // Subtract stroke width/2 to keep inside
            .attr("fill", "none")
            .attr("stroke", "#1E1B16") // Darker border color
            .attr("stroke-width", 1.25)
            .attr("stroke-dasharray", "0 4.5") // 0 dash (dot), 8 gap for spacing
            .attr("stroke-linecap", "round");

        // Render bubbles
        const leaf = g.selectAll("g")
            .data(nodes)
            .join("g")
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .style("cursor", "pointer")
            .on("click", (event, d) => {
                window.location.href = getBasePath(`/program/${d.data.id}/`);
            })
            .on("mouseenter", (event, d) => {
                setHoveredProgram(d.data);
                // Get position relative to viewport for fixed tooltip
                setMousePosition({ x: event.clientX, y: event.clientY });

                // Highlight effect
                const g = d3.select(event.currentTarget);
                g.select(".bubble-fill")
                    .attr("fill", "#1E1B16")
                    .style("filter", null); // Remove noise on hover

                g.select(".bubble-stroke")
                    .attr("stroke", "#1E1B16")
                    .attr("stroke-width", 2);
            })
            .on("mousemove", (event) => {
                setMousePosition({ x: event.clientX, y: event.clientY });
            })
            .on("mouseleave", (event, d) => {
                setHoveredProgram(null);
                // Remove highlight
                const isLargest = d.data.id === largestProgram?.id;
                const g = d3.select(event.currentTarget);

                g.select(".bubble-fill")
                    .attr("fill", isLargest ? "#1E1B16" : color)
                    .style("filter", (isLargest ? null : "url(#noiseFilter)") as any);

                g.select(".bubble-stroke")
                    .attr("stroke", isLargest ? "#1E1B16" : strokeColor)
                    .attr("stroke-width", 1);
            });

        // Add circles with animation - Fill Layer
        leaf.append("circle")
            .attr("class", "bubble-fill")
            .attr("r", 0) // Start at 0 for animation
            .attr("fill", d => d.data.id === largestProgram?.id ? "#1E1B16" : color)
            .attr("stroke", "none")
            .style("filter", d => d.data.id === largestProgram?.id ? null : "url(#noiseFilter)") // Apply noise to regular bubbles
            .transition()
            .duration(800)
            .ease(d3.easeBackOut)
            .delay((d, i) => i * 10) // Stagger animation
            .attr("r", d => d.r);

        // Add circles with animation - Stroke Layer
        leaf.append("circle")
            .attr("class", "bubble-stroke")
            .attr("r", 0) // Start at 0 for animation
            .attr("fill", "none")
            .attr("stroke", d => d.data.id === largestProgram?.id ? "#1E1B16" : strokeColor)
            .attr("stroke-width", 1)
            .style("pointer-events", "none") // Let events pass through to group/fill
            .transition()
            .duration(800)
            .ease(d3.easeBackOut)
            .delay((d, i) => i * 10) // Stagger animation
            .attr("r", d => d.r);

        // Find top 3 programs for labeling
        const top3Programs = [...programs].sort((a, b) => b.expenditure - a.expenditure).slice(0, 3);
        const top3Ids = new Set(top3Programs.map(p => p.id));

        // Add labels to top 3 bubbles
        const labelNodes = leaf.filter(d => top3Ids.has(d.data.id));

        labelNodes.append("text")
            .attr("dy", "-0.5em") // Shift up to make room for spacing
            .style("text-anchor", "middle")
            .style("font-size", d => d.data.id === largestProgram?.id ? "13px" : "10px")
            .style("font-weight", "bold")
            .style("fill", "#FFFFFF")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .text(d => d.data.title.length > 20 ? d.data.title.substring(0, 20) + "..." : d.data.title)
            .transition()
            .delay(1000)
            .style("opacity", 1);

        labelNodes.append("text")
            .attr("dy", "1.1em") // Shift down (gap of ~1.6em total for ~6px spacing)
            .style("text-anchor", "middle")
            .style("font-size", d => d.data.id === largestProgram?.id ? "12px" : "10px")
            .style("fill", "#FFFFFF")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .text(d => formatCurrency(d.data.expenditure))
            .transition()
            .delay(1000)
            .style("opacity", 0.8);

    }, [programs]);

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

    // Find largest and smallest for sidebar stats
    const sortedPrograms = [...programs].sort((a, b) => b.expenditure - a.expenditure);
    const largest = sortedPrograms[0];
    const smallest = sortedPrograms[sortedPrograms.length - 1];

    return (
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Sidebar Stats */}
            <div className="shrink-0 space-y-3 w-[196px]">
                <div className="bg-parchment-200 p-6 w-full">
                    <h3 className="text-sm font-medium text-foreground mb-2">Programs</h3>
                    <div className="text-2xl font-bold text-foreground mb-[2px]">{programs.length}</div>
                    <div className="text-xs text-muted-foreground">+10 from Jan 2020</div>
                </div>

                <div className="bg-parchment-200 p-6 w-full">
                    <h3 className="text-sm font-medium text-foreground mb-2">Total Expenditure</h3>
                    <div className="text-2xl font-bold text-foreground mb-[2px]">{formatCurrency(totalExpenditure)}</div>
                    <div className="text-xs text-muted-foreground">+23% from Jan 2020</div>
                </div>
            </div>

            {/* Bubble Chart Area */}
            <div className="flex-1 min-w-0 flex justify-center items-center">
                <div className="relative flex items-center justify-center w-full max-w-[724px] aspect-square rounded-full">
                    <svg ref={svgRef} className="w-full h-full" />

                    {/* Tooltip */}
                    {hoveredProgram && (
                        <div
                            className="fixed z-50 bg-white text-foreground p-3 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-10px] border border-stone-200"
                            style={{ left: mousePosition.x, top: mousePosition.y }}
                        >
                            <div className="font-bold text-sm mb-1">{hoveredProgram.title}</div>
                            <div className="flex justify-between items-center gap-4 text-xs text-muted-foreground">
                                <span>Go to program</span>
                                <span className="bg-parchment-200 px-1.5 py-0.5 rounded text-foreground font-mono">
                                    {formatCurrency(hoveredProgram.expenditure)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Key / Legend */}
            <div className="shrink-0 lg:w-64 space-y-8 pt-6">
                <div>
                    <div className="flex items-center gap-1.5 mb-2">
                        <div className="flex -space-x-2">
                            <Avatar className="w-5 h-5 border-[1.5px] border-parchment-100">
                                <AvatarFallback className="bg-[#542A3F]" />
                            </Avatar>
                            <Avatar className="w-5 h-5 border-[1.5px] border-parchment-100">
                                <AvatarFallback className="bg-[#1E1B16]" />
                            </Avatar>
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">Key</h3>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                        Each bubble is a program sized by how much the program has spent in FY {largest?.fiscalYear || 2026} so far&mdash;as of {lastUpdated}
                    </p>
                </div>

                <div>
                    <div className="flex items-center gap-1.5 mb-2">
                        <Lightbulb className="w-4 h-4 text-foreground" />
                        <h3 className="text-sm font-semibold text-foreground">Insight</h3>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                        {programs.length} programs are working toward this objective, spending a combined {formatCurrency(totalExpenditure)} in FY {largest?.fiscalYear || 2026}. The largest program is the <a href={getBasePath(`/program/${largest?.id}/`)} className="underline decoration-solid font-medium text-foreground hover:text-primary transition-colors">{largest?.title}</a> ({formatCurrency(largest?.expenditure || 0)}). The smallest is the <a href={getBasePath(`/program/${smallest?.id}/`)} className="underline decoration-solid font-medium text-foreground hover:text-primary transition-colors">{smallest?.title}</a> ({formatCurrency(smallest?.expenditure || 0)}).
                    </p>
                </div>
            </div>
        </div>
    );
}
