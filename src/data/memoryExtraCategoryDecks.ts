import type { MemoryCardItem } from './memoryCardItems';

/** Decks for memory categories beyond the original four (animals, food, nature, school). */

export const vehiclesDeck: MemoryCardItem[] = [
  { id: 'car', name: 'Car', emoji: '🚗', description: 'Beep beep! A ride for road trips and sing-alongs.' },
  { id: 'bus', name: 'Bus', emoji: '🚌', description: 'Big windows and room for lots of passengers.' },
  { id: 'ambulance', name: 'Ambulance', emoji: '🚑', description: 'Flashing lights that help people in a hurry.' },
  { id: 'fire-truck', name: 'Fire truck', emoji: '🚒', description: 'Brave red truck with a ladder and hose.' },
  { id: 'police-car', name: 'Police car', emoji: '🚓', description: 'Keeps neighborhoods safe with a woop-woop siren.' },
  { id: 'bicycle', name: 'Bicycle', emoji: '🚲', description: 'Pedal power—wind in your hair, bell on the handlebars.' },
  { id: 'airplane', name: 'Airplane', emoji: '✈️', description: 'Soars above the clouds to faraway places.' },
  { id: 'train', name: 'Train', emoji: '🚂', description: 'Click-clack on the tracks—next stop, adventure!' },
  { id: 'ship', name: 'Ship', emoji: '🚢', description: 'Sails the ocean with flags flapping in the breeze.' },
  { id: 'tractor', name: 'Tractor', emoji: '🚜', description: 'Chunky tires that work hard on the farm.' },
  { id: 'helicopter', name: 'Helicopter', emoji: '🚁', description: 'Whirly blades and vertical takeoff—zoom!' },
  { id: 'scooter', name: 'Scooter', emoji: '🛴', description: 'Kick, glide, and zip around the sidewalk.' },
];

export const householdDeck: MemoryCardItem[] = [
  { id: 'couch', name: 'Couch', emoji: '🛋️', description: 'Soft cushions for movie night and cozy cuddles.' },
  { id: 'chair', name: 'Chair', emoji: '🪑', description: 'Pull it up to the table for dinner or drawing.' },
  { id: 'bed', name: 'Bed', emoji: '🛏️', description: 'Fluffy blankets and dreams under the covers.' },
  { id: 'door', name: 'Door', emoji: '🚪', description: 'Knock knock—who is ready for a new room?' },
  { id: 'window', name: 'Window', emoji: '🪟', description: 'Sunshine peeks in and rain taps on the glass.' },
  { id: 'mirror', name: 'Mirror', emoji: '🪞', description: 'Shows your smile and silly faces.' },
  { id: 'lamp', name: 'Lamp', emoji: '💡', description: 'A cozy glow for puzzles, books, and late-night giggles.' },
  { id: 'broom', name: 'Broom', emoji: '🧹', description: 'Whoosh—sweep the dust into a tidy pile.' },
  { id: 'bathtub', name: 'Bathtub', emoji: '🛁', description: 'Bubbles, rubber ducks, and splashy fun.' },
  { id: 'shower', name: 'Shower', emoji: '🚿', description: 'Warm sprinkles that rinse off a busy day.' },
  { id: 'television', name: 'TV', emoji: '📺', description: 'Cartoons, nature shows, and family movie time.' },
  { id: 'basket', name: 'Laundry basket', emoji: '🧺', description: 'Towels and socks go in—clean clothes come out!' },
];

