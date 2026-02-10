
import React from 'react';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface Props {
    profile: any;
}

export default function ProfileCompletionWidget({ profile }: Props) {
    const fields = [
        { key: 'avatar_url', label: 'Profile Picture', weight: 20 },
        { key: 'bio', label: 'Biography', weight: 30 },
        { key: 'specialty', label: 'Specialty', weight: 20 },
        { key: 'location', label: 'Location', weight: 15 },
        { key: 'clinic_name', label: 'Clinic/Workplace', weight: 15 },
    ];

    const completedFields = fields.filter(f => profile[f.key] && profile[f.key].length > 0);
    const score = completedFields.reduce((acc, curr) => acc + curr.weight, 0);
    const missingFields = fields.filter(f => !profile[f.key] || profile[f.key].length === 0);

    if (score === 100) return null;

    return (
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-tuio-red/20 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tuio-red/5 rounded-bl-[100px] -mr-8 -mt-8"></div>

            <div className="flex flex-col md:flex-row gap-6 items-center">

                {/* Progress Circle */}
                <div className="relative w-24 h-24 shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-100"
                        />
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * score) / 100}
                            className="text-tuio-red transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-tuio-navy">
                        {score}%
                    </div>
                </div>

                <div className="flex-grow">
                    <h3 className="text-xl font-tuio uppercase text-tuio-navy mb-2">
                        Complete your profile
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                        A complete profile increases your visibility and builds trust with patients and peers.
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {missingFields.slice(0, 3).map(field => (
                            <span key={field.key} className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-500 rounded-full text-xs font-bold">
                                <AlertCircle className="w-3 h-3" /> {field.label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="shrink-0">
                    <a href="/dashboard/settings" className="px-6 py-3 bg-tuio-navy text-white rounded-full font-bold text-sm hover:bg-tuio-red transition-colors flex items-center gap-2">
                        Finish Setup <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}
