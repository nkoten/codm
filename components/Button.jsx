/* components/Button.jsx
 */
import React from 'react';

export function Button({ label }) {
  return (
    <button className="px-4 py-2 bg-amber-500 text-black rounded font-bold hover:bg-amber-400 transition-colors">
      {label}
    </button>
  );
}