export const clothingDeck: MemoryCardItem[] = [
  { id: 'tshirt', name: 'T-shirt', emoji: '👕', description: 'Comfy cotton for playdates and playground races.' },
  { id: 'jeans', name: 'Jeans', emoji: '👖', description: 'Tough pockets for treasures and tiny rocks.' },
  { id: 'dress', name: 'Dress', emoji: '👗', description: 'Twirl-ready for parties and pretend tea time.' },
  { id: 'necktie', name: 'Necktie', emoji: '👔', description: 'Snazzy stripes for picture day or dress-up.' },
  { id: 'sneaker', name: 'Sneakers', emoji: '👟', description: 'Bouncy soles for hopscotch and tag.' },
  { id: 'socks', name: 'Socks', emoji: '🧦', description: 'Stripes, dots, or dinosaurs on your toes.' },
  { id: 'cap', name: 'Cap', emoji: '🧢', description: 'Shade for sunny walks and big-league dreams.' },
  { id: 'scarf', name: 'Scarf', emoji: '🧣', description: 'Cozy wrap when the breeze gets nippy.' },
  { id: 'gloves', name: 'Gloves', emoji: '🧤', description: 'Keep fingers toasty while you build a snowball.' },
  { id: 'boots', name: 'Boots', emoji: '🥾', description: 'Stomp through puddles like a brave explorer.' },
  { id: 'sandal', name: 'Sandals', emoji: '🩴', description: 'Open-toe freedom for beach days and sprinklers.' },
  { id: 'glasses', name: 'Glasses', emoji: '👓', description: 'Clear lenses for reading every chalkboard letter.' },
];

export const sportsDeck: MemoryCardItem[] = [
  { id: 'soccer', name: 'Soccer ball', emoji: '⚽', description: 'Kick, pass, goal—cheers from the sidelines!' },
  { id: 'basketball', name: 'Basketball', emoji: '🏀', description: 'Dribble, shoot, swish through the hoop.' },
  { id: 'tennis', name: 'Tennis', emoji: '🎾', description: 'Pop! Back and forth across the bright court.' },
  { id: 'football', name: 'Football', emoji: '🏈', description: 'Spiral throws and end-zone dances.' },
  { id: 'baseball', name: 'Baseball', emoji: '⚾', description: 'Crack of the bat and a sprint to first base.' },
  { id: 'volleyball', name: 'Volleyball', emoji: '🏐', description: 'Bump, set, spike over the net!' },
  { id: 'bowling', name: 'Bowling', emoji: '🎳', description: 'Roll the ball—will you get a strike?' },
  { id: 'golf', name: 'Golf', emoji: '⛳', description: 'Tiny ball, big green, careful putt.' },
  { id: 'hockey', name: 'Hockey', emoji: '🏒', description: 'Glide on ice with a stick and a puck.' },
  { id: 'badminton', name: 'Badminton', emoji: '🏸', description: 'Feather shuttle zooms over the net.' },
  { id: 'medal', name: 'Medal', emoji: '🏅', description: 'Shiny reward for trying your very best.' },
  { id: 'trophy', name: 'Trophy', emoji: '🏆', description: 'Raise it high—you earned that sparkle!' },
];

export const colorsShapesDeck: MemoryCardItem[] = [
  { id: 'red-heart', name: 'Red heart', emoji: '❤️', description: 'A bold red shape full of love and hugs.' },
  { id: 'orange-circle', name: 'Orange circle', emoji: '🟠', description: 'Round and citrus-bright like a little sun.' },
  { id: 'yellow-circle', name: 'Yellow circle', emoji: '🟡', description: 'Sunny dot that makes you think of lemons.' },
  { id: 'green-square', name: 'Green square', emoji: '🟩', description: 'Four even sides like a patch of grass.' },
  { id: 'blue-square', name: 'Blue square', emoji: '🟦', description: 'Cool corners like a swimming pool tile.' },
  { id: 'purple-square', name: 'Purple square', emoji: '🟪', description: 'Royal blocks for building rainbow towers.' },
  { id: 'brown-square', name: 'Brown square', emoji: '🟫', description: 'Earth-tone tile—think tree bark and cocoa.' },
  { id: 'black-square', name: 'Black square', emoji: '⬛', description: 'A dark neat shape—like outer space on a card.' },
  { id: 'white-square', name: 'White square', emoji: '⬜', description: 'Clean and bright like fresh drawing paper.' },
  { id: 'orange-diamond', name: 'Orange diamond', emoji: '🔶', description: 'Pointy sparkler shape with zingy color.' },
  { id: 'blue-diamond', name: 'Blue diamond', emoji: '🔷', description: 'Cool crystal corners to match the sky.' },
  { id: 'star', name: 'Star', emoji: '⭐', description: 'Five points of shine—make a wish!' },
];

