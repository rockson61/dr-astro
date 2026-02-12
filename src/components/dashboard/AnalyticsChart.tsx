import React from 'react';

interface ChartProps {
    data: { date: string; views: number; reads: number }[];
}

export default function AnalyticsChart({ data }: ChartProps) {
    if (!data || data.length === 0) return <div className="text-gray-400 text-sm">No data available</div>;

    const maxViews = Math.max(...data.map(d => d.views), 1);
    const height = 200;
    const width = 600;
    const padding = 20;

    // Scale functions
    const xScale = (index: number) => padding + (index / (data.length - 1)) * (width - 2 * padding);
    const yScale = (val: number) => height - padding - (val / maxViews) * (height - 2 * padding);

    // Generate path for Views (Blue)
    const viewPath = data.map((d, i) =>
        `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.views)}`
    ).join(' ');

    // Generate path for Reads (Green)
    const readPath = data.map((d, i) =>
        `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.reads)}`
    ).join(' ');

    return (
        <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[600px]">
                {/* Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map(t => (
                    <line
                        key={t}
                        x1={padding}
                        y1={yScale(maxViews * t)}
                        x2={width - padding}
                        y2={yScale(maxViews * t)}
                        stroke="#eee"
                        strokeWidth="1"
                        strokeDasharray="4"
                    />
                ))}

                {/* View Line */}
                <path d={viewPath} fill="none" stroke="#002147" strokeWidth="2" />
                {data.map((d, i) => (
                    <circle key={`v-${i}`} cx={xScale(i)} cy={yScale(d.views)} r="3" fill="#002147" />
                ))}

                {/* Read Line */}
                <path d={readPath} fill="none" stroke="#E63946" strokeWidth="2" />
                {data.map((d, i) => (
                    <circle key={`r-${i}`} cx={xScale(i)} cy={yScale(d.reads)} r="3" fill="#E63946" />
                ))}

                {/* Labels */}
                {data.map((d, i) => (
                    <text
                        key={i}
                        x={xScale(i)}
                        y={height - 5}
                        fontSize="10"
                        textAnchor="middle"
                        fill="#999"
                    >
                        {new Date(d.date).getDate()}
                    </text>
                ))}
            </svg>
            <div className="flex gap-4 justify-center mt-4 text-xs font-bold uppercase tracking-wider">
                <span className="flex items-center gap-2 text-tuio-navy"><span className="w-3 h-3 bg-tuio-navy rounded-full"></span> Views</span>
                <span className="flex items-center gap-2 text-tuio-red"><span className="w-3 h-3 bg-tuio-red rounded-full"></span> Reads</span>
            </div>
        </div>
    );
}
