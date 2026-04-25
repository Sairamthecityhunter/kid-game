export type ColoringRegion = {
  id: string;
  /** SVG path d attribute */
  d: string;
  defaultFill: string;
  label: string;
};

export type ColoringTemplate = {
  id: string;
  title: string;
  viewBox: string;
  stroke: string;
  regions: ColoringRegion[];
};

const STROKE = '#334155';

/** Car wheels: filled circles as path. */
const WHEEL1 = 'M48,150m-14,0a14,14,0,1,0,28,0a14,14,0,1,0-28,0';
const WHEEL2 = 'M152,150m-14,0a14,14,0,1,0,28,0a14,14,0,1,0-28,0';

export const COLORING_TEMPLATES: ColoringTemplate[] = [
  {
    id: 'house',
    title: 'Little house',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'sky', d: 'M0,0H220V220H0Z', defaultFill: '#e0f2fe', label: 'Sky' },
      { id: 'grass', d: 'M0,165H220V220H0Z', defaultFill: '#bbf7d0', label: 'Grass' },
      { id: 'wall', d: 'M48,98H172V162H48V98Z', defaultFill: '#fef3c7', label: 'House' },
      { id: 'roof', d: 'M38,98L110,40L182,98Z', defaultFill: '#f87171', label: 'Roof' },
      { id: 'door', d: 'M92,162V120H128V162H92Z', defaultFill: '#92400e', label: 'Door' },
      { id: 'window', d: 'M136,108H162V130H136V108Z', defaultFill: '#bae6fd', label: 'Window' },
      { id: 'chimney', d: 'M150,50H168V75H150V50Z', defaultFill: '#9ca3af', label: 'Chimney' },
    ],
  },
  {
    id: 'car',
    title: 'Car',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'sky', d: 'M0,0H220V220H0Z', defaultFill: '#cffafe', label: 'Sky' },
      { id: 'road', d: 'M0,168H220V220H0Z', defaultFill: '#4b5563', label: 'Road' },
      { id: 'body', d: 'M32,150V118L52,98H168L188,118V150H32Z', defaultFill: '#f472b6', label: 'Car body' },
      {
        id: 'windows',
        d: 'M64,100H108V118H64V100ZM124,100H168V118H124V100Z',
        defaultFill: '#e0e7ff',
        label: 'Windows',
      },
      { id: 'wheel1', d: WHEEL1, defaultFill: '#1e293b', label: 'Front wheel' },
      { id: 'wheel2', d: WHEEL2, defaultFill: '#1e293b', label: 'Back wheel' },
      { id: 'light', d: 'M188,128H198V140H188V128Z', defaultFill: '#fef08a', label: 'Headlight' },
    ],
  },
  {
    id: 'ice-cream',
    title: 'Ice cream',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'bg', d: 'M0,0H220V220H0Z', defaultFill: '#fdf4ff', label: 'Background' },
      {
        id: 'cone',
        d: 'M68,182L100,220H120L152,182H68Z',
        defaultFill: '#d97706',
        label: 'Cone',
      },
      {
        id: 'scoop3',
        d: 'M110,155m-28,0a28,28,0,1,0,56,0a28,28,0,1,0-56,0',
        defaultFill: '#93c5fd',
        label: 'Bottom scoop',
      },
      {
        id: 'scoop2',
        d: 'M110,115m-30,0a30,30,0,1,0,60,0a30,30,0,1,0-60,0',
        defaultFill: '#86efac',
        label: 'Middle scoop',
      },
      {
        id: 'scoop1',
        d: 'M110,70m-32,0a32,32,0,1,0,64,0a32,32,0,1,0-64,0',
        defaultFill: '#f9a8d4',
        label: 'Top scoop',
      },
    ],
  },
  {
    id: 'butterfly',
    title: 'Butterfly',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'bg', d: 'M0,0H220V220H0Z', defaultFill: '#ecfccb', label: 'Background' },
      {
        id: 'wing-l',
        d: 'M110,90C75,50,25,60,25,110C25,150,80,160,110,130V90Z',
        defaultFill: '#c4b5fd',
        label: 'Left wing',
      },
      {
        id: 'wing-r',
        d: 'M110,90C145,50,195,60,195,110C195,150,140,160,110,130V90Z',
        defaultFill: '#a5b4fc',
        label: 'Right wing',
      },
      { id: 'body', d: 'M105,50H115V165H105V50Z', defaultFill: '#7c3aed', label: 'Body' },
      {
        id: 'spot-l',
        d: 'M55,95m-8,0a8,8,0,1,0,16,0a8,8,0,1,0-16,0',
        defaultFill: '#fef08a',
        label: 'Wing spot',
      },
      {
        id: 'spot-r',
        d: 'M165,95m-8,0a8,8,0,1,0,16,0a8,8,0,1,0-16,0',
        defaultFill: '#fef08a',
        label: 'Wing spot',
      },
    ],
  },
  {
    id: 'tree',
    title: 'Tree',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'sky', d: 'M0,0H220V220H0Z', defaultFill: '#e0f2fe', label: 'Sky' },
      {
        id: 'sun',
        d: 'M175,50m-22,0a22,22,0,1,0,44,0a22,22,0,1,0-44,0',
        defaultFill: '#facc15',
        label: 'Sun',
      },
      { id: 'grass', d: 'M0,175H220V220H0Z', defaultFill: '#86efac', label: 'Grass' },
      { id: 'trunk', d: 'M98,128H122V210H98V128Z', defaultFill: '#a16207', label: 'Trunk' },
      {
        id: 'leaves',
        d: 'M110,75m-52,0a52,52,0,1,0,104,0a52,52,0,1,0-104,0',
        defaultFill: '#16a34a',
        label: 'Leaves',
      },
    ],
  },
  {
    id: 'fish',
    title: 'Fish',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'water', d: 'M0,0H220V220H0Z', defaultFill: '#7dd3fc', label: 'Water' },
      { id: 'tail', d: 'M40,118L70,90L70,150Z', defaultFill: '#f97316', label: 'Tail' },
      { id: 'fin', d: 'M95,85L110,60L125,85Z', defaultFill: '#c084fc', label: 'Fin' },
      {
        id: 'body',
        d: 'M110,118m-58,-32a58,32,0,1,0,116,0a58,32,0,1,0-116,0',
        defaultFill: '#fbbf24',
        label: 'Body',
      },
      {
        id: 'eye',
        d: 'M165,110m-10,0a10,10,0,1,0,20,0a10,10,0,1,0-20,0',
        defaultFill: '#0f172a',
        label: 'Eye',
      },
    ],
  },
  {
    id: 'rocket',
    title: 'Rocket',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'sky', d: 'M0,0H220V220H0Z', defaultFill: '#1e1b4b', label: 'Sky' },
      { id: 'fin-l', d: 'M90,100L58,128L90,128Z', defaultFill: '#94a3b8', label: 'Left fin' },
      { id: 'fin-r', d: 'M130,100L162,128L130,128Z', defaultFill: '#94a3b8', label: 'Right fin' },
      { id: 'body', d: 'M90,40H130V150H90V40Z', defaultFill: '#e2e8f0', label: 'Rocket' },
      { id: 'window', d: 'M98,58H122V90H98V58Z', defaultFill: '#38bdf8', label: 'Window' },
      { id: 'flame', d: 'M98,150L110,200L122,150Z', defaultFill: '#fb923c', label: 'Flame' },
    ],
  },
  {
    id: 'flower',
    title: 'Flower',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'bg', d: 'M0,0H220V220H0Z', defaultFill: '#fffbeb', label: 'Background' },
      { id: 'stem', d: 'M100,200H120V100H100V200Z', defaultFill: '#22c55e', label: 'Stem' },
      { id: 'leaf-l', d: 'M100,150L40,120L80,180Z', defaultFill: '#4ade80', label: 'Left leaf' },
      { id: 'leaf-r', d: 'M120,150L200,150L150,185Z', defaultFill: '#4ade80', label: 'Right leaf' },
      {
        id: 'petals',
        d: 'M110,60m-40,0a40,35,0,1,0,80,0a40,35,0,1,0-80,0',
        defaultFill: '#f472b6',
        label: 'Petals',
      },
      {
        id: 'center',
        d: 'M110,58m-12,0a12,12,0,1,0,24,0a12,12,0,1,0-24,0',
        defaultFill: '#facc15',
        label: 'Center',
      },
    ],
  },
  {
    id: 'boat',
    title: 'Sailboat',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'sky', d: 'M0,0H220V140H0Z', defaultFill: '#bae6fd', label: 'Sky' },
      { id: 'water', d: 'M0,140H220V220H0Z', defaultFill: '#0ea5e9', label: 'Water' },
      { id: 'hull', d: 'M35,150Q110,198,185,150L170,120H50L35,150Z', defaultFill: '#92400e', label: 'Boat' },
      { id: 'mast', d: 'M106,45H116V200H106V45Z', defaultFill: '#64748b', label: 'Mast' },
      { id: 'sail', d: 'M112,50L178,100L112,128Z', defaultFill: '#f8fafc', label: 'Sail' },
    ],
  },
  {
    id: 'mushroom',
    title: 'Mushroom',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'bg', d: 'M0,0H220V220H0Z', defaultFill: '#ecfeff', label: 'Background' },
      { id: 'ground', d: 'M0,195H220V220H0Z', defaultFill: '#d9f99d', label: 'Ground' },
      { id: 'stem', d: 'M92,130H128V210H92V130Z', defaultFill: '#fef3c7', label: 'Stem' },
      {
        id: 'cap',
        d: 'M50,120C50,30 170,30 170,120H50Z',
        defaultFill: '#ef4444',
        label: 'Mushroom cap',
      },
      { id: 'spot1', d: 'M85,75m-8,0a8,8,0,1,0,16,0a8,8,0,1,0-16,0', defaultFill: '#fef9c3', label: 'Spots' },
      { id: 'spot2', d: 'M125,60m-7,0a7,7,0,1,0,14,0a7,7,0,1,0-14,0', defaultFill: '#fef9c3', label: 'Spots' },
      { id: 'spot3', d: 'M150,90m-7,0a7,7,0,1,0,14,0a7,7,0,1,0-14,0', defaultFill: '#fef9c3', label: 'Spots' },
    ],
  },
  {
    id: 'robot',
    title: 'Robot',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'bg', d: 'M0,0H220V220H0Z', defaultFill: '#e2e8f0', label: 'Background' },
      {
        id: 'antenna',
        d: 'M100,20H120V45H100V20Z',
        defaultFill: '#f43f5e',
        label: 'Antenna',
      },
      { id: 'head', d: 'M75,50H145V100H75V50Z', defaultFill: '#cbd5e1', label: 'Head' },
      { id: 'eyes', d: 'M88,70H100V82H88V70ZM120,70H132V82H120V70Z', defaultFill: '#38bdf8', label: 'Eyes' },
      { id: 'body', d: 'M70,105H150V180H70V105Z', defaultFill: '#94a3b8', label: 'Body' },
      { id: 'arm-l', d: 'M35,110H60V160H35V110Z', defaultFill: '#64748b', label: 'Left arm' },
      { id: 'arm-r', d: 'M160,110H185V160H160V110Z', defaultFill: '#64748b', label: 'Right arm' },
      { id: 'leg-l', d: 'M85,180H100V210H85V180Z', defaultFill: '#475569', label: 'Left foot' },
      { id: 'leg-r', d: 'M120,180H135V210H120V180Z', defaultFill: '#475569', label: 'Right foot' },
    ],
  },
  {
    id: 'cat',
    title: 'Cat',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'bg', d: 'M0,0H220V220H0Z', defaultFill: '#fdf2f8', label: 'Background' },
      { id: 'ear-l', d: 'M58,95L80,50L100,95Z', defaultFill: '#f9a8d4', label: 'Ear' },
      { id: 'ear-r', d: 'M120,95L140,50L162,95Z', defaultFill: '#f9a8d4', label: 'Ear' },
      {
        id: 'face',
        d: 'M110,128m-52,0a52,52,0,1,0,104,0a52,52,0,1,0-104,0',
        defaultFill: '#fda4af',
        label: 'Face',
      },
      {
        id: 'eye-l',
        d: 'M90,110m-9,0a9,9,0,1,0,18,0a9,9,0,1,0-18,0',
        defaultFill: '#0f172a',
        label: 'Eye',
      },
      {
        id: 'eye-r',
        d: 'M130,110m-9,0a9,9,0,1,0,18,0a9,9,0,1,0-18,0',
        defaultFill: '#0f172a',
        label: 'Eye',
      },
      { id: 'nose', d: 'M104,128L110,140L116,128Z', defaultFill: '#f43f5e', label: 'Nose' },
    ],
  },
  {
    id: 'cupcake',
    title: 'Cupcake',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'bg', d: 'M0,0H220V220H0Z', defaultFill: '#fff7ed', label: 'Background' },
      {
        id: 'wrapper',
        d: 'M68,205L90,128H130L152,205H68Z',
        defaultFill: '#fb923c',
        label: 'Wrapper',
      },
      {
        id: 'frosting',
        d: 'M55,128Q110,35 165,128Z',
        defaultFill: '#f9a8d4',
        label: 'Frosting',
      },
      {
        id: 'cherry',
        d: 'M110,50m-12,0a12,12,0,1,0,24,0a12,12,0,1,0-24,0',
        defaultFill: '#ef4444',
        label: 'Cherry',
      },
    ],
  },
  {
    id: 'airplane',
    title: 'Airplane',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'sky', d: 'M0,0H220V220H0Z', defaultFill: '#bae6fd', label: 'Sky' },
      { id: 'tail', d: 'M28,108L10,80L32,100Z', defaultFill: '#94a3b8', label: 'Tail' },
      { id: 'body', d: 'M32,100H198V132H32V100Z', defaultFill: '#e2e8f0', label: 'Plane' },
      { id: 'wing', d: 'M95,125L120,200L150,120Z', defaultFill: '#64748b', label: 'Wing' },
      {
        id: 'window',
        d: 'M155,108H180V128H155V108Z',
        defaultFill: '#0ea5e9',
        label: 'Window',
      },
    ],
  },
  {
    id: 'turtle',
    title: 'Turtle',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'water', d: 'M0,0H220V220H0Z', defaultFill: '#a5f3fc', label: 'Water' },
      {
        id: 'head',
        d: 'M110,50m-18,0a18,16,0,1,0,36,0a18,16,0,1,0-36,0',
        defaultFill: '#4ade80',
        label: 'Head',
      },
      {
        id: 'shell',
        d: 'M110,120m-58,-32a58,38,0,1,0,116,0a58,38,0,1,0-116,0',
        defaultFill: '#16a34a',
        label: 'Shell',
      },
      { id: 'leg-n', d: 'M100,32L90,50L120,50L100,32Z', defaultFill: '#22c55e', label: 'Leg' },
      { id: 'leg-s', d: 'M100,195L100,175L120,185L100,195Z', defaultFill: '#22c55e', label: 'Leg' },
      { id: 'leg-w', d: 'M32,120L20,100L20,130L32,120Z', defaultFill: '#22c55e', label: 'Leg' },
      { id: 'leg-e', d: 'M188,120L200,100L200,130L188,120Z', defaultFill: '#22c55e', label: 'Leg' },
    ],
  },
  {
    id: 'castle',
    title: 'Castle',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'sky', d: 'M0,0H220V175H0Z', defaultFill: '#bfdbfe', label: 'Sky' },
      { id: 'grass', d: 'M0,175H220V220H0Z', defaultFill: '#86efac', label: 'Grass' },
      { id: 'tower-l', d: 'M30,200H40V60H30V200ZM40,50H50V60H40V50Z', defaultFill: '#94a3b8', label: 'Tower' },
      { id: 'tower-mid', d: 'M75,200H90V50H80V200H75Z', defaultFill: '#cbd5e1', label: 'Main tower' },
      { id: 'tower-r', d: 'M170,200H180V60H190V200H170Z', defaultFill: '#94a3b8', label: 'Tower' },
      { id: 'door', d: 'M100,200H120V150H100V200Z', defaultFill: '#78350f', label: 'Door' },
      { id: 'window', d: 'M102,100H118V118H102V100Z', defaultFill: '#fef08a', label: 'Window' },
    ],
  },
  {
    id: 'heart',
    title: 'Heart',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'bg', d: 'M0,0H220V220H0Z', defaultFill: '#fff1f2', label: 'Background' },
      {
        id: 'heart',
        d: 'M110,195C20,100 0,20 0,55C0,5 100,-5 110,80C120,-5 220,5 220,55C220,20 200,100 110,195Z',
        defaultFill: '#fb7185',
        label: 'Heart',
      },
    ],
  },
  {
    id: 'lollipop',
    title: 'Lollipop',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'bg', d: 'M0,0H220V220H0Z', defaultFill: '#fae8ff', label: 'Background' },
      {
        id: 'candy',
        d: 'M110,88m-48,0a48,48,0,1,0,96,0a48,48,0,1,0-96,0',
        defaultFill: '#e879f9',
        label: 'Candy',
      },
      { id: 'stick', d: 'M102,200H118V128H102V200Z', defaultFill: '#d6d3d1', label: 'Stick' },
    ],
  },
  {
    id: 'penguin',
    title: 'Penguin',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'bg', d: 'M0,0H220V220H0Z', defaultFill: '#e0f2fe', label: 'Background' },
      {
        id: 'body',
        d: 'M110,125m-48,-5a48,60,0,1,0,96,0a48,60,0,1,0-96,0',
        defaultFill: '#0f172a',
        label: 'Body',
      },
      { id: 'belly', d: 'M110,135m-28,-5a28,35,0,1,0,56,0a28,35,0,1,0-56,0', defaultFill: '#f8fafc', label: 'Belly' },
      {
        id: 'beak',
        d: 'M98,60L110,80L122,60Z',
        defaultFill: '#f97316',
        label: 'Beak',
      },
      { id: 'eye-l', d: 'M95,48m-8,0a8,8,0,1,0,16,0a8,8,0,1,0-16,0', defaultFill: '#ffffff', label: 'Eye' },
      { id: 'eye-r', d: 'M125,48m-8,0a8,8,0,1,0,16,0a8,8,0,1,0-16,0', defaultFill: '#ffffff', label: 'Eye' },
    ],
  },
  {
    id: 'ufo',
    title: 'U.F.O.',
    viewBox: '0 0 220 220',
    stroke: STROKE,
    regions: [
      { id: 'sky', d: 'M0,0H220V220H0Z', defaultFill: '#312e81', label: 'Sky' },
      { id: 'saucer', d: 'M20,100Q110,150,200,100L195,120H25L20,100Z', defaultFill: '#94a3b8', label: 'Ship' },
      { id: 'dome', d: 'M70,100Q110,20 150,100Z', defaultFill: '#38bdf8', label: 'Dome' },
      {
        id: 'light',
        d: 'M90,120L110,200L130,120Z',
        defaultFill: '#a5f3fc',
        label: 'Beam',
      },
      { id: 'glow1', d: 'M50,128m-5,0a5,5,0,1,0,10,0a5,5,0,1,0-10,0', defaultFill: '#fef08a', label: 'Light' },
      { id: 'glow2', d: 'M110,128m-5,0a5,5,0,1,0,10,0a5,5,0,1,0-10,0', defaultFill: '#f472b6', label: 'Light' },
      { id: 'glow3', d: 'M170,128m-5,0a5,5,0,1,0,10,0a5,5,0,1,0-10,0', defaultFill: '#4ade80', label: 'Light' },
    ],
  },
];

export function getDefaultFills(templateId: string): Record<string, string> {
  const t = COLORING_TEMPLATES.find((x) => x.id === templateId) ?? COLORING_TEMPLATES[0];
  return Object.fromEntries(t.regions.map((r) => [r.id, r.defaultFill]));
}