export const numbersDeck: MemoryCardItem[] = [
  { id: 'n0', name: 'Zero', emoji: '0️⃣', description: 'The round hero that means “none yet”—still important!' },
  { id: 'n1', name: 'One', emoji: '1️⃣', description: 'A single step, one candle, one big smile.' },
  { id: 'n2', name: 'Two', emoji: '2️⃣', description: 'A pair of shoes, twins, or best-friend high-fives.' },
  { id: 'n3', name: 'Three', emoji: '3️⃣', description: 'Triangle corners, three little pigs, count with me!' },
  { id: 'n4', name: 'Four', emoji: '4️⃣', description: 'Four seasons, four wheels on a family car.' },
  { id: 'n5', name: 'Five', emoji: '5️⃣', description: 'High-five fingers on one hand—wiggle them!' },
  { id: 'n6', name: 'Six', emoji: '6️⃣', description: 'Half a dozen cookies if you are lucky.' },
  { id: 'n7', name: 'Seven', emoji: '7️⃣', description: 'Lucky number for rainbows with seven stripes.' },
  { id: 'n8', name: 'Eight', emoji: '8️⃣', description: 'Snowman shape—two circles stacked up.' },
  { id: 'n9', name: 'Nine', emoji: '9️⃣', description: 'Almost to ten—one more and you are there!' },
  { id: 'n10', name: 'Ten', emoji: '🔟', description: 'Double digits—count all your toes plus fingers.' },
  { id: 'n100', name: 'Hundred', emoji: '💯', description: 'Perfect score energy—keep up the awesome!' },
];

function letterCard(
  letter: string,
  emoji: string,
  id: string,
  description: string
): MemoryCardItem {
  return { id, name: `Letter ${letter}`, emoji, description };
}

export const alphabetDeck: MemoryCardItem[] = [
  letterCard('A', 'Ⓐ', 'letter-a', 'The first letter in “apple,” “astronaut,” and “awesome.”'),
  letterCard('B', 'Ⓑ', 'letter-b', 'Buzzes like a bee and starts “balloon” and “book.”'),
  letterCard('C', 'Ⓒ', 'letter-c', 'Curvy letter for “cat,” “cake,” and “cloud.”'),
  letterCard('D', 'Ⓓ', 'letter-d', 'Drum sounds and “dog,” “dance,” and “dinosaur.”'),
  letterCard('E', 'Ⓔ', 'letter-e', 'Every elephant enjoys this elegant letter.'),
  letterCard('F', 'Ⓕ', 'letter-f', 'Fun, friends, and fluttering flags start here.'),
  letterCard('G', 'Ⓖ', 'letter-g', 'Giggles, grapes, and glitter begin with G.'),
  letterCard('H', 'Ⓗ', 'letter-h', 'Hello, hats, and hopping rabbits use this one.'),
  letterCard('I', 'Ⓘ', 'letter-i', 'Icy igloos and itchy sweaters share this slim letter.'),
  letterCard('J', 'Ⓙ', 'letter-j', 'Jellybeans, jokes, and jumping jacks start with J.'),
  letterCard('K', 'Ⓚ', 'letter-k', 'Kites, kangaroos, and kind hearts need a K.'),
  letterCard('L', 'Ⓛ', 'letter-l', 'Lemons, ladybugs, and lullabies love this letter.'),
];

export const spaceDeck: MemoryCardItem[] = [
  { id: 'rocket', name: 'Rocket', emoji: '🚀', description: 'Blast off! A fiery trail toward the stars.' },
  { id: 'ufo', name: 'Flying saucer', emoji: '🛸', description: 'A shiny disc zipping through sci-fi skies.' },
  { id: 'earth', name: 'Earth', emoji: '🌍', description: 'Our blue-and-green home floating in space.' },
  { id: 'moon', name: 'Moon', emoji: '🌕', description: 'Round and glowy—watches us while we sleep.' },
  { id: 'star', name: 'Star', emoji: '⭐', description: 'Twinkle-twinkle, way up high in the night.' },
  { id: 'comet', name: 'Comet', emoji: '☄️', description: 'Icy traveler with a long glowing tail.' },
  { id: 'saturn', name: 'Ringed planet', emoji: '🪐', description: 'Gorgeous rings made of ice and rock chips.' },
  { id: 'satellite', name: 'Satellite', emoji: '🛰️', description: 'Beep-beep helper that maps weather and TV.' },
  { id: 'alien', name: 'Alien', emoji: '👽', description: 'Friendly visitor from a faraway world.' },
  { id: 'milky-way', name: 'Milky Way', emoji: '🌌', description: 'A swirl of billions of suns and stories.' },
  { id: 'shooting-star', name: 'Shooting star', emoji: '🌠', description: 'Quick silver streak—make a speedy wish!' },
  { id: 'telescope', name: 'Telescope', emoji: '🔭', description: 'Peek closer at craters, moons, and nebulas.' },
];

