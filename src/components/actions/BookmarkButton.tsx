import { useState } from "react";

interface BookmarkButtonProps {
    articleId: number;
    initialIsSaved: boolean;
}

export default function BookmarkButton({
    articleId,
    initialIsSaved,
}: BookmarkButtonProps) {
    const [isSaved, setIsSaved] = useState(initialIsSaved);
    const [isLoading, setIsLoading] = useState(false);

    const toggleBookmark = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            // Optimistic UI update
            const newState = !isSaved;
            setIsSaved(newState);

            const res = await fetch("/api/bookmarks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ article_id: articleId }),
            });

            if (!res.ok) {
                if (res.status === 401) {
                    alert("Please log in to save articles.");
                    window.location.href = "/login";
                    return;
                }
                throw new Error("Failed to update bookmark");
            }

            const data = await res.json();
            // Verify server state matches optimistic update
            if (data.saved !== newState) {
                setIsSaved(data.saved);
            }

        } catch (error) {
            console.error(error);
            setIsSaved(!isSaved); // Revert on error
            alert("Failed to save article. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={toggleBookmark}
            disabled={isLoading}
            className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isSaved
                    ? "bg-tuio-navy text-white hover:bg-tuio-navy/90"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
            aria-label={isSaved ? "Remove from bookmarks" : "Save for later"}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-5 h-5 transition-transform ${isSaved ? "scale-110" : "group-hover:scale-110"}`}
                fill={isSaved ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
            </svg>
            <span className="font-medium text-sm hidden md:inline">
                {isSaved ? "Saved" : "Save"}
            </span>
        </button>
    );
}
