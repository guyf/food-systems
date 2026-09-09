/* areas.js — the content model.
 * ============================================================================
 * FIRST DRAFT for Guy to comment / edit. UK-focused. Every figure needs a
 * final check against the cited source before this goes out — treat the
 * numbers as "about right", not verified. Sources are listed per area and
 * referenced from stats by `source` key.
 *
 * Shape of one area:
 * {
 *   id, group ("planet"|"society"), label, icon,
 *   summary,
 *   harm:        { headline, points: [ { text, stat } ] },   // "Today"
 *   opportunity: { headline, points: [ { text, stat } ] },   // "Opportunity"
 *   shift,
 *   sources: [ { key, cite, url } ]
 * }
 * stat is null or { value, unit, source } where source is a sources[].key.
 * ========================================================================== */
window.FS = window.FS || {};

FS.meta = {
  region: "UK",
  title: "It all starts with our farms",
  intro:
    "Farming covers about 70% of the UK's land. What we grow and raise on it — and " +
    "how we do that — shapes the climate, our rivers, our wildlife, our health and " +
    "our communities. It's the system that currently drives many of these " +
    "problems, and the biggest lever we have to fix them."
};

FS.groups = [
  { id: "planet", label: "The Planet",
    areaIds: ["climate", "biodiversity", "water"] },
  { id: "society", label: "Society",
    areaIds: ["food-security", "community", "health", "animal-welfare"] }
];

