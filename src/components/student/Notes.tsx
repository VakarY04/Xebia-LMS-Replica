import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Bookmark, Save } from 'lucide-react';
import { Button } from '../common/Button';

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

export const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: 'K8s Service Types', content: 'ClusterIP (default), NodePort (exposes on port of each node), LoadBalancer (cloud load balancer), ExternalName (maps to externalName field).', date: 'Jul 05, 2026' },
    { id: 2, title: 'React 19 useActionState', content: 'useActionState hook allows updating state based on the result of a form action. Useful for handling pending state and error feedback directly.', date: 'Jul 06, 2026' },
  ]);

  const [activeNote, setActiveNote] = useState<Note | null>(notes[0] || null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border border-xebia-lightGrey rounded-xl overflow-hidden bg-white h-[500px]">
      <div className="border-r border-xebia-lightGrey flex flex-col bg-xebia-blueishGrey/30">
        <div className="p-4 border-b border-xebia-lightGrey flex justify-between items-center bg-white">
          <span className="font-bold text-xebia-purpleDark text-sm">Study Notes</span>
          <Button variant="ghost" className="p-1 rounded hover:bg-xebia-mediumGrey text-xebia-purple">
            <Plus size={16} />
          </Button>
        </div>
        <div className="flex-1 divide-y divide-xebia-lightGrey/60 overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNote(note)}
              className={`p-4 cursor-pointer transition-colors ${
                activeNote?.id === note.id ? 'bg-white border-l-4 border-xebia-purple' : 'hover:bg-xebia-blueishGrey/50'
              }`}
            >
              <div className="flex items-center gap-1 text-xebia-purple mb-1">
                <Bookmark size={12} className="fill-xebia-purple/20" />
                <span className="text-[10px] font-semibold text-xebia-purple">{note.date}</span>
              </div>
              <h4 className="font-bold text-xs text-xebia-purpleDark truncate">{note.title}</h4>
              <p className="text-xebia-darkGrey text-[11px] line-clamp-2 mt-1 leading-normal">{note.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col h-full">
        {activeNote ? (
          <>
            <div className="p-4 border-b border-xebia-lightGrey flex items-center justify-between">
              <input
                type="text"
                className="font-bold text-xebia-purpleDark text-base bg-transparent border-none focus:outline-none w-full"
                value={activeNote.title}
                onChange={(e) => {
                  const updated = { ...activeNote, title: e.target.value };
                  setActiveNote(updated);
                  setNotes(notes.map(n => n.id === activeNote.id ? updated : n));
                }}
              />
              <div className="flex gap-1.5 flex-shrink-0">
                <Button variant="ghost" className="p-1.5 text-xebia-darkGrey hover:text-xebia-purple">
                  <Edit3 size={16} />
                </Button>
                <Button variant="ghost" className="p-1.5 text-xebia-darkGrey hover:text-red-500">
                  <Trash2 size={16} />
                </Button>
                <Button variant="ghost" className="p-1.5 text-xebia-purple hover:text-xebia-purpleBright">
                  <Save size={16} />
                </Button>
              </div>
            </div>
            <textarea
              className="flex-1 p-6 text-sm text-xebia-darkGrey bg-transparent border-none focus:outline-none resize-none leading-relaxed"
              value={activeNote.content}
              onChange={(e) => {
                const updated = { ...activeNote, content: e.target.value };
                setActiveNote(updated);
                setNotes(notes.map(n => n.id === activeNote.id ? updated : n));
              }}
            />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-xebia-lightGrey p-6">
            <Bookmark size={48} className="stroke-1 mb-2" />
            <p className="text-sm font-medium">Select a note or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};
