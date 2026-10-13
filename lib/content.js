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
  { id: 'regular', title: 'Regular garden care', intro: 'Keep the garden looking cared for without spending every weekend catching up. Fortnightly, monthly or seasonal visits, shaped around your space.', services: [
    ['Lawns & edges', 'Mowing and edging to keep the lawn manageable and give the garden a tidy finish.'],
    ['Weeding & border care', 'The steady work that makes a difference: weeding, deadheading, mulching and keeping beds in good condition.'],
    ['Seasonal tidying', 'Leaf clearing, selective cutbacks and the jobs that keep paths and planting looking cared for as the seasons change.'],
  ]},
  { id: 'pruning', title: 'Pruning & hedge care', intro: 'Considered pruning for healthy growth, good shape and space to flower. We plan the work around the plant and the season.', services: [
    ['Garden hedges', 'Seasonal trimming and shaping, with a check for active nests before work begins.'],
    ['Shrubs & climbers', 'Pruning to suit the plant, removing unwanted growth and keeping it in balance with the rest of your garden.'],
    ['Fruit trees', 'Garden-scale fruit-tree pruning. Apples and pears in winter; plums and cherries in summer.'],
    ['Overgrown shrubs', 'Renovation carried out at a pace the plant can recover from. Some shrubs are better brought back over more than one season.'],
  ]},
  { id: 'planting', title: 'Planting & borders', intro: 'An empty corner, a tired border or a little more life through the year. We help you make the most of the space you already have.', services: [
    ['New planting', 'Plant choices that suit your soil, light and the amount of maintenance you want.'],
    ['Border refreshes', 'Prepare beds, make room and bring in new plants alongside the ones worth keeping.'],
    ['Flowers for pollinators', 'Planting that gives bees and other pollinators something to visit across the seasons.'],
    ['Seasonal additions', 'Bulbs and other additions that bring interest at different times of year.'],
  ]},
  { id: 'one-off', title: 'One-off garden resets', intro: 'You don’t have to get the garden under control before asking for help. We can work through an overgrown space and give you a manageable starting point.', services: [
    ['Garden clearances', 'Tackle brambles, overgrown beds and neglected corners so you can see the space again.'],
    ['Seasonal resets', 'A thorough tidy and appropriate cutback, ready for regular care or for you to take over.'],
    ['A plan for what comes next', 'Discuss which parts to keep, what needs ongoing attention and how the green waste will be handled.'],
  ]},
  { id: 'wildlife', title: 'Wildlife-friendly care', intro: 'Small decisions can make a garden more welcoming to wildlife. We build these into the way we work and discuss what feels right for you.', services: [
    ['Thoughtful cutbacks', 'Leave useful seedheads and hollow stems where you’re happy to, while keeping the areas you use clear.'],
    ['Sheltered corners', 'A leaf pile, log heap or patch of longer grass can provide habitat without taking over the garden.'],
    ['Planting for life', 'Choose flowers and planting that offer food and cover for the wildlife already visiting.'],
  ]},
];

export const practices = [
  {
    icon: 'seedhead',
    title: 'Keep something for the wildlife',
    text: 'Where you’re happy to, we leave some seedheads and hollow stems standing over winter for birds and overwintering insects.',
  },
  {
    icon: 'bird',
    title: 'Check before cutting',
    text: 'We look for active nests before trimming and plan bigger hedge cuts around the nesting season.',
  },
  {
    icon: 'bee',
    title: 'Plant with a purpose',
    text: 'Suggestions for flowers that feed bees and other pollinators across the seasons, chosen to suit your soil and light.',
  },
  {
    icon: 'log',
    title: 'Make room in the right places',
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
