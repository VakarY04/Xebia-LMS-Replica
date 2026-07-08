import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { Button } from '../common/Button';

export const Sandbox: React.FC = () => {
  const [code, setCode] = useState(`// Welcome to Xebia Developer Sandbox
// Try writing some React 19 features here!

import React, { useActionState } from 'react';

async function updateProfile(prevState, formData) {
  const name = formData.get("username");
  // Simulate API Call
  await new Promise(res => setTimeout(res, 1000));
  return { success: true, name };
}

export default function ProfileForm() {
  const [state, formAction, isPending] = useActionState(updateProfile, null);
  
  return (
    <form action={formAction} className="space-y-4">
      <input name="username" placeholder="Username" className="border p-2 rounded" />
      <button disabled={isPending} className="bg-purple text-white p-2 rounded">
        {isPending ? 'Saving...' : 'Save'}
      </button>
      {state?.success && <p>Updated profile for \${state.name}!</p>}
    </form>
  );
}`);

  const [copied, setCopied] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    'Sandbox environment initialized.',
    'System ready: Node.js v20.10.0, npm v10.2.3',
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setConsoleOutput((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Running compilation...`,
      '✔ Compiled successfully.',
      'ℹ Bundled with Vite and Rollup.',
    ]);
  };

  const handleReset = () => {
    setConsoleOutput((prev) => [...prev, 'Reset sandbox container environment.']);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px] border border-xebia-lightGrey rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="lg:col-span-2 flex flex-col h-full border-b lg:border-b-0 lg:border-r border-xebia-lightGrey">
        <div className="bg-xebia-purpleDark text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <span className="text-xs font-semibold text-xebia-mediumGrey ml-2">SandboxEditor.tsx</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleCopy} className="p-1.5 text-xebia-mediumGrey hover:text-white">
              {copied ? <Check size={16} className="text-xebia-emerald" /> : <Copy size={16} />}
            </Button>
          </div>
        </div>
        <textarea
          className="flex-1 p-6 font-mono text-xs text-xebia-darkGrey bg-xebia-blueishGrey/20 border-none focus:outline-none resize-none leading-relaxed"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="flex flex-col h-full bg-xebia-blueishGrey/40">
        <div className="p-4 border-b border-xebia-lightGrey flex items-center justify-between bg-white">
          <span className="font-bold text-xebia-purpleDark text-sm flex items-center gap-1.5">
            <Terminal size={16} className="text-xebia-emerald" />
            Console Output
          </span>
          <div className="flex gap-1.5">
            <Button variant="outline" className="py-1 px-2.5 text-[10px] gap-1" onClick={handleReset} leftIcon={<RotateCcw size={10} />}>
              Reset
            </Button>
            <Button variant="secondary" className="py-1 px-2.5 text-[10px] gap-1" onClick={handleRun} leftIcon={<Play size={10} />}>
              Run
            </Button>
          </div>
        </div>
        <div className="flex-1 p-4 font-mono text-[11px] text-xebia-purpleDark overflow-y-auto space-y-2">
          {consoleOutput.map((log, idx) => (
            <div key={idx} className="leading-relaxed">
              <span className="text-xebia-lightGrey mr-1.5">&gt;</span>
              {log}
            </div>
          ))}
        </div>
        <div className="p-4 bg-white border-t border-xebia-lightGrey flex items-center justify-between text-xs font-semibold text-xebia-purple">
          <span className="flex items-center gap-1.5">
            Preview App
          </span>
          <a href="#preview" className="flex items-center gap-1 hover:text-xebia-purpleBright transition-colors">
            Open in new tab <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
