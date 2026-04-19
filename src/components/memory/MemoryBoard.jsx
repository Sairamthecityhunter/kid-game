import MemoryCard from '@/components/memory/MemoryCard';
import { cn } from '@/lib/utils';

/**
 * Responsive grid: 2 cols (xs) → 3 (sm) → 4 (md+) → 5 on xl when the board has many cards (14+).
 *
 * @param {object} props
 * @param {import('@/lib/memory/types').MemoryCard[]} props.cards
 * @param {import('@/lib/memory/types').MemoryCardId[]} props.flippedIds
 * @param {boolean} props.interactionLocked
 * @param {(id: import('@/lib/memory/types').MemoryCardId) => void} props.onCardClick
 */
export default function MemoryBoard({ cards, flippedIds, interactionLocked, onCardClick }) {
  const wideBoard = cards.length >= 14;

  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-2',
        'sm:grid-cols-3 sm:gap-3',
        'md:grid-cols-4 md:gap-3',
        'lg:grid-cols-4 lg:gap-4',
        wideBoard && 'xl:grid-cols-5'
      )}
    >
      {cards.map((card) => {
        const isFlipped = flippedIds.includes(card.id);
        return (
          <MemoryCard
            key={card.id}
            emoji={card.emoji}
            name={card.name}
            isFlipped={isFlipped}
            isMatched={card.matched}
            disabled={interactionLocked}
            onClick={() => onCardClick(card.id)}
          />
        );
      })}
    </div>
  );
}
