import { useState } from "react";
import CitationModal from "./CitationModal";

interface Props {
    article: any;
}

export default function ArticleActions({ article }: Props) {
    const [isCitationOpen, setIsCitationOpen] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <div className="flex gap-2">
                <button
                    onClick={() => setIsCitationOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-tuio-navy rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                    title="Cite this article"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                    </svg>
                    <span className="hidden sm:inline">Cite</span>
                </button>

                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-tuio-navy rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                    title="Download PDF / Print"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                        />
                    </svg>
                    <span className="hidden sm:inline">PDF</span>
                </button>
            </div>

            <CitationModal
                article={article}
                isOpen={isCitationOpen}
                onClose={() => setIsCitationOpen(false)}
            />
        </>
    );
}