export const jobsDeck: MemoryCardItem[] = [
  { id: 'doctor', name: 'Doctor', emoji: '🧑‍⚕️', description: 'Helps you feel better with checkups and care.' },
  { id: 'firefighter', name: 'Firefighter', emoji: '🧑‍🚒', description: 'Brave hero who climbs ladders and saves the day.' },
  { id: 'police', name: 'Police officer', emoji: '👮', description: 'Keeps streets safe and waves with a smile.' },
  { id: 'chef', name: 'Chef', emoji: '🧑‍🍳', description: 'Whisks, spices, and sizzling pans of yum.' },
  { id: 'teacher', name: 'Teacher', emoji: '🧑‍🏫', description: 'Shares stories, chalkboard tricks, and big ideas.' },
  { id: 'farmer', name: 'Farmer', emoji: '🧑‍🌾', description: 'Plants seeds and tends animals on the farm.' },
  { id: 'pilot', name: 'Pilot', emoji: '🧑‍✈️', description: 'Guides airplanes gently through the clouds.' },
  { id: 'scientist', name: 'Scientist', emoji: '🧑‍🔬', description: 'Mixes potions, peeks in microscopes, asks “why?”' },
  { id: 'artist', name: 'Artist', emoji: '🧑‍🎨', description: 'Paints rainbows, sculpts clay, dreams in color.' },
  { id: 'builder', name: 'Builder', emoji: '👷', description: 'Helmets, blueprints, and towers that touch the sky.' },
  { id: 'mechanic', name: 'Mechanic', emoji: '🧑‍🔧', description: 'Fixes engines so cars purr like kittens.' },
  { id: 'judge', name: 'Judge', emoji: '🧑‍⚖️', description: 'Listens carefully and helps rules stay fair.' },
];

export const musicDeck: MemoryCardItem[] = [
  { id: 'notes', name: 'Musical notes', emoji: '🎵', description: 'Do-re-mi dancing off the page.' },
  { id: 'guitar', name: 'Guitar', emoji: '🎸', description: 'Strum a chord—campfire singalong time!' },
  { id: 'piano', name: 'Piano', emoji: '🎹', description: 'Black and white keys like a musical staircase.' },
  { id: 'mic', name: 'Microphone', emoji: '🎤', description: 'Sing loud, sing proud, hear your echo.' },
  { id: 'drums', name: 'Drums', emoji: '🥁', description: 'Boom tap crash—keep the beat marching.' },
  { id: 'trumpet', name: 'Trumpet', emoji: '🎺', description: 'Brassy fanfares for parades and parties.' },
  { id: 'violin', name: 'Violin', emoji: '🎻', description: 'Sweet strings that swoop like birds.' },
  { id: 'saxophone', name: 'Saxophone', emoji: '🎷', description: 'Smooth jazz slides and bouncy marching tunes.' },
  { id: 'accordion', name: 'Accordion', emoji: '🪗', description: 'Squeeze in, squeeze out—folk-dance music box.' },
  { id: 'score', name: 'Sheet music', emoji: '🎼', description: 'Lines and squiggles that musicians follow together.' },
  { id: 'maracas', name: 'Maracas', emoji: '🪇', description: 'Shake-shake rhythm for sunny celebrations.' },
  { id: 'headphones', name: 'Headphones', emoji: '🎧', description: 'Cozy cups for your favorite playlist.' },
];

