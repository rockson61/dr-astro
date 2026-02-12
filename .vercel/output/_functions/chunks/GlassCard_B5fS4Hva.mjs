import { jsx } from 'react/jsx-runtime';
import 'react';

const GlassCard = ({ children, className = "", hoverEffect = false }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `
        glass-card p-6
        ${hoverEffect ? "hover:shadow-xl hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-1" : ""}
        ${className}
      `,
      children
    }
  );
};

export { GlassCard as G };