FS.areas = [
  /* ---------------------------------------------------------------- PLANET */
  {
    id: "climate",
    group: "planet",
    label: "Global warming reversal",
    icon: "🌡️",
    summary:
      "Food and farming are a large slice of UK emissions — but land is also the " +
      "one sector that can pull carbon back out of the air.",
    harm: {
      headline: "A major emitter, and a leaking carbon store",
      points: [
        { text: "Agriculture produces around a tenth of UK greenhouse gas emissions — roughly 47 million tonnes of CO₂e a year — and is the biggest single source of the UK's methane and nitrous oxide.",
          stat: { value: "~11%", unit: "of UK emissions", source: "ccc" } },
        { text: "Once imported food and overseas land-use change are counted, the food UK residents eat is closer to a fifth of the country's real carbon footprint; global food systems drive roughly a third of all emissions.",
          stat: { value: "21–37%", unit: "of global emissions from food", source: "ipcc" } },
        { text: "Lowland peat soils drained to grow crops are among the UK's biggest carbon leaks, oxidising away and releasing tens of millions of tonnes of CO₂ a year.",
          stat: { value: "~23 Mt", unit: "CO₂e/yr from UK peat", source: "ukceh" } }
      ]
    },
    opportunity: {
      headline: "Under a regenerative agriculture system",
      points: [
        { text: "Minimal tillage, permanent cover crops, diverse rotations and grazing livestock keep living roots in the ground year-round, steadily rebuilding the soil organic matter that draws carbon out of the air and locks it underground.",
          stat: { value: "+0.1%", unit: "soil organic matter ≈ several tonnes CO₂ stored per hectare", source: "som" } },
        { text: "Cutting synthetic nitrogen — the source of most of farming's nitrous oxide — while restoring peat, hedgerows and field trees turns farmland from a net emitter into a growing carbon sink.",
          stat: null }
      ]
    },
    shift: "From tillage and heavy inputs that burn through soil carbon to regenerative practices that bank it.",
    sources: [
      { key: "ccc", cite: "Climate Change Committee, Progress in Reducing Emissions: 2023 Report to Parliament; The Sixth Carbon Budget (2020)", url: "https://www.theccc.org.uk/publication/2023-progress-report-to-parliament/" },
      { key: "ipcc", cite: "IPCC, Special Report on Climate Change and Land (2019) — food systems 21–37% of global GHG", url: "https://www.ipcc.ch/srccl/" },
      { key: "ukceh", cite: "UK Centre for Ecology & Hydrology / ONS, UK peatland greenhouse gas emissions (mostly drained agricultural peat)", url: "https://www.ceh.ac.uk/our-science/projects/uk-peatland-greenhouse-gas-emissions" },
      { key: "som", cite: "Rothamsted Research long-term experiments; AHDB, Soil biology and soil organic matter; FAO, Soil organic carbon (2017) — figure indicative, varies with soil and depth", url: "https://ahdb.org.uk/knowledge-library/soil-biology-and-soil-organic-matter" }
    ]
  },

  {
    id: "biodiversity",
    group: "planet",
    label: "Biodiversity protection",
    icon: "🐝",
    summary:
      "Roughly three-quarters of UK land is farmed, so farming, more than anything " +
      "else, decides what wildlife survives here.",
    harm: {
      headline: "The single biggest driver of nature loss",
      points: [
        { text: "UK wildlife has declined by an average of about a fifth since monitoring began in 1970, and one in six species is now at risk of being lost from Great Britain.",
          stat: { value: "−19%", unit: "avg species abundance since 1970", source: "son" } },
        { text: "Farmland birds have more than halved as mixed farms, winter stubbles and insect-rich field edges disappeared — the sharpest fall of any UK bird group.",
          stat: { value: "−61%", unit: "farmland birds since 1970", source: "defra-birds" } },
        { text: "Intensive management — pesticides, heavy fertiliser, drainage and the loss of hedgerows and ponds — is identified as the largest single cause; flying insects sampled on vehicle number plates fell by around 60% between 2004 and 2021.",
          stat: { value: "−60%", unit: "flying insects, 2004–21", source: "bugs" } }
      ]
    },
    opportunity: {
      headline: "Under a regenerative agriculture system",
      points: [
        { text: "Diverse rotations, herbal leys, flowering cover crops, hedgerows and beetle banks put food and shelter back across the farmed landscape, and steep cuts in insecticide and fungicide use let insect, bird and small-mammal populations climb back.",
          stat: { value: "+30–50%", unit: "more wild species where farming works with nature", source: "organic" } },
        { text: "Undisturbed, living soils teem with fungi, worms and microbes — the base of the food web — so recovery runs from the ground up. Farms managed this way, like RSPB's Hope Farm, have multiplied their breeding birds while staying profitable.",
          stat: null }
      ]
    },
    shift: "From a sterile monoculture to a regeneratively farmed landscape with food and cover for wildlife.",
    sources: [
      { key: "son", cite: "State of Nature 2023 (State of Nature partnership, led by RSPB and the National Biodiversity Network)", url: "https://stateofnature.org.uk/" },
      { key: "defra-birds", cite: "Defra, Wild bird populations in the UK, 1970 to 2022 (farmland bird index)", url: "https://www.gov.uk/government/statistics/wild-bird-populations-in-the-uk" },
      { key: "bugs", cite: "Kent Wildlife Trust & Buglife, Bugs Matter survey (2021)", url: "https://www.buglife.org.uk/news/bugs-matter-survey-finds-that-uk-flying-insects-have-declined-by-nearly-60-in-17-years/" },
      { key: "hope", cite: "RSPB, Hope Farm — wildlife-friendly farming results", url: "https://www.rspb.org.uk/helping-nature/what-we-do/projects/hope-farm" },
      { key: "organic", cite: "Tuck et al. (2014), Journal of Applied Ecology, meta-analysis of organic farming and biodiversity; Soil Association", url: "https://doi.org/10.1111/1365-2664.12219" }
    ]
  },

  {
    id: "water",
    group: "planet",
    label: "Drought & flood mitigation",
    icon: "💧",
    summary:
      "How land is farmed decides how much rain is stored and filtered — and how " +
      "much rushes off, carrying soil and slurry into rivers and towns.",
    harm: {
      headline: "Polluted rivers, faster floods",
      points: [
        { text: "No river in England is in good overall health; only around one in seven meets good ecological status, and farming is a source of pollution in roughly 40% of the water bodies that fail.",
          stat: { value: "14%", unit: "of English rivers at good ecological status", source: "ea" } },
        { text: "Agriculture contributes about 70% of the nitrate and a quarter of the phosphate reaching UK waters, alongside sediment, pesticides and slurry.",
          stat: { value: "~70%", unit: "of nitrate in water is from farming", source: "ea" } },
        { text: "Compacted, bare and eroding soils shed rain instead of absorbing it, lifting flood peaks downstream; soil degradation is estimated to cost England and Wales around £1.2bn a year.",
          stat: { value: "£1.2bn/yr", unit: "cost of soil degradation", source: "ea-soil" } }
      ]
    },
    opportunity: {
      headline: "Under a regenerative agriculture system",
      points: [
        { text: "Year-round cover and minimal tillage build open, spongy soil structure that soaks up heavy rain instead of shedding it — cutting run-off, erosion and downstream flood peaks, and holding moisture in the ground through drought.",
          stat: { value: "+1%", unit: "soil organic matter can hold ~150,000 more litres of water per hectare", source: "som-water" } },
        { text: "Far fewer synthetic inputs, plus buffer strips, ponds and boggy corners along watercourses, mean much less nitrate, phosphate and sediment reaches rivers — water leaves the farm cleaner.",
          stat: null }
      ]
    },
    shift: "From bare, compacted land that sheds dirty water to regeneratively managed soil that stores and filters it.",
    sources: [
      { key: "ea", cite: "Environment Agency, State of the water environment: river basin classification (2019); The state of the environment: water quality (2018)", url: "https://www.gov.uk/government/publications/state-of-the-environment" },
      { key: "ea-soil", cite: "Environment Agency, The state of the environment: soil (2019); Defra estimate of soil degradation costs", url: "https://www.gov.uk/government/publications/state-of-the-environment" },
      { key: "ea-wwnp", cite: "Environment Agency, Working with Natural Processes to reduce flood risk — evidence directory", url: "https://www.gov.uk/government/publications/working-with-natural-processes-to-reduce-flood-risk" },
      { key: "som-water", cite: "USDA-NRCS soil health guidance on soil organic matter and water-holding capacity — widely cited, exact figure debated", url: "https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soil/soil-health" }
    ]
  },

  /* --------------------------------------------------------------- SOCIETY */
  {
    id: "food-security",
    group: "society",
    label: "Food security",
    icon: "🌾",
    summary:
      "A secure food supply means everyone can afford a healthy diet, through " +
      "shocks and seasons. Today's system is neither as resilient nor as fair as " +
      "it looks.",
    harm: {
      headline: "Fragile supply, unequal plates",
      points: [
        { text: "The UK produces about 60% of the food it eats and imports most of its fruit and vegetables — roughly 85% of fruit and nearly half of veg.",
          stat: { value: "~60%", unit: "of UK food is produced at home", source: "ukfsr" } },
        { text: "In 2024 around 7 million adults lived in food-insecure households, and the Trussell Trust distributed more than 3 million emergency food parcels in a single year.",
          stat: { value: "~7m", unit: "adults in food-insecure homes", source: "foodfoundation" } },
        { text: "Degrading soils and a wetter, more volatile climate are already cutting domestic yields; the 2024 harvest was one of the worst in decades.",
          stat: null }
      ]
    },
    opportunity: {
      headline: "Under a regenerative agriculture system",
      points: [
        { text: "Deeper-rooted, water-holding soils keep yielding through drought and flood, and much lower fuel, fertiliser and spray bills leave farm businesses — and the food supply — far less exposed to input price shocks.",
          stat: null },
        { text: "Regenerative systems lean on diverse cropping and mixed farming — more pulses, more horticulture, livestock only where the land suits it — widening the range of food grown close to home rather than leaning on a few imported commodities.",
          stat: { value: "~1%", unit: "of UK farmland is horticulture today — room to grow", source: "nfs" } }
      ]
    },
    shift: "From a fragile, input- and import-dependent chain to resilient, diverse regenerative production.",
    sources: [
      { key: "ukfsr", cite: "Defra, United Kingdom Food Security Report 2021 (updated December 2024)", url: "https://www.gov.uk/government/statistics/united-kingdom-food-security-report-2021" },
      { key: "foodfoundation", cite: "The Food Foundation, Food Insecurity Tracking (2024)", url: "https://foodfoundation.org.uk/initiatives/food-insecurity-tracking" },
      { key: "trussell", cite: "Trussell Trust, End of Year Statistics 2023/24", url: "https://www.trussell.org.uk/news-and-research/latest-stats" },
      { key: "nfs", cite: "National Food Strategy: The Plan (Henry Dimbleby, 2021)", url: "https://www.nationalfoodstrategy.org/" },
      { key: "wrap", cite: "WRAP, Food surplus and waste in the UK — key facts (2023)", url: "https://wrap.org.uk/resources/report/food-surplus-and-waste-uk-key-facts" }
    ]
  },

  {
    id: "community",
    group: "society",
    label: "Community",
    icon: "🤝",
    summary:
      "Food and farming shape rural jobs, market towns and our sense of connection " +
      "to the land. Value has been draining out of all three.",
    harm: {
      headline: "Value out, connection lost",
      points: [
        { text: "Many farms would make a loss without subsidy and diversification; in 2022/23 roughly one in six English farms failed to make a positive farm business income.",
          stat: { value: "~1 in 6", unit: "farms with no positive income", source: "fbs" } },
        { text: "Farmers take a shrinking share of the retail price — often only single-digit pence in the pound — while processors and supermarkets capture the rest.",
          stat: null },
        { text: "Farm numbers keep falling, the average UK farmer is about 59, and the council 'county farms' that once gave new entrants a start have roughly halved since the 1980s.",
          stat: { value: "~59", unit: "average age of UK farmers", source: "june" } }
      ]
    },
    opportunity: {
      headline: "Under a regenerative agriculture system",
      points: [
        { text: "Farms spend far less on fertiliser, fuel and feed and keep more of every pound, and the approach rewards skill and observation over sheer scale — making room for new entrants, share-farming and smaller mixed holdings.",
          stat: null },
        { text: "Regenerative farmers tend to sell more directly — box schemes, local abattoirs, farm shops, 'from the farm' brands — and organise in peer networks like Groundswell and farmer clusters, rebuilding knowledge and connection across rural areas.",
          stat: null }
      ]
    },
    shift: "From consolidation and a shrinking farmgate share to regenerative farms keeping more value local.",
    sources: [
      { key: "fbs", cite: "Defra, Farm Business Income by type of farm in England, 2022/23; Farm Business Survey", url: "https://www.gov.uk/government/collections/farm-business-income" },
      { key: "june", cite: "Defra, Agriculture in the United Kingdom; June Survey of Agriculture and Horticulture (farm numbers, workforce, age)", url: "https://www.gov.uk/government/collections/agriculture-in-the-united-kingdom" },
      { key: "sustain", cite: "Sustain, briefings on farmers' share of the retail pound and food-price margins", url: "https://www.sustainweb.org/" },
      { key: "groundswell", cite: "Groundswell Agriculture (regenerative farming show and network); GWCT farmer clusters; Sustainable Food Trust, Feeding Britain from the Ground Up", url: "https://groundswellag.com/" }
    ]
  },

  {
    id: "health",
    group: "society",
    label: "Human health",
    icon: "❤️",
    summary:
      "Diet is now one of the biggest causes of ill health in the UK, and farming " +
      "decides which foods are cheap and abundant. Farming lives are under strain too.",
    harm: {
      headline: "Cheap calories, costly illness",
      points: [
        { text: "Poor diet is linked to tens of thousands of early deaths a year. Obesity alone is estimated to cost the UK around £58bn a year in total, and the NHS roughly £6.5bn.",
          stat: { value: "£6.5bn/yr", unit: "NHS cost of obesity", source: "dhsc" } },
        { text: "About 64% of adults in England are overweight or obese, and one in three children leave primary school above a healthy weight; ultra-processed foods, built on cheap wheat, maize, sugar and oils, make up over half the average diet's calories.",
          stat: { value: "~57%", unit: "of UK dietary calories from UPF", source: "upf" } },
        { text: "Healthy food costs around twice as much per calorie as unhealthy food. In farming itself, one recent survey found more than a third of farmers likely to be depressed.",
          stat: { value: "2×", unit: "cost per calorie, healthy vs unhealthy", source: "brokenplate" } }
      ]
    },
    opportunity: {
      headline: "Under a regenerative agriculture system",
      points: [
        { text: "The economics tilt back towards diverse whole food — vegetables, fruit, pulses, pasture-raised meat and dairy — and away from the cheap commodity crops that fill ultra-processed food, making a healthy diet more affordable and available.",
          stat: null },
        { text: "Much lower pesticide use cuts dietary and occupational exposure, produce from biologically active soils can be more nutrient-dense, and working with nature rather than fighting it eases the isolation and financial stress weighing on farmers' mental health.",
          stat: null }
      ]
    },
    shift: "From cheap commodity calories that make us ill to regeneratively grown food that keeps us well.",
    sources: [
      { key: "dhsc", cite: "Department of Health & Social Care, Tackling obesity (2020); Frontier Economics, Estimating the full costs of obesity (2022)", url: "https://www.gov.uk/government/publications/tackling-obesity-government-strategy" },
      { key: "upf", cite: "Rauber et al. (2021), ultra-processed food in the UK diet; SACN, position on processed foods (2023)", url: "https://doi.org/10.1017/S1368980021003967" },
      { key: "brokenplate", cite: "The Food Foundation, The Broken Plate 2024", url: "https://foodfoundation.org.uk/publication/broken-plate-2024" },
      { key: "rabi", cite: "Royal Agricultural Benevolent Institution (RABI), The Big Farming Survey (2021)", url: "https://rabi.org.uk/bigfarmingsurvey/" },
      { key: "carefarming", cite: "Social Farms & Gardens, care farming in the UK", url: "https://www.farmgarden.org.uk/" }
    ]
  },

  {
    id: "animal-welfare",
    group: "society",
    label: "Animal welfare",
    icon: "🐄",
    summary:
      "How we keep farmed animals is a moral question in its own right, and it is " +
      "bound up with every other impact on this field.",
    harm: {
      headline: "Bred fast, packed close",
      points: [
        { text: "Around 85% of farmed animals in the UK are kept in intensive systems, and roughly 1.1 billion animals — overwhelmingly fast-growing meat chickens — are slaughtered each year.",
          stat: { value: "~85%", unit: "of UK farm animals intensively reared", source: "ciwf" } },
        { text: "Broiler chickens are typically grown to slaughter weight in about 35 days, a pace linked to lameness and heart failure; the number of US-style intensive livestock units in the UK has risen sharply.",
          stat: { value: "~35 days", unit: "broiler chicken to slaughter", source: "ciwf" } },
        { text: "Crowding raises disease pressure and reliance on antibiotics — though UK farm antibiotic use has fallen by more than half since 2014, showing rapid change is possible.",
          stat: { value: "−59%", unit: "farm antibiotic use since 2014", source: "varss" } }
      ]
    },
    opportunity: {
      headline: "Under a regenerative agriculture system",
      points: [
        { text: "Livestock are central to the farm but kept outdoors on pasture in rotation — grazing, dunging and trampling to build soil — which means lower stocking densities, room for natural behaviour and far less routine medication.",
          stat: null },
        { text: "Because these systems need fewer, well-integrated animals rather than ever-cheaper intensive units, they line up with 'less and better' meat and dairy: higher welfare and lower environmental cost moving together.",
          stat: null }
      ]
    },
    shift: "From intensive units built on cheap feed to fewer animals, outdoors, regenerating the land.",
    sources: [
      { key: "ciwf", cite: "Compassion in World Farming, Factory farming in the UK: statistics and briefings", url: "https://www.ciwf.org.uk/factory-farming/" },
      { key: "fsa", cite: "Food Standards Agency, Animal slaughter statistics (Great Britain)", url: "https://www.food.gov.uk/about-us/data-and-statistics" },
      { key: "tbij", cite: "The Bureau of Investigative Journalism, investigations into intensive livestock units in the UK", url: "https://www.thebureauinvestigates.com/" },
      { key: "varss", cite: "UK Veterinary Antibiotic Resistance and Sales Surveillance (UK-VARSS) report", url: "https://www.gov.uk/government/collections/veterinary-antimicrobial-resistance-and-sales-surveillance" },
      { key: "liveexports", cite: "Animal Welfare (Livestock Exports) Act 2024", url: "https://www.legislation.gov.uk/ukpga/2024/10" }
    ]
  }
];