export const toysDeck: MemoryCardItem[] = [
  { id: 'teddy', name: 'Teddy bear', emoji: '🧸', description: 'Huggable friend for tea parties and nap time.' },
  { id: 'yoyo', name: 'Yo-yo', emoji: '🪀', description: 'Up, down, spin—classic trick on a string.' },
  { id: 'puzzle', name: 'Puzzle piece', emoji: '🧩', description: 'Click pieces together to reveal a picture.' },
  { id: 'gamepad', name: 'Game controller', emoji: '🎮', description: 'Buttons and joysticks for pixel adventures.' },
  { id: 'kite', name: 'Kite', emoji: '🪁', description: 'Tails flutter high when the wind says go.' },
  { id: 'dice', name: 'Dice', emoji: '🎲', description: 'Roll for board games and silly surprises.' },
  { id: 'nesting-dolls', name: 'Nesting dolls', emoji: '🪆', description: 'Tiny dolls hiding inside bigger smiling dolls.' },
  { id: 'pinata', name: 'Piñata', emoji: '🪅', description: 'Colorful candy treasure inside a papery shell.' },
  { id: 'carousel', name: 'Carousel horse', emoji: '🎠', description: 'Painted pony going round and round to the band.' },
  { id: 'boomerang', name: 'Boomerang', emoji: '🪃', description: 'Toss it right and it zooms back like magic.' },
  { id: 'balloon', name: 'Balloon', emoji: '🎈', description: 'Floaty friend tied to your wrist at the fair.' },
  { id: 'joker-card', name: 'Joker card', emoji: '🃏', description: 'Wild card for tricks, laughs, and goofy rules.' },
];

export const dinosaursDeck: MemoryCardItem[] = [
  { id: 't-rex', name: 'T-Rex', emoji: '🦖', description: 'Tiny arms, giant roar—king of the movie screen.' },
  { id: 'sauropod', name: 'Long-neck dino', emoji: '🦕', description: 'Reaches the treetops like a living crane.' },
  { id: 'crocodile', name: 'Ancient croc', emoji: '🐊', description: 'Toothy cousin from rivers older than hills.' },
  { id: 'lizard', name: 'Lizard', emoji: '🦎', description: 'Quick scales and a flicky tail—mini dino vibes.' },
  { id: 'dragon', name: 'Dragon', emoji: '🐉', description: 'Storybook giant that guards glittering caves.' },
  { id: 'fossil', name: 'Fossil bone', emoji: '🦴', description: 'Stone puzzle piece from a world before humans.' },
  { id: 'dodo', name: 'Dodo bird', emoji: '🦤', description: 'Chubby extinct walker—learn from its story.' },
  { id: 'turtle', name: 'Ancient turtle', emoji: '🐢', description: 'Shell armor that outlasted whole epochs.' },
  { id: 'scorpion', name: 'Scorpion', emoji: '🦂', description: 'Pinchy prehistoric survivor under desert stones.' },
  { id: 'volcano', name: 'Volcano', emoji: '🌋', description: 'Fiery mountain that shaped dino-era skies.' },
  { id: 'rock', name: 'Volcanic rock', emoji: '🪨', description: 'Cooled lava turned hard as a dino footprint.' },
  { id: 'moai', name: 'Stone statue', emoji: '🗿', description: 'Giant head watching the ocean for centuries.' },
];

export const bugsDeck: MemoryCardItem[] = [
  { id: 'ladybug', name: 'Ladybug', emoji: '🐞', description: 'Red shell with dots—good luck on a leaf.' },
  { id: 'bee', name: 'Bee', emoji: '🐝', description: 'Buzzes flower to flower and makes honey gold.' },
  { id: 'butterfly', name: 'Butterfly', emoji: '🦋', description: 'Wings like stained glass in the garden.' },
  { id: 'caterpillar', name: 'Caterpillar', emoji: '🐛', description: 'Inchy fuzzy tube on its way to wings.' },
  { id: 'beetle', name: 'Beetle', emoji: '🪲', description: 'Shiny armor and scritchy little legs.' },
  { id: 'cricket', name: 'Cricket', emoji: '🦗', description: 'Chirp-chirp concerts on summer nights.' },
  { id: 'ant', name: 'Ant', emoji: '🐜', description: 'Teamwork tiny—carries crumbs ten times its size.' },
  { id: 'spider', name: 'Spider', emoji: '🕷️', description: 'Eight legs weave sticky glitter traps.' },
  { id: 'fly', name: 'Fly', emoji: '🪰', description: 'Zig-zag zoomer scouting picnic treats.' },
  { id: 'worm', name: 'Worm', emoji: '🪱', description: 'Squiggly soil helper—wiggles, wiggles, aerates.' },
  { id: 'snail', name: 'Snail', emoji: '🐌', description: 'Spiral house on its back—slow and steady wins.' },
  { id: 'cockroach', name: 'Cockroach', emoji: '🪳', description: 'Super survivor—lives in stories and cartoons.' },
];

