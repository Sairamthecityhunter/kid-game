import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/40 bg-white/30 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center md:flex-row md:text-left">
        <div>
          <p className="font-bold text-slate-800">Play &amp; Learn</p>
          <p className="mt-1 max-w-md text-sm text-slate-600">
            Colorful games made for curious kids. Practice math and train your memory—always
            kid-friendly and mobile-ready.
          </p>
        </div>
        <p className="flex items-center gap-1 text-sm text-slate-500">
          Built with <Heart className="h-4 w-4 fill-pink-400 text-pink-400" /> for young learners
        </p>
      </div>
    </footer>
  );
}
