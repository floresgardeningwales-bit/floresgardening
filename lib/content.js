// Public-site content in one place, so wording can change without touching layout.

export const regularCare = [
  'Weeding and border care',
  'Lawn mowing and edging',
  'Hedge trimming',
  'Pruning shrubs and climbers',
  'Seasonal cutbacks',
  'Leaf clearing and tidying',
  'Planting',
];

export const oneOffJobs = [
  'Garden clearances',
  'Overgrowth and seasonal resets',
  'Fruit-tree pruning',
  'Shrub renovation',
  'Border refreshes and new planting',
];

export const serviceGroups = [
  {
    id: 'regular',
    title: 'Regular care',
    intro: 'Fortnightly, monthly or seasonal visits that keep the garden on track without it taking over your weekends.',
    services: [
      ['General maintenance', 'The steady work that keeps a garden looking cared for: weeding, tidying, deadheading and keeping paths and edges clear.'],
      ['Borders and beds', 'Weeding, mulching, dividing, cutting back and filling gaps so beds stay healthy through the year.'],
      ['Lawns', 'Mowing, edging and leaf clearing. A longer patch can be left for wildlife if you’d like one.'],
      ['Hedges', 'Shaping and seasonal trimming of garden hedges, checked for active nests before we cut.'],
      ['Pruning', 'Shrubs, climbers and roses pruned at the right time of year for the plant, not just whenever we’re passing.'],
      ['Planting', 'Seasonal planting and new additions, chosen to suit your soil, light and how much upkeep you want.'],
    ],
  },
  {
    id: 'one-off',
    title: 'One-off and specialist',
    intro: 'For a garden that has got away from you, or a job that needs doing properly once.',
    services: [
      ['Garden clearances', 'Overgrown beds, brambles and neglected corners cleared back so you can see what you’ve got.'],
      ['Seasonal resets', 'A thorough cut-back and tidy at the turn of the season, ready for regular care or for you to take over.'],
      ['Fruit-tree pruning', 'Apples and pears pruned in winter, plums and cherries in summer. Garden-scale trees only.'],
      ['Shrub renovation', 'Overgrown shrubs brought back into shape, sometimes over two seasons so the plant recovers well.'],
    ],
  },
  {
    id: 'wildlife',
    title: 'Wildlife-friendly gardening',
    intro: 'Part of how we work on every visit, and something we can go further with if you want to.',
    services: [
      ['Pollinator planting', 'Flowers that feed bees, hoverflies and butterflies from early spring into autumn.'],
      ['Habitat-aware tidying', 'Seedheads, leaf piles and hollow stems left where they help, cleared where they don’t.'],
      ['Wilder corners', 'A log pile, a longer-grass patch or a native hedge planted alongside the tidy parts.'],
    ],
  },
];

export const practices = [
  {
    icon: 'seedhead',
    title: 'Cutbacks that leave something behind',
    text: 'Where you’re happy to, we leave some seedheads and hollow stems standing over winter for birds and overwintering insects.',
  },
  {
    icon: 'bird',
    title: 'Hedges checked before they’re cut',
    text: 'We look for active nests before trimming and plan bigger hedge cuts around the nesting season.',
  },
  {
    icon: 'bee',
    title: 'Planting for pollinators',
    text: 'Suggestions for flowers that feed bees and other pollinators across the seasons, chosen to suit your soil and light.',
  },
  {
    icon: 'log',
    title: 'A wilder corner, if you want one',
    text: 'A leaf pile, log heap or patch of longer grass can sit quietly alongside a neat lawn and borders.',
  },
];

export const seasons = [
  {
    id: 'winter',
    name: 'Winter',
    months: 'December to February',
    months_idx: [11, 0, 1],
    note: 'The garden is resting, which makes it the right time for structural work.',
    jobs: [
      ['Fruit-tree pruning', 'Apples and pears are pruned while dormant.'],
      ['Shrub and hedge shaping', 'Easier to see the structure once the leaves are down.'],
      ['Planning', 'Talk through what you’d like the garden to do next year.'],
      ['Leaving shelter', 'Leaf litter in borders gives hibernating insects somewhere to sleep.'],
    ],
  },
  {
    id: 'spring',
    name: 'Spring',
    months: 'March to May',
    months_idx: [2, 3, 4],
    note: 'Everything wakes up at once. Getting ahead now saves a lot of work later.',
    jobs: [
      ['Borders refreshed', 'Last year’s stems cut back, beds weeded and mulched.'],
      ['Planting', 'New perennials and pollinator plants go in as the soil warms.'],
      ['First mows', 'Lawns brought back gently, edges sharpened.'],
      ['Nest checks', 'Hedges are looked over before any trimming in nesting season.'],
    ],
  },
  {
    id: 'summer',
    name: 'Summer',
    months: 'June to August',
    months_idx: [5, 6, 7],
    note: 'Peak growing season, when regular visits make the biggest difference.',
    jobs: [
      ['Regular maintenance', 'Weeding, deadheading and mowing to keep up with growth.'],
      ['Stone-fruit pruning', 'Plums and cherries are pruned in summer to reduce disease risk.'],
      ['Hedge trimming', 'Once nesting has finished, hedges get their main cut.'],
      ['Watering advice', 'Simple ways to help plants through dry spells.'],
    ],
  },
  {
    id: 'autumn',
    name: 'Autumn',
    months: 'September to November',
    months_idx: [8, 9, 10],
    note: 'Tidying up without tidying everything away.',
    jobs: [
      ['Selective cutbacks', 'Spent growth cleared, good seedheads left standing for birds.'],
      ['Leaf clearing', 'Lawns and paths cleared; leaves can be piled for leaf mould.'],
      ['Bulb planting', 'Spring bulbs in for early food for bees.'],
      ['Clearances', 'A good time to reset an overgrown garden before winter.'],
    ],
  },
];

export const process = [
  ['Tell us about your garden', 'Your postcode, what needs doing and photos if you have them.'],
  ['We visit and quote', 'A clear quote covering what’s included, how often, and how green waste will be handled.'],
  ['We get to work', 'Regular visits or a one-off job, with a note on what we did and what’s coming up.'],
  ['Keep it going', 'Adjust visits through the seasons, or get in touch again whenever you need a hand.'],
];

export const places = ['Cardiff', 'Penarth', 'Dinas Powys', 'Sully', 'Barry', 'Rhoose', 'Cowbridge', 'Llantwit Major', 'Radyr', 'Llandaff', 'Whitchurch', 'Lisvane'];

// Outward codes treated as "our usual area". The service radius isn't final yet,
// so the checker always invites an enquiry rather than turning anyone away.
export const usualOutwardCodes = ['CF3', 'CF5', 'CF10', 'CF11', 'CF14', 'CF15', 'CF23', 'CF24', 'CF61', 'CF62', 'CF63', 'CF64', 'CF71'];

export const enquiryServices = [
  'Regular garden maintenance',
  'Hedge trimming',
  'Fruit tree pruning',
  'Planting & beds',
  'Garden clearance',
  'Wildlife-friendly gardening',
  'Something else',
];

export const enquiryFrequencies = ['One-off', 'Fortnightly', 'Monthly', 'Seasonal', 'Not sure yet'];
