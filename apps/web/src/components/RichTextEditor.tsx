
import React, { useEffect, useRef } from 'react';

interface RichTextEditorProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ label, value, onChange, className = '' }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    // Command helper
    const execCmd = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    // Update content only if it's significantly different to avoid cursor jumping
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
             // Only update if the content is empty or totally different (initial load)
             // to prevent cursor jumping issues during typing.
             if (editorRef.current.innerHTML === '' || value === '') {
                 editorRef.current.innerHTML = value;
             }
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="block text-sm font-bold text-gray-700">{label}</label>
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#1f6306]">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
                    <button type="button" onClick={() => execCmd('bold')} className="p-1.5 hover:bg-gray-200 rounded font-bold" title="Bold">B</button>
                    <button type="button" onClick={() => execCmd('italic')} className="p-1.5 hover:bg-gray-200 rounded italic" title="Italic">I</button>
                    <button type="button" onClick={() => execCmd('underline')} className="p-1.5 hover:bg-gray-200 rounded underline" title="Underline">U</button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={() => execCmd('formatBlock', 'H3')} className="p-1.5 hover:bg-gray-200 rounded font-bold text-sm" title="Heading 3">H3</button>
                    <button type="button" onClick={() => execCmd('formatBlock', 'P')} className="p-1.5 hover:bg-gray-200 rounded text-sm" title="Paragraph">P</button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={() => execCmd('insertUnorderedList')} className="p-1.5 hover:bg-gray-200 rounded" title="Bullet List">• List</button>
                    <button type="button" onClick={() => execCmd('insertOrderedList')} className="p-1.5 hover:bg-gray-200 rounded" title="Numbered List">1. List</button>
                    <div className="w-px h-4 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={() => execCmd('removeFormat')} className="p-1.5 hover:bg-gray-200 rounded text-red-600 text-xs" title="Clear Format">Clear</button>
                </div>
                
                {/* Editor Area */}
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    className="p-4 min-h-[150px] outline-none prose prose-sm max-w-none"
                    style={{ minHeight: '150px' }}
                    dangerouslySetInnerHTML={{ __html: value }}
                />
            </div>
            <p className="text-xs text-gray-500">Gunakan toolbar di atas untuk memformat teks. Hasil akan langsung terlihat di preview.</p>
        </div>
    );
};

export default RichTextEditor;
