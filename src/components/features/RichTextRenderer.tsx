import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEffect, useState } from 'react';

// For read-only rendering, we can also use a simpler parser or just the Editor in readOnly mode.
// Using EditorContent in readOnly mode ensures 100% visual parity with the editor.

interface RichTextRendererProps {
    content: any; // JSON object
}

export default function RichTextRenderer({ content }: RichTextRendererProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: true,
                autolink: true,
            }),
        ],
        content: content,
        editable: false, // Read-only mode
        editorProps: {
            attributes: {
                class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none',
            },
        },
    });

    // If content updates (client-side navigation), update editor
    useEffect(() => {
        if (editor && content) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) {
        return null;
    }

    return <EditorContent editor={editor} />;
}
