import { useState, useEffect } from "react";
import { format } from "date-fns";

interface Props {
    article: {
        title: string;
        author: { full_name: string; surname?: string; firstname?: string };
        published_at: string;
        slug: string;
        doi?: string;
    };
    isOpen: boolean;
    onClose: () => void;
}

export default function CitationModal({ article, isOpen, onClose }: Props) {
    if (!isOpen) return null;

    const [activeTab, setActiveTab] = useState<"APA" | "MLA" | "BibTeX">("APA");
    const [copied, setCopied] = useState(false);

    const url = typeof window !== "undefined" ? window.location.href : "";
    const date = new Date(article.published_at);
    const year = date.getFullYear();

    // Basic Name Parsing (fallback)
    const authorName = article.author?.full_name || "DentalReach Team";
    const names = authorName.split(" ");
    const surname = names[names.length - 1];
    const initial = names[0][0];

    const citations = {
        APA: `${surname}, ${initial}. (${year}). ${article.title}. DentalReach. ${url}`,
        MLA: `${surname}, ${names[0]}. "${article.title}." DentalReach, ${format(date, "d MMM. yyyy")}, ${url}.`,
        BibTeX: `@article{dentalreach_${year},
  author = {${authorName}},
  title = {${article.title}},
  journal = {DentalReach},
  year = {${year}},
  url = {${url}}
}`,
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(citations[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-tuio-navy font-tuio uppercase">Cite This Article</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex gap-2 mb-4 border-b border-gray-100">
                        {["APA", "MLA", "BibTeX"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setActiveTab(type as any)}
                                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === type
                                        ? "border-tuio-red text-tuio-red"
                                        : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 min-h-[100px] mb-4 font-mono text-sm text-gray-700 break-words whitespace-pre-wrap">
                        {citations[activeTab]}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className={`px-6 py-2 rounded-lg text-white font-bold text-sm transition-all flex items-center gap-2 ${copied ? "bg-emerald-500" : "bg-tuio-navy hover:bg-tuio-red"
                                }`}
                        >
                            {copied ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                    Copy Citation
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
