/* systems.js — the wider system that has to shift, in three layers.
 * ============================================================================
 * FIRST DRAFT (18 Sep 2026). Rendered by systems.html. The argument: the
 * impacts on the main page don't come from farming alone — they come from
 * three layers that hold each other in place. Change one on its own and the
 * other two pull it back.
 *
 * Layers are listed TOP (the plate) to BOTTOM (the soil), the order they are
 * drawn on the page.
 *
 * Shape of one layer:
 * {
 *   id, n,                       // n = layer number, counted from the soil up
 *   name:   "Our farms",
 *   today:  { label, points: [ "…" ] },   // what it is now
 *   future: { label, points: [ "…" ] },   // what it could be
 *   levers: [ "…" ],             // what would actually move it
 *   orgs:   [ "…" ]              // who's working on it — each an EXACT `name`
 *                                //   from data/organisations.js; the page takes
 *                                //   the link from there (and warns in the
 *                                //   console if a name doesn't match)
 * }
 *
 * links[] sit between adjacent layers: `down` is how the upper layer pushes on
 * the lower one, `up` how the lower one pushes back.
 *
 * Stats are deliberately few, and flagged "check" until verified against a
 * source — same rule as data/areas.js.
 * ========================================================================== */
window.FS = window.FS || {};

FS.systems = {
  updated: "2026-09-18",
  title: "The whole system",
  lede: "What happens in the field is only the bottom layer. Farms grow what the " +
        "supply chain will buy, and the supply chain buys what shoppers are led to " +
        "want. Three layers, each holding the others in place — so all three have " +
        "to move together.",

  layers: [
    /* -------------------------------------------------------------------- */
    {
      id: "demand",
      n: 3,
      name: "What we eat",
      kicker: "Consumer behaviour & demand",
      today: {
        label: "Cheap, processed, samey",
        points: [
          "Food judged on price first — the cheapest calories win.",
          "Ultra-processed foods make up over half of the calories in the average UK diet.",
          "A narrow range of the same crops and cuts, all year round, whatever the season.",
          "High meat consumption, mostly from intensive systems.",
          "Cooking skills and time squeezed out; convenience sells."
        ],
        stat: { value: "~57%", unit: "of UK calories come from ultra-processed food", check: true }
      },
      future: {
        label: "Real food, more of it plant, full of flavour",
        points: [
          "Paying a fairer price for food that's worth more — in nutrition and taste.",
          "Raw, natural ingredients cooked from scratch more of the time.",
          "Less meat, but better meat — pasture-fed, from farms that restore land.",
          "Eating with the seasons, and a much wider variety of crops.",
          "Nutrition density and flavour as the measure of good food, not cheapness."
        ]
      },
      levers: [
        "Food education and cooking in every school",
        "Public procurement (schools, hospitals) buying seasonal, local, whole food",
        "Honest labelling — true cost, processing, how it was farmed",
        "Tackling food poverty so better food isn't only for the better-off"
      ],
      orgs: [
        "The Food Foundation (incl. Peas Please)",
        "Food for Life (Soil Association)",
        "Sustainable Food Places",
        "Eating Better",
        "Chefs in Schools",
        "School Food Matters",
        "Veg Power",
        "Bite Back",
        "Recipe for Change",
        "Obesity Health Alliance",
        "Slow Food in the UK",
        "Nourish Scotland",
        "Food Sense Wales",
        "Sustain",
        "Sustainable Food Trust",
        "Food, Farming & Countryside Commission",
        "FarmED",
        "Community Supported Agriculture Network UK",
        "Pasture for Life (Pasture-Fed Livestock Association)",
        "Farmerama Radio"
      ]
    },

    /* -------------------------------------------------------------------- */
    {
      id: "supply",
      n: 2,
      name: "How food reaches us",
      kicker: "Supply chains",
      today: {
        label: "Bulk, national, international",
        points: [
          "A handful of supermarkets buy most of the nation's food.",
          "Contracts reward huge volumes of uniform product at the lowest price.",
          "Long chains — national and global sourcing, central distribution hubs.",
          "Cosmetic specs and fixed ranges; what doesn't fit gets wasted.",
          "Farmers take what they're offered — a thin slice of what we pay."
        ],
        stat: { value: "~90%", unit: "of UK grocery spending goes through the ten biggest retailers", check: true }
      },
      future: {
        label: "Local, varied, seasonal",
        points: [
          "Local distribution of smaller volumes from many more farms.",
          "A greater variety of seasonal crops and meat, not one spec all year.",
          "Short chains — food hubs, box schemes, markets, local butchers & mills.",
          "Shared infrastructure: local abattoirs, packing, cold stores.",
          "Fairer, longer-term deals so the farmer keeps more of the price."
        ]
      },
      levers: [
        "Enforce fair dealing — a stronger Groceries Code Adjudicator",
        "Rebuild local processing: small abattoirs, mills, dairies",
        "Food hubs and co-ops that aggregate small farms for bigger buyers",
        "Supermarkets committing to regional, seasonal ranges"
      ],
      orgs: [
        "Groceries Code Adjudicator",
        "Local Food Plan (Sustain, Landworkers' Alliance, Pasture for Life, FFCC, Sustainable Food Trust)",
        "Better Food Traders",
        "Growing Communities (Better Food Shed)",
        "Open Food Network UK",
        "Abattoir Sector Group (convened by the Sustainable Food Trust)",
        "Farm Retail Association",
        "Dynamic Food Procurement National Advisory Board",
        "Food for Life (Soil Association)",
        "Sustainable Food Places",
        "Riverford",
        "Hodmedod's",
        "Real Bread Campaign (Sustain)",
        "WRAP — UK Food and Drink Pact (formerly Courtauld Commitment 2030)",
        "Sustain",
        "Landworkers' Alliance",
        "Community Supported Agriculture Network UK",
        "Kindling Trust",
        "Wildfarmed",
        "Green Farm Collective",
        "Corporate supply-chain programmes (Arla FarmAhead, First Milk / Nestlé, McCain, PepsiCo, Waitrose, etc.)",
        "Pasture for Life (Pasture-Fed Livestock Association)",
        "Real Farming Trust — LEAP loans and grants"
      ]
    },

    /* -------------------------------------------------------------------- */
    {
      id: "farms",
      n: 1,
      name: "Our farms",
      kicker: "The ground it all grows from",
      today: {
        label: "Industrialised",
        points: [
          "Monocultures and specialisation: one crop or one animal, at scale.",
          "Heavy reliance on synthetic fertiliser, pesticides and bought-in feed.",
          "Intensive livestock kept indoors, apart from the land that feeds it.",
          "Soils losing organic matter, structure and life.",
          "Farmers carrying the debt and the risk, on slim margins."
        ]
      },
      future: {
        label: "Regenerative",
        points: [
          "Diverse rotations, cover crops and minimal disturbance of the soil.",
          "Livestock back on the land — grazing that builds soil, not feedlots.",
          "Fewer inputs: nature doing more of the work.",
          "Soils storing carbon and water; wildlife back in the margins.",
          "Resilient, profitable farms — less exposed to input prices and weather."
        ]
      },
      levers: [
        "Public money paying for public goods (soil, water, nature, carbon)",
        "Funding farmers through the income dip of the transition",
        "Peer learning, advice and mentoring from farmers who've done it",
        "Secure tenancies long enough to invest in the soil"
      ],
      orgs: [
        "Groundswell",
        "Nature Friendly Farming Network (NFFN)",
        "BASE-UK",
        "Pasture for Life (Pasture-Fed Livestock Association)",
        "Innovative Farmers",
        "Farmer Clusters (GWCT / Defra Facilitation Fund)",
        "Landworkers' Alliance",
        "Organic Growers Alliance",
        "Oxford Real Farming Conference (Real Farming Trust)",
        "The Allerton Project (Game & Wildlife Conservation Trust)",
        "FarmED",
        "Organic Research Centre",
        "Agricology",
        "Farm Carbon Toolkit",
        "Rothamsted Research (incl. North Wyke Farm Platform)",
        "Farming & Wildlife Advisory Group (FWAG)",
        "Duchy College Rural Business School / Farm Net Zero",
        "Sustainable Soils Alliance",
        "Soil Association",
        "LEAF (Linking Environment And Farming)",
        "RSPB (Hope Farm & farm advisory)",
        "The Wildlife Trusts",
        "Ecological Land Cooperative",
        "Countryside Regeneration Trust",
        "Shared Assets",
        "Land In Our Names (LION)",
        "The Royal Countryside Fund",
        "Food & Nature Resilience Fund (Lloyds Banking Group + Wildfarmed)",
        "Soil Capital",
        "Agreena",
        "Regenerate Outcomes",
        "Water-company catchment schemes (e.g. South West Water 'Upstream Thinking', Severn Trent STEPS)",
        "Bank transition lending (Lloyds, NatWest, Oxbury)",
        "Real Farming Trust — LEAP loans and grants",
        "Esmée Fairbairn Foundation",
        "Rothschild Foundation",
        "Environmental Land Management — Sustainable Farming Incentive (England)",
        "Countryside Stewardship (Higher Tier) & Landscape Recovery",
        "Devolved schemes — Sustainable Farming Scheme (Wales), Whole Farm Plan / AECS (Scotland), Farming with Nature (NI)"
      ]
    }
  ],

  /* between layers, top pair first */
  links: [
    {
      between: ["demand", "supply"],
      down: "Demand for cheap food rewards the buyers who squeeze hardest on price.",
      up: "What's on the shelf — and on promotion — shapes what we learn to want."
    },
    {
      between: ["supply", "farms"],
      down: "Bulk contracts need huge uniform volumes, so farms specialise and intensify.",
      up: "Without local mills, abattoirs and hubs, a diverse farm has nowhere to sell."
    }
  ],

  closing: {
    headline: "Pull one layer and the others pull back",
    text: "A farmer who goes regenerative still has to sell into a chain built for " +
          "bulk. A shopper who wants seasonal, local food can't find it in the " +
          "supermarket. A retailer that stocks it can't get the volumes. Each layer " +
          "is waiting for the others — which is why change has to be worked on at all " +
          "three levels at once, and why the opportunity is so big when it is."
  }
};
