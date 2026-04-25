import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, RotateCcw, Save, Sparkles } from 'lucide-react';
import Navbar from '@/components/memory/Navbar';
import Footer from '@/components/memory/Footer';
import { Button } from '@/components/ui/button';
import { COLORING_TEMPLATES, getDefaultFills } from '@/data/coloringTemplates';
import { usePageSeo } from '@/lib/seo/usePageSeo';
import { cn } from '@/lib/utils';

const PALETTE = [
  { hex: '#ffffff', name: 'White' },
  { hex: '#fecaca', name: 'Light red' },
  { hex: '#ef4444', name: 'Red' },
  { hex: '#f97316', name: 'Orange' },
  { hex: '#facc15', name: 'Yellow' },
  { hex: '#4ade80', name: 'Green' },
  { hex: '#22d3ee', name: 'Cyan' },
  { hex: '#3b82f6', name: 'Blue' },
  { hex: '#a78bfa', name: 'Purple' },
  { hex: '#f472b6', name: 'Pink' },
  { hex: '#854d0e', name: 'Brown' },
  { hex: '#1e293b', name: 'Black' },
];

export default function ColoringPage() {
  usePageSeo({
    title: 'Coloring — Play & Learn',
    description:
      'Pick colors and tap the picture to fill each part. Save your art as an SVG or start over with one tap.',
  });

  const [templateId, setTemplateId] = useState(COLORING_TEMPLATES[0].id);
  const [selectedColor, setSelectedColor] = useState(PALETTE[3].hex);
  const [fills, setFills] = useState(() => getDefaultFills(COLORING_TEMPLATES[0].id));
  const svgRef = useRef(null);

  const template = useMemo(
    () => COLORING_TEMPLATES.find((t) => t.id === templateId) ?? COLORING_TEMPLATES[0],
    [templateId]
  );

  useEffect(() => {
    setFills(getDefaultFills(templateId));
  }, [templateId]);

  const applyColor = useCallback(
    (regionId) => {
      setFills((prev) => ({ ...prev, [regionId]: selectedColor }));
    },
    [selectedColor]
  );

  const handleReset = useCallback(() => {
    setFills(getDefaultFills(templateId));
  }, [templateId]);

  const handleSave = useCallback(() => {
    const el = svgRef.current;
    if (!el || typeof window === 'undefined') return;
    const svg = el;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${source}`], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-coloring-${template.id}.svg`;
    a.rel = 'noopener';
    a.click();
    URL.revokeObjectURL(url);
  }, [template.id]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-rose-50 to-sky-100">
      <Navbar />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-rose-200/80 bg-white/90 px-4 py-2 text-sm font-bold text-rose-800 shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden />
            Coloring
          </p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Tap a color, then tap the picture
          </h1>
          <p className="mx-auto mt-2 max-w-md text-slate-600">
            Each area fills with the brush you pick. Try a new drawing or download when you are done.
          </p>
        </motion.div>

        <p className="mt-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
          Picture
        </p>
        <div
          className="mt-2 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Choose drawing"
        >
          {COLORING_TEMPLATES.map((t) => {
            const active = t.id === templateId;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTemplateId(t.id)}
                className={cn(
                  'rounded-2xl border-2 px-3 py-2 text-sm font-bold transition-all',
                  active
                    ? 'border-rose-500 bg-white text-rose-900 ring-2 ring-rose-200'
                    : 'border-slate-200 bg-white/80 text-slate-700 hover:border-rose-200'
                )}
              >
                {t.title}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
          Colors
        </p>
        <div
          className="mt-2 flex flex-wrap items-center justify-center gap-2"
          role="listbox"
          aria-label="Brush color"
        >
          {PALETTE.map((c) => {
            const on = c.hex === selectedColor;
            return (
              <button
                key={c.hex}
                type="button"
                role="option"
                aria-selected={on}
                title={c.name}
                onClick={() => setSelectedColor(c.hex)}
                className={cn(
                  'h-10 w-10 rounded-full border-4 shadow-sm transition-transform hover:scale-105',
                  c.hex === '#ffffff' && 'ring-1 ring-slate-300',
                  on ? 'border-slate-900 scale-110 ring-2 ring-offset-2 ring-rose-400' : 'border-white'
                )}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
        <p className="mt-1 text-center text-sm text-slate-500" aria-live="polite">
          Current brush: <span className="font-bold text-slate-800">{selectedColor}</span>
        </p>

        <div className="mx-auto mt-6 flex w-full max-w-sm justify-center sm:max-w-md">
          <div className="w-full overflow-hidden rounded-3xl border-4 border-white bg-white p-2 shadow-lg ring-1 ring-slate-200/80">
            <svg
              ref={svgRef}
              id="coloring-canvas"
              role="img"
              aria-label={`${template.title} — tap parts to color`}
              viewBox={template.viewBox}
              className="h-auto w-full select-none"
              style={{ minHeight: '200px' }}
            >
              <title>{template.title}</title>
              {template.regions.map((r) => (
                <path
                  key={r.id}
                  d={r.d}
                  fill={fills[r.id] ?? r.defaultFill}
                  stroke={template.stroke}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  className="cursor-pointer touch-manipulation transition-[filter] duration-100 hover:brightness-95"
                  onClick={() => applyColor(r.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      applyColor(r.id);
                    }
                  }}
                  tabIndex={0}
                >
                  <title>{r.label}</title>
                </path>
              ))}
            </svg>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={handleSave}
            className="h-12 min-w-[10rem] rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 font-bold"
          >
            <Save className="mr-2 h-5 w-5" />
            Save picture
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="h-12 min-w-[10rem] rounded-2xl border-2 font-bold"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </div>

        <p className="mx-auto mt-4 max-w-md text-center text-sm text-slate-500">
          <Palette className="mb-0.5 inline h-4 w-4" aria-hidden /> Saving downloads an{' '}
          <strong>SVG</strong> file you can open in a browser or print. Reset puts this drawing back
          to the starting colors.
        </p>
      </main>

      <Footer />
    </div>
  );
}