export const fastFoodDeck: MemoryCardItem[] = [
  { id: 'burger', name: 'Burger', emoji: '🍔', description: 'Stacked patty, melty cheese, squishy bun—yum!' },
  { id: 'fries', name: 'Fries', emoji: '🍟', description: 'Crispy golden sticks made for dipping.' },
  { id: 'hot-dog', name: 'Hot dog', emoji: '🌭', description: 'Park snack with mustard zigzags and cheers.' },
  { id: 'pizza-slice', name: 'Pizza slice', emoji: '🍕', description: 'Cheese pull perfection in triangle form.' },
  { id: 'soda', name: 'Soda cup', emoji: '🥤', description: 'Cold fizz through a stripy straw.' },
  { id: 'taco-fast', name: 'Taco', emoji: '🌮', description: 'Crunchy shell, spicy bits, napkin required.' },
  { id: 'burrito', name: 'Burrito', emoji: '🌯', description: 'Wrapped hug of beans, rice, and flavor.' },
  { id: 'sandwich', name: 'Sandwich', emoji: '🥪', description: 'Layers of lunch squished between two toasts.' },
  { id: 'pretzel', name: 'Pretzel', emoji: '🥨', description: 'Twisty salt sparkle—mall food court classic.' },
  { id: 'popcorn', name: 'Popcorn', emoji: '🍿', description: 'Buttery puffs for movies and sleepovers.' },
  { id: 'donut-fast', name: 'Donut', emoji: '🍩', description: 'Sweet ring with frosting and sprinkles.' },
  { id: 'chicken-leg', name: 'Fried chicken', emoji: '🍗', description: 'Crispy drumstick picnic favorite.' },
];

export const weatherDeck: MemoryCardItem[] = [
  { id: 'clear-sun', name: 'Sunny day', emoji: '☀️', description: 'Bright beams perfect for sunscreen and cartwheels.' },
  { id: 'partly-cloud', name: 'Partly cloudy', emoji: '⛅', description: 'Sun and fluff together—shade then shine.' },
  { id: 'sun-small-cloud', name: 'Mostly sunny', emoji: '🌤️', description: 'Tiny cloud hat—still shorts weather.' },
  { id: 'sun-big-cloud', name: 'Mostly cloudy', emoji: '🌥️', description: 'Big gray blanket—maybe a sweater day.' },
  { id: 'sun-shower', name: 'Sun shower', emoji: '🌦️', description: 'Rainbow weather—wet grass, warm light.' },
  { id: 'cloud', name: 'Cloud', emoji: '☁️', description: 'Fluffy sky pillow drifting slow and lazy.' },
  { id: 'rain-cloud', name: 'Rain', emoji: '🌧️', description: 'Drippy drops that plink on umbrellas.' },
  { id: 'storm', name: 'Thunderstorm', emoji: '⛈️', description: 'Booming drums and zigzag lightning sketches.' },
  { id: 'lightning', name: 'Lightning', emoji: '🌩️', description: 'Electric branches flash across purple clouds.' },
  { id: 'snowflake', name: 'Snow', emoji: '❄️', description: 'Tiny ice stars that pile into snow forts.' },
  { id: 'snowman', name: 'Snowman', emoji: '☃️', description: 'Carrot nose, scarf, and a chilly high-five.' },
  { id: 'tornado', name: 'Tornado', emoji: '🌪️', description: 'Spinning gray funnel—stay safe indoors!' },
  { id: 'fog', name: 'Fog', emoji: '🌫️', description: 'Misty curtain that hides the streetlamps.' },
  { id: 'wind', name: 'Wind', emoji: '💨', description: 'Whoosh! Leaves race and kites tug their strings.' },
];
