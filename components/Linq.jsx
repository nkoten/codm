import { HashRouter, Routes, Route, Link } from 'react-router-dom';

export default function Linq({ to, text }) {
  return (
    <Link to={to} className="hover:text-amber-400 transition-colors">
      {text}
    </Link>
  );
}
