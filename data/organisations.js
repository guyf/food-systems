/* organisations.js — the UK regenerative-farming landscape.
 * ============================================================================
 * FIRST PASS (16 Sep 2026). Who is already active in helping UK farmers move
 * from intensive to regenerative / agroecological / nature-friendly farming —
 * networks, advisers, certifiers, funders, land-access bodies, welfare
 * charities, outcome-payers and public schemes. SECOND PASS (19 Sep 2026)
 * added two categories beyond the farm gate — supply chains and demand —
 * which feed the upper two layers of systems.html.
 *
 * Compiled to inform a possible new charity that would fund farmers through
 * the income dip of a transition (see the "Where the gap is" section on the
 * page). Method: docs/landscape-research-method.md — re-run it to refresh.
 *
 * Shape of one entry:
 * {
 *   name, url,
 *   type:     "charity" | "cic" | "co-op" | "company" | "programme" |
 *             "funder" | "public" | "network" | "union" | "research" |
 *             "social-enterprise"
 *   summary:  2–3 sentences on what they actually do
 *   reach:    size / importance / reach, with numbers where known
 *   scale:    "L" (national, large) | "M" (national, medium) | "S" (regional / small)
 *   relevance: optional — why it matters to a transition-funding charity
 *   verified: true if a fact here was checked against the web this session;
 *             false = from general knowledge, check before relying on it
 * }
 * Numbers are "about right" as of the compile date, not audited.
 * ========================================================================== */
window.FS = window.FS || {};

FS.organisations = {
  updated: "2026-09-19",
  region: "UK",

  categories: [
    /* -------------------------------------------------------------------- */
    {
      id: "networks",
      title: "Farmer-led networks & peer learning",
      blurb: "Where farmers already learn regenerative practice from each other. The " +
             "natural referral route for any transition programme, and the people " +
             "who would vouch for (or against) a new funder.",
      orgs: [
        {
          name: "Groundswell",
          url: "https://groundswellag.com/",
          type: "company",
          summary: "The annual regenerative-agriculture festival at Lannock Manor Farm, Hertfordshire, run by the Cherry family — 100+ sessions, 200+ speakers, plus year-round events and a strong online community. The de-facto gathering point of the UK regen movement.",
          reach: "Thousands of attendees each summer; widely described as the 'Glastonbury of regen ag'. National, high influence.",
          scale: "L",
          relevance: "The place to launch or road-test a transition fund with the farmers who'd use it.",
          verified: true
        },
        {
          name: "Nature Friendly Farming Network (NFFN)",
          url: "https://www.nffn.org.uk/",
          type: "charity",
          summary: "Farmer-led, founded November 2017, uniting farmers committed to producing food while restoring nature. Peer network, case studies, policy voice, with chapters across England, Scotland, Wales and Northern Ireland.",
          reach: "1,300+ farmer members plus a wider supporter base; regular parliamentary evidence; UK-wide.",
          scale: "L",
          relevance: "Ready-made membership of farmers already part-way through a transition.",
          verified: true
        },
        {
          name: "BASE-UK",
          url: "https://www.base-uk.co.uk/",
          type: "network",
          summary: "Farmer-run membership association for conservation agriculture — no-till, cover crops, soil health — modelled on the French BASE network. Regional meetings, farm walks and an annual conference.",
          reach: "Several hundred paying farmer members, mostly arable; national.",
          scale: "M",
          verified: false
        },
        {
          name: "Pasture for Life (Pasture-Fed Livestock Association)",
          url: "https://pastureforlife.org/",
          type: "cic",
          summary: "Membership body and certification mark for 100% pasture-fed ruminant livestock. Runs mentoring, farm walks and the 'Farm for the Future' programme alongside the certification standard, which is audited by Soil Association Certification.",
          reach: "100+ certified farms; roughly 1,000 members (farmers, butchers, supporters); national.",
          scale: "M",
          relevance: "Its mentoring model is a template for supporting farmers through a change of system.",
          verified: true
        },
        {
          name: "Innovative Farmers",
          url: "https://innovativefarmers.org/",
          type: "programme",
          summary: "Soil Association-run programme (with LEAF, Innovation for Agriculture and the Organic Research Centre) that funds and supports farmer-led 'field labs' — on-farm trials with a researcher attached. Backed by the King Charles III Charitable Fund, Rothschild Foundation and Aurora Trust among others.",
          reach: "150+ field labs since 2012; £450k+ in small grants; a network of ~12,000 farmers.",
          scale: "L",
          relevance: "Proof that small, farmer-directed grants work at scale in the UK.",
          verified: true
        },
        {
          name: "Farmer Clusters (GWCT / Defra Facilitation Fund)",
          url: "https://www.gwct.org.uk/farming/farmer-clusters/",
          type: "programme",
          summary: "Groups of neighbouring farms working together on landscape-scale nature recovery, each with a paid facilitator. Piloted by the Game & Wildlife Conservation Trust in 2014 and scaled through Defra's Facilitation Fund.",
          reach: "220+ clusters covering 450,000+ hectares — the largest collaborative farmer structure in the UK.",
          scale: "L",
          relevance: "A cluster is a natural unit for a transition fund to work with — shared facilitator, shared monitoring.",
          verified: true
        },
        {
          name: "Landworkers' Alliance",
          url: "https://landworkersalliance.org.uk/",
          type: "union",
          summary: "Grassroots, member-led union of small-scale agroecological farmers, growers, foresters and land workers, founded 2012. Campaigns, training, peer groups (including youth, LGBTQIA+ and BPOC networks) and the Agroecology Research Collaboration.",
          reach: "A few thousand members; the loudest voice for small agroecological producers; national.",
          scale: "M",
          verified: true
        },
        {
          name: "Community Supported Agriculture Network UK",
          url: "https://communitysupportedagriculture.org.uk/",
          type: "charity",
          summary: "Supports and represents CSA farms — where members share the risk and reward of the harvest. Runs start-up support, a mentoring scheme and the annual CSA conference.",
          reach: "Around 200 CSAs nationally; small but a working model of consumers underwriting farm income.",
          scale: "S",
          relevance: "CSA is the existing grassroots answer to 'who carries the farmer's risk' — worth studying.",
          verified: false
        },
        {
          name: "Organic Growers Alliance",
          url: "https://organicgrowersalliance.co.uk/",
          type: "network",
          summary: "Membership network for organic and agroecological horticultural growers: technical journal, mentoring, events.",
          reach: "A few hundred grower members; national but niche.",
          scale: "S",
          verified: false
        },
        {
          name: "Regenerative Farmers of UK",
          url: "https://regenerativefarmersofuk.com/",
          type: "network",
          summary: "Online community connecting regenerative farmers and consumers to share learning and scale up the change.",
          reach: "Small online network.",
          scale: "S",
          verified: true
        },
        {
          name: "Farmerama Radio",
          url: "https://farmerama.co/",
          type: "cic",
          summary: "Podcast and media collective telling stories from the regenerative and agroecological farming movement; also runs events and 'Cereal' / 'Landed' series.",
          reach: "Tens of thousands of listeners; strong influence within the movement.",
          scale: "M",
          verified: false
        }
      ]
    },

    /* -------------------------------------------------------------------- */
    {
      id: "knowledge",
      title: "Knowledge, advice, research & demonstration farms",
      blurb: "The technical support a transitioning farmer needs alongside money. A " +
             "funder would almost certainly partner with several of these rather than " +
             "build its own advisory capacity.",
      orgs: [
        {
          name: "The Allerton Project (Game & Wildlife Conservation Trust)",
          url: "https://www.allertontrust.org.uk/",
          type: "charity",
          summary: "GWCT's 320-hectare commercially-run demonstration farm at Loddington, Leicestershire, researching how farming methods affect wildlife, soil and water. Runs training courses for farmers and advisers, including regenerative and integrated farming systems.",
          reach: "3,000+ visitors a year; 30+ years of continuous data; a LEAF Innovation Centre; national influence on policy.",
          scale: "L",
          verified: true
        },
        {
          name: "FarmED",
          url: "https://www.farm-ed.co.uk/",
          type: "cic",
          summary: "Centre for farm and food education at Honeydale Farm in the Cotswolds. Courses from introductory to deep-dive on regenerative farming, soils, biodiversity and food, plus a demonstration farm and events venue.",
          reach: "Thousands of course and event attendees a year; a regional hub with national pull.",
          scale: "M",
          verified: true
        },
        {
          name: "Organic Research Centre",
          url: "https://www.organicresearchcentre.com/",
          type: "research",
          summary: "The UK's independent research charity for organic and agroecological farming, founded 1980. Applied research, participatory trials with farmers, and a partner in Innovative Farmers and Agricology.",
          reach: "Small institution, large footprint in the evidence base; national.",
          scale: "M",
          verified: false
        },
        {
          name: "Agricology",
          url: "https://agricology.co.uk/",
          type: "programme",
          summary: "Free online knowledge platform for agroecological practice — farmer profiles, research summaries, videos, field days — run with partners including ORC, LEAF, Pasture for Life and GWCT and funded by the Daylesford Foundation.",
          reach: "A widely used practical reference; national.",
          scale: "M",
          verified: true
        },
        {
          name: "Farm Carbon Toolkit",
          url: "https://farmcarbontoolkit.org.uk/",
          type: "cic",
          summary: "Farmer-led CIC providing a free carbon calculator, soil-carbon monitoring, advice and the 'Soil Farmer of the Year' competition. Also delivers the Farm Net Zero project in Cornwall.",
          reach: "Thousands of farms using the calculator; national.",
          scale: "M",
          relevance: "Ready-made measurement of the soil outcomes a transition fund would want to evidence.",
          verified: false
        },
        {
          name: "Rothamsted Research (incl. North Wyke Farm Platform)",
          url: "https://www.rothamsted.ac.uk/",
          type: "research",
          summary: "The world's oldest agricultural research institute. Long-term experiments on soil and rotations, and the North Wyke Farm Platform in Devon comparing grassland livestock systems at farm scale.",
          reach: "International authority; the source of much UK soil-carbon evidence.",
          scale: "L",
          verified: false
        },
        {
          name: "Farming & Wildlife Advisory Group (FWAG)",
          url: "https://www.fwag.org.uk/",
          type: "charity",
          summary: "Network of regional advisory charities giving farmers independent environmental advice — scheme applications, habitat, soil and water — for 50+ years.",
          reach: "Several regional groups (FWAG SW is the largest); thousands of farm clients.",
          scale: "M",
          verified: false
        },
        {
          name: "Duchy College Rural Business School / Farm Net Zero",
          url: "https://www.farmnetzero.org.uk/",
          type: "programme",
          summary: "Cornwall-based project (Duchy College, Farm Carbon Toolkit, Innovative Farmers, Westcountry Rivers Trust) helping a cohort of farms cut emissions and build soil carbon, with demonstration farms and field labs.",
          reach: "Regional (Cornwall); a well-documented model of a place-based transition programme.",
          scale: "S",
          relevance: "Closest thing to a worked example of supporting a whole cohort through a transition.",
          verified: false
        },
        {
          name: "Sustainable Soils Alliance",
          url: "https://sustainablesoils.org/",
          type: "network",
          summary: "Coalition of businesses, NGOs and academics campaigning for soil health to be measured and protected in UK policy.",
          reach: "Small secretariat, influential in soil policy; national.",
          scale: "S",
          verified: false
        },
        {
          name: "Oxford Real Farming Conference (Real Farming Trust)",
          url: "https://orfc.org.uk/",
          type: "charity",
          summary: "The January counterpart to Groundswell — the agroecology movement's annual conference, run by the Real Farming Trust, with a large online audience alongside the Oxford event.",
          reach: "Several thousand in-person and online delegates; international speakers.",
          scale: "L",
          verified: false
        }
      ]
    },

    /* -------------------------------------------------------------------- */
    {
      id: "advocacy",
      title: "Advocacy, policy, certification & standards",
      blurb: "Who sets the definitions, audits the claims and lobbies government. " +
             "A transition fund would need a recognised standard to pay against.",
      orgs: [
        {
          name: "Soil Association",
          url: "https://www.soilassociation.org/",
          type: "charity",
          summary: "The UK's leading organic and sustainable-farming charity (founded 1946). Its certification arm licenses the majority of UK organic food; the charity runs campaigns, Innovative Farmers, the Future Growers apprenticeship and Soil Association Exchange (farm sustainability assessment for supply chains).",
          reach: "Certifies ~70% of UK organic produce; £20m+ turnover; national.",
          scale: "L",
          verified: true
        },
        {
          name: "Sustainable Food Trust",
          url: "https://sustainablefoodtrust.org/",
          type: "charity",
          summary: "Founded by Patrick Holden in 2010, Bristol-based. Campaigns for true-cost accounting of food and developed the Global Farm Metric — a common framework for measuring on-farm sustainability now used by several supply chains.",
          reach: "Small team, high policy influence; international partnerships.",
          scale: "M",
          relevance: "The Global Farm Metric is a candidate yardstick for what a 'transitioned' farm looks like.",
          verified: true
        },
        {
          name: "LEAF (Linking Environment And Farming)",
          url: "https://leaf.eco/",
          type: "charity",
          summary: "Promotes integrated farm management. Runs the LEAF Marque assurance standard, a network of demonstration farms and Innovation Centres, and Open Farm Sunday.",
          reach: "LEAF Marque covers a large share of UK fresh produce; Open Farm Sunday draws 200,000+ visitors; national.",
          scale: "L",
          verified: false
        },
        {
          name: "Food, Farming & Countryside Commission",
          url: "https://ffcc.co.uk/",
          type: "charity",
          summary: "Independent commission (grew out of the RSA's 2017–19 inquiry) working on a fair transition for food, farming and land use — reports, citizen assemblies, and convening across the sector.",
          reach: "Small organisation, senior-level convening power; national.",
          scale: "M",
          verified: false
        },
        {
          name: "Sustain",
          url: "https://www.sustainweb.org/",
          type: "charity",
          summary: "Alliance of ~100 food and farming organisations campaigning on policy — from farm payments and supply-chain fairness to local food and public procurement.",
          reach: "Broad alliance; strong Westminster presence.",
          scale: "M",
          verified: false
        },
        {
          name: "RSPB (Hope Farm & farm advisory)",
          url: "https://www.rspb.org.uk/",
          type: "charity",
          summary: "Runs Hope Farm in Cambridgeshire as a commercial arable demonstration of nature-friendly farming, plus a farm advisory team and extensive policy work on agriculture.",
          reach: "1.2m members; one of the largest landowners and most influential NGOs in UK farm policy.",
          scale: "L",
          verified: false
        },
        {
          name: "The Wildlife Trusts",
          url: "https://www.wildlifetrusts.org/",
          type: "charity",
          summary: "Federation of 46 local trusts, many with farm advice teams and their own farmed reserves; involved in farmer clusters and the Jordans Farm Partnership.",
          reach: "900,000+ members; on the ground in every county.",
          scale: "L",
          verified: false
        }
      ]
    },

    /* -------------------------------------------------------------------- */
    {
      id: "land",
      title: "Land access & new entrants",
      blurb: "Organisations tackling the other big barrier — getting land at all. " +
             "Different problem from transition funding, but the same farmers and " +
             "often the same funders.",
      orgs: [
        {
          name: "Ecological Land Cooperative",
          url: "https://ecologicalland.coop/",
          type: "co-op",
          summary: "Member-led social enterprise (since 2009) that buys land, wins planning permission and creates affordable small farms let on 150-year leases to new agroecological farmers, with business-planning support and ongoing monitoring.",
          reach: "A handful of sites across England and Wales; the only national body offering residential smallholdings this way.",
          scale: "S",
          verified: true
        },
        {
          name: "Countryside Regeneration Trust",
          url: "https://www.thecrt.co.uk/",
          type: "charity",
          summary: "Charity that owns farms and lets them to tenants who farm for nature, demonstrating that wildlife-friendly farming can be commercially viable.",
          reach: "Around 20 properties / ~2,000 hectares; national portfolio.",
          scale: "M",
          verified: false
        },
        {
          name: "Kindling Trust",
          url: "https://kindling.org.uk/",
          type: "charity",
          summary: "Greater Manchester charity that pioneered the FarmStart model — incubator plots and training for new commercial growers — and runs a community-owned farm.",
          reach: "Regional; the template for FarmStart schemes elsewhere.",
          scale: "S",
          verified: false
        },
        {
          name: "Shared Assets",
          url: "https://www.sharedassets.org.uk/",
          type: "cic",
          summary: "Think-and-do tank on land as a common good — research and support for community land projects and new-entrant access.",
          reach: "Small; influential in the land-reform conversation.",
          scale: "S",
          verified: false
        },
        {
          name: "Land In Our Names (LION)",
          url: "https://landinournames.community/",
          type: "cic",
          summary: "Grassroots collective addressing land injustice for Black people and people of colour in Britain, including access to farmland.",
          reach: "Small; growing profile.",
          scale: "S",
          verified: false
        }
      ]
    },

    /* -------------------------------------------------------------------- */
    {
      id: "welfare",
      title: "Farmer welfare & hardship support",
      blurb: "The existing charities that already put money and support into " +
             "struggling farm households. None of them fund a planned transition, " +
             "but they know the financial and mental-health realities better than anyone.",
      orgs: [
        {
          name: "RABI (Royal Agricultural Benevolent Institution)",
          url: "https://rabi.org.uk/",
          type: "charity",
          summary: "Financial, practical and mental-health support for farming people in England, Wales and Northern Ireland — hardship grants, a 24/7 helpline, counselling. Its Big Farming Survey is the reference on farmer wellbeing.",
          reach: "Founded 1860; millions of pounds in grants a year; sister charity RSABI in Scotland.",
          scale: "L",
          relevance: "The nearest existing model of a charity giving farmers direct cash — but reactive, not for a planned change of system.",
          verified: true
        },
        {
          name: "Farming Community Network (FCN)",
          url: "https://fcn.org.uk/",
          type: "charity",
          summary: "Volunteer network offering free, confidential support to farmers and families through difficult times — financial, personal, business.",
          reach: "400+ volunteers across England and Wales; helpline; part of the Farming Help partnership.",
          scale: "M",
          verified: true
        },
        {
          name: "The Royal Countryside Fund",
          url: "https://www.royalcountrysidefund.org.uk/",
          type: "charity",
          summary: "Founded in 2010 by King Charles III. Grants to rural community projects and the free Farm Resilience Programme — business-skills training for family farms — plus support for farm support groups and the Farming Help network.",
          reach: "UK-wide; thousands of family farms through Farm Resilience; a royal-backed convening role.",
          scale: "L",
          relevance: "Already runs a national programme aimed at family-farm viability; obvious partner or comparator.",
          verified: true
        },
        {
          name: "Addington Fund",
          url: "https://www.addingtonfund.org.uk/",
          type: "charity",
          summary: "Provides homes for farming families in England and Wales who have to leave the industry, and emergency support through Farming Help.",
          reach: "Owns and lets ~70 properties; national.",
          scale: "S",
          verified: true
        },
        {
          name: "Forage Aid",
          url: "https://forageaid.org.uk/",
          type: "charity",
          summary: "Emergency forage and bedding for livestock farmers hit by flood, fire or extreme weather.",
          reach: "Small, activated in crises; part of Farming Help.",
          scale: "S",
          verified: true
        },
        {
          name: "The DPJ Foundation",
          url: "https://www.thedpjfoundation.co.uk/",
          type: "charity",
          summary: "Welsh mental-health charity for agricultural communities — counselling and training.",
          reach: "Wales.",
          scale: "S",
          verified: false
        }
      ]
    },

    /* -------------------------------------------------------------------- */
    {
      id: "outcomes",
      title: "Paying farmers for the transition — outcome payments, premiums & private finance",
      blurb: "The closest existing answers to 'who pays for the dip'. Mostly " +
             "commercial or blended finance, mostly paying for verified outcomes " +
             "(carbon, water, biodiversity) or a product premium rather than replacing " +
             "lost income.",
      orgs: [
        {
          name: "Food & Nature Resilience Fund (Lloyds Banking Group + Wildfarmed)",
          url: "https://sustainabilitymag.com/news/lloyds-bank-wildfarmed-funding-regenerative-agriculture",
          type: "programme",
          summary: "Launched 2026 to pay farmers directly for verified improvements as they adopt regenerative practices, pooling money from banks, water companies, insurers and food businesses. Early backers include Severn Trent, Affinity Water and AXA XL. Explicitly aimed at the financial barrier — the fund cites 92% of farmers naming money, not knowledge, as the obstacle.",
          reach: "Year-one target £1.3m; new, but the highest-profile UK attempt at exactly this problem.",
          scale: "M",
          relevance: "The most direct comparator to a transition-funding charity. Study its structure, verification and payment triggers closely.",
          verified: true
        },
        {
          name: "Wildfarmed",
          url: "https://wildfarmed.co.uk/",
          type: "company",
          summary: "Regenerative grain brand that contracts farmers to its own audited standard and pays a premium, selling flour and bread through major retailers and food service.",
          reach: "100+ contracted farms; a national consumer brand; co-founder of the Food & Nature Resilience Fund.",
          scale: "M",
          verified: true
        },
        {
          name: "Green Farm Collective",
          url: "https://greenfarmcollective.com/",
          type: "co-op",
          summary: "Farmer-owned group selling regeneratively grown grain at a premium against its own independently audited standard.",
          reach: "Small cohort of arable farms; growing.",
          scale: "S",
          verified: true
        },
        {
          name: "Soil Capital",
          url: "https://www.soilcapital.com/",
          type: "company",
          summary: "Certified multi-national carbon-farming programme paying farmers for verified soil-carbon and emissions improvements; active in the UK, France and Belgium.",
          reach: "Paid ~£870k to its first 100 farmers; several hundred farms enrolled across Europe.",
          scale: "M",
          verified: true
        },
        {
          name: "Agreena",
          url: "https://agreena.com/",
          type: "company",
          summary: "AgreenaCarbon programme: farmers log a practice baseline and plan, adopt regenerative practices, and earn verified carbon certificates, monitored by satellite and soil sampling.",
          reach: "Large European footprint; UK arable presence.",
          scale: "M",
          verified: true
        },
        {
          name: "Regenerate Outcomes",
          url: "https://www.regenerateoutcomes.co.uk/",
          type: "company",
          summary: "Mentoring and training in regenerative agriculture at no up-front cost to the farmer, funded by a share of the soil-carbon credits it baselines and measures on the farm.",
          reach: "Growing cohort of UK farms; runs farm walks with Pasture for Life.",
          scale: "S",
          relevance: "A 'we absorb the up-front cost' model worth understanding — and a possible delivery partner.",
          verified: true
        },
        {
          name: "Water-company catchment schemes (e.g. South West Water 'Upstream Thinking', Severn Trent STEPS)",
          url: "https://www.southwestwater.co.uk/environment/working-in-the-environment/upstream-thinking/",
          type: "programme",
          summary: "Water companies pay farmers to change practice in drinking-water catchments — cover crops, buffer strips, reduced inputs — because it is cheaper than treating pollution downstream.",
          reach: "Millions of pounds a year across several companies; regional in each case.",
          scale: "M",
          relevance: "Proven 'downstream beneficiary pays the farmer' logic — a natural co-funder for a transition fund.",
          verified: false
        },
        {
          name: "Corporate supply-chain programmes (Arla FarmAhead, First Milk / Nestlé, McCain, PepsiCo, Waitrose, etc.)",
          url: "https://www.nestle.co.uk/en-gb/media/pressreleases/allpressreleases/allerton-farm-partnership",
          type: "programme",
          summary: "Processors and retailers paying their own suppliers incentives or premiums to adopt regenerative practices, usually tied to Scope 3 emissions targets.",
          reach: "Collectively the largest private money in UK regen, but tied to each company's supply base.",
          scale: "L",
          verified: false
        },
        {
          name: "Bank transition lending (Lloyds, NatWest, Oxbury)",
          url: "https://www.oxbury.com/",
          type: "company",
          summary: "Specialist and high-street banks offering discounted or purpose-built lending for nature-friendly and regenerative investment; Oxbury is the UK's agricultural specialist bank.",
          reach: "National; debt, not grant — so it moves the cost, it doesn't remove it.",
          scale: "M",
          verified: false
        },
        {
          name: "Real Farming Trust — LEAP loans and grants",
          url: "https://www.realfarmingtrust.org/leap",
          type: "charity",
          summary: "The 'Loans for Enlightened Agriculture Programme' offers blended loans and grants plus mentoring to agroecological food and farming enterprises that struggle to get mainstream finance.",
          reach: "Small fund; one of the very few charitable finance offers in this space.",
          scale: "S",
          relevance: "The nearest charity-run finance model; talk to them first.",
          verified: false
        },
        {
          name: "Environment Bank / Biodiversity Net Gain habitat banks",
          url: "https://environmentbank.com/",
          type: "company",
          summary: "Pays landowners long-term for creating habitat banks sold as biodiversity units to developers under mandatory BNG.",
          reach: "National; land-use change rather than farming-system change.",
          scale: "M",
          verified: false
        }
      ]
    },

    /* -------------------------------------------------------------------- */
    {
      id: "funders",
      title: "Philanthropic funders active in this space",
      blurb: "Who would fund a new transition charity, and who already funds the " +
             "organisations above.",
      orgs: [
        {
          name: "Esmée Fairbairn Foundation",
          url: "https://esmeefairbairn.org.uk/our-aims/our-natural-world/farming/",
          type: "funder",
          summary: "One of the UK's largest independent foundations, with an explicit nature-friendly farming strand under 'Our Natural World' — grants over £30,000 for up to three years — and published thinking on financing sustainable agriculture.",
          reach: "£40m+ a year across all aims; the anchor funder of the UK regen/agroecology movement.",
          scale: "L",
          verified: true
        },
        {
          name: "Farming the Future",
          url: "https://farmingthefuture.org.uk/",
          type: "funder",
          summary: "Pooled fund for agroecology and food-system change, backed by Esmée Fairbairn, the European Climate Foundation, the Aurora Trust and the Mark Leonard Trust among others; funds advocacy, farmer-led research and movement infrastructure.",
          reach: "Several million pounds committed since 2020; the collaborative funding hub for this field.",
          scale: "M",
          verified: true
        },
        {
          name: "Rothschild Foundation",
          url: "https://rothschildfoundation.org.uk/philanthropy-in-regenerative-food-and-farming-driving-systems-change/",
          type: "funder",
          summary: "Has set out a strategy to scale regenerative agriculture through farmer networks and knowledge exchange, connecting farmers to research, and building the evidence and business models — funds Innovative Farmers among others.",
          reach: "Buckinghamshire roots, national environment programme.",
          scale: "M",
          verified: true
        },
        {
          name: "King Charles III Charitable Fund",
          url: "https://kccf.org.uk/",
          type: "funder",
          summary: "Funds Innovative Farmers and other sustainable-farming and rural work; sister to the Royal Countryside Fund.",
          reach: "National; royal convening power.",
          scale: "M",
          verified: true
        },
        {
          name: "Aurora Trust and Mark Leonard Trust",
          url: "https://farmingthefuture.org.uk/",
          type: "funder",
          summary: "Family trusts that are consistent funders of agroecology, farmer-led research and food-system advocacy, largely through Farming the Future and Innovative Farmers.",
          reach: "Medium; quiet but reliable.",
          scale: "M",
          verified: true
        },
        {
          name: "A Team Foundation",
          url: "https://ateamfoundation.org/",
          type: "funder",
          summary: "Funds regenerative and agroecological food and land work, with an interest in land access and new entrants.",
          reach: "Small to medium; part of the same funder cluster.",
          scale: "S",
          verified: false
        },
        {
          name: "Daylesford Foundation",
          url: "https://daylesfordfoundation.com/",
          type: "funder",
          summary: "The Bamford family foundation; funds Agricology and organic/regenerative education.",
          reach: "Medium; closely tied to the Daylesford organic business.",
          scale: "S",
          verified: true
        },
        {
          name: "Ashden",
          url: "https://ashden.org/",
          type: "charity",
          summary: "Climate-solutions charity that runs the Ashden Awards, including categories for regenerative and nature-based farming, and supports winners to scale.",
          reach: "International; profile-raising rather than core funding.",
          scale: "S",
          verified: false
        }
      ]
    },

    /* -------------------------------------------------------------------- */
    {
      id: "public",
      title: "Government & public schemes (context)",
      blurb: "Not charities, but the baseline every farmer's transition maths starts " +
             "from. A new fund would most likely top these up, bridge their gaps, or " +
             "de-risk the years they don't cover.",
      orgs: [
        {
          name: "Environmental Land Management — Sustainable Farming Incentive (England)",
          url: "https://www.gov.uk/government/collections/sustainable-farming-incentive-guidance",
          type: "public",
          summary: "Defra's post-CAP scheme paying per-hectare or per-action for practices such as no-till, cover crops, herbal leys and reduced inputs. SFI closed to new applicants in March 2025; a reformed offer for 2026 has been announced — check the current position before relying on it.",
          reach: "The single largest source of transition money in England; over £2.7bn a year committed to farming, food security and nature recovery for 2026–27 to 2028–29.",
          scale: "L",
          relevance: "Understanding what SFI does and doesn't pay for defines the gap a charity would fill.",
          verified: true
        },
        {
          name: "Countryside Stewardship (Higher Tier) & Landscape Recovery",
          url: "https://www.gov.uk/government/collections/countryside-stewardship-get-paid-for-environmental-land-management",
          type: "public",
          summary: "Longer-term, more ambitious agreements for habitat creation and landscape-scale change, sitting above SFI in the ELM structure.",
          reach: "England; thousands of agreements.",
          scale: "L",
          verified: false
        },
        {
          name: "Capital Grants 2026",
          url: "https://defrafarming.blog.gov.uk/2026/03/19/the-2026-capital-grants-offer/",
          type: "public",
          summary: "One-off capital payments for environmental improvements — fencing, hedgerows, water and slurry infrastructure — across England.",
          reach: "£225m available in 2026.",
          scale: "L",
          verified: true
        },
        {
          name: "Facilitation Fund",
          url: "https://www.gov.uk/guidance/facilitation-fund",
          type: "public",
          summary: "Pays for the facilitators who run Farmer Clusters.",
          reach: "England; underpins the 220+ clusters.",
          scale: "M",
          verified: true
        },
        {
          name: "Devolved schemes — Sustainable Farming Scheme (Wales), Whole Farm Plan / AECS (Scotland), Farming with Nature (NI)",
          url: "https://www.gov.wales/sustainable-farming-scheme",
          type: "public",
          summary: "Each nation is building its own successor to CAP with a nature and climate strand; Wales' SFS starts in 2026.",
          reach: "National within each nation.",
          scale: "L",
          verified: false
        }
      ]
    },

    /* ==================================================================== *
     * Beyond the farm gate (added 19 Sep 2026). The two categories below
     * are the upper layers of systems.html — the supply chains farms sell
     * into, and the demand that drives them. A farm can't stay regenerative
     * if nobody will buy what a diverse, low-input farm grows.
     * ==================================================================== */
    {
      id: "supply-chains",
      title: "Shorter, fairer supply chains",
      blurb: "The routes from farm to plate that don't run through bulk supermarket " +
             "contracts — local retailers, food hubs, box schemes, small abattoirs and " +
             "mills, fairer public procurement — plus the regulator that polices the " +
             "big retailers. Where a farmer's changed output finds a buyer.",
      orgs: [
        {
          name: "Groceries Code Adjudicator",
          url: "https://www.gov.uk/government/organisations/groceries-code-adjudicator",
          type: "public",
          summary: "The independent regulator that enforces the Groceries Supply Code of Practice on the biggest retailers — how they treat their direct suppliers on delistings, forecasting, late payment and invoice disputes. Runs an annual confidential supplier survey.",
          reach: "Covers 14 designated retailers (Tesco, Sainsbury's, Asda, Morrisons, Aldi, Lidl, Co-op, Waitrose, M&S, Iceland, Ocado, Amazon, B&M, TJ Morris). 2026 survey: compliance 'high' but Code issues slightly up; statutory review debated April 2026.",
          scale: "L",
          relevance: "Only protects direct suppliers, not most farmers further up the chain — a recurring campaign target for widening its remit.",
          verified: true
        },
        {
          name: "Better Food Traders",
          url: "https://betterfoodtraders.org/",
          type: "cic",
          summary: "UK-wide network of ethical retailers — shops, veg box schemes, food hubs, market stalls, bakeries — that sell organic and agroecological food and buy directly from local farmers. Training, peer learning and an annual gathering. Spun out of Growing Communities; joined the Sustain alliance in 2024.",
          reach: "About 210 shops, markets, bakeries, hubs and farmers in the network.",
          scale: "M",
          relevance: "A ready route to market for transitioning farms' more varied, seasonal output.",
          verified: true
        },
        {
          name: "Growing Communities (Better Food Shed)",
          url: "https://growingcommunities.org/",
          type: "social-enterprise",
          summary: "Community-led Hackney organisation (since 1996) running a weekly organic veg scheme, a farmers' market and urban farms. Its not-for-profit wholesale arm, the Better Food Shed in Bow (2019), supplies local organic produce to shops, schools, NHS services and other veg schemes across London.",
          reach: "Routes to market for 20+ small organic farms and growers; veg scheme across north, east and south London.",
          scale: "S",
          relevance: "Template for the 'food hub' that aggregates many small farms for bigger buyers.",
          verified: true
        },
        {
          name: "Open Food Network UK",
          url: "https://about.openfoodnetwork.org.uk/",
          type: "social-enterprise",
          summary: "Open-source online marketplace software for food hubs, producers and community food enterprises to sell direct. Also led the Food Data Collaboration (2022–25) so local producers can list once and sell across several platforms.",
          reach: "Since 2014 has facilitated over £7m of sales of local, sustainable food.",
          scale: "M",
          verified: true
        },
        {
          name: "Local Food Plan (Sustain, Landworkers' Alliance, Pasture for Life, FFCC, Sustainable Food Trust)",
          url: "https://www.localfoodplan.org/",
          type: "programme",
          summary: "Joint programme mapping what holds the local food sector back — processing, aggregation, logistics, finance, procurement — and what would unlock it. Published 'Growing the Local Food Sector' (2024, 44 interviews) and the 'Local Food Growth Plan' (April 2025).",
          reach: "Two-year programme funded by the Rothschild Foundation; national policy reach through its five partners.",
          scale: "M",
          relevance: "The best current map of the infrastructure gaps between a regenerative farm and a local buyer.",
          verified: true
        },
        {
          name: "Abattoir Sector Group (convened by the Sustainable Food Trust)",
          url: "https://sustainablefoodtrust.org/our-work/local-abattoirs/",
          type: "network",
          summary: "Steering group of small abattoir operators, the Sustainable Food Trust, Rare Breeds Survival Trust, the Royal Countryside Fund, National Craft Butchers and others, working to stop the loss of small local abattoirs and rebuild the network.",
          reach: "Small abattoirs have been closing at ~10% a year; only around 49 small red-meat abattoirs remain across England, Wales and Scotland. Government has ring-fenced £3m for new abattoirs.",
          scale: "M",
          relevance: "Pasture-based livestock farms need a local abattoir to sell their own meat — without one, the premium goes to the processor.",
          verified: true
        },
        {
          name: "Farm Retail Association",
          url: "https://farmretail.co.uk/",
          type: "co-op",
          summary: "The national body for farm shops, farmers' markets and pick-your-own (formerly FARMA; roots back to 1979). Recently rebranded with Hugh Fearnley-Whittingstall as patron.",
          reach: "About 325 member farm shops and markets, out of 1,000+ in the UK.",
          scale: "M",
          verified: true
        },
        {
          name: "Dynamic Food Procurement National Advisory Board",
          url: "https://www.dynamicfood.org/",
          type: "network",
          summary: "Voluntary coalition promoting 'dynamic purchasing' so small local producers can win public-sector food contracts (schools, hospitals, prisons) instead of being locked out by big framework deals. Grew from the Bath & North East Somerset pilot.",
          reach: "B&NES pilot served 60+ primary schools with food spend 6% lower in real terms; praised by a Commons select committee as a model for national roll-out.",
          scale: "S",
          relevance: "Public procurement is the biggest single lever for guaranteed local demand.",
          verified: true
        },
        {
          name: "Riverford",
          url: "https://www.riverford.co.uk/",
          type: "company",
          summary: "Organic veg box company founded in 1987 by Guy Singh-Watson in Devon; fully employee-owned since 2023 and a B Corp. Grows on its own farms and buys from a group of mainly British small-scale organic growers.",
          reach: "About 75,000 boxes a week; turnover £116.8m (year to May 2025).",
          scale: "L",
          relevance: "Proof a short, seasonal chain can work at national scale.",
          verified: true
        },
        {
          name: "Hodmedod's",
          url: "https://hodmedods.co.uk/",
          type: "company",
          summary: "Suffolk company (2012) that grew out of the Norwich Resilient Food Project, building UK markets for British-grown pulses, grains and seeds — fava beans, carlin peas, lentils, quinoa — which were otherwise exported or fed to livestock.",
          reach: "Sells retail to wholesale (500g to tonnes); BBC Food & Farming Award winner.",
          scale: "S",
          relevance: "Creates a market for the break crops that diverse regenerative rotations produce.",
          verified: true
        },
        {
          name: "Real Bread Campaign (Sustain)",
          url: "https://www.sustainweb.org/realbread/",
          type: "programme",
          summary: "Sustain's campaign for additive-free bread from small local bakeries — runs the Real Bread Map, the Loaf Mark scheme and the microbakery handbook, and supports independent mills.",
          reach: "Around 1,000 micro and small bakeries, baking schools and mills on the Real Bread Map.",
          scale: "M",
          verified: true
        },
        {
          name: "WRAP — UK Food and Drink Pact (formerly Courtauld Commitment 2030)",
          url: "https://www.wrap.ngo/take-action/uk-food-drink-pact",
          type: "charity",
          summary: "WRAP's voluntary agreement across the whole food chain to cut food waste, greenhouse gas emissions and water stress from farm to fork.",
          reach: "Nearly 200 organisations including all the major supermarkets and big restaurant chains.",
          scale: "L",
          verified: true
        }
      ]
    },

    /* -------------------------------------------------------------------- */
    {
      id: "demand",
      title: "What we eat — diets, food culture & demand",
      blurb: "The people changing what the country wants to eat: school food and food " +
             "education, healthier and less-and-better-meat diets, campaigns against junk " +
             "food marketing, and the local and national food partnerships pulling it " +
             "together. Demand is what ultimately pays for regenerative farming.",
      orgs: [
        {
          name: "The Food Foundation (incl. Peas Please)",
          url: "https://foodfoundation.org.uk/",
          type: "charity",
          summary: "Food-policy think tank tracking the state of the UK diet — its annual 'Broken Plate' report — and running Peas Please, which gets retailers, caterers and manufacturers to pledge to sell more veg. Co-leads the Recipe for Change coalition.",
          reach: "Broken Plate 2025: healthier food is over twice the price per calorie; the poorest fifth would need 45% of disposable income for a healthy diet. Peas Please: 110 pledgers, 1.1bn extra portions of veg sold or served.",
          scale: "L",
          verified: true
        },
        {
          name: "Food for Life (Soil Association)",
          url: "https://www.foodforlife.org.uk/",
          type: "programme",
          summary: "The Soil Association's programme for better food in schools, hospitals, care homes and workplaces — the 'Food for Life Served Here' award certifies caterers for fresh, additive-free, local and organic ingredients.",
          reach: "1.7m+ Served Here meals a day across 10,000+ UK schools and other settings.",
          scale: "L",
          relevance: "Gold award requires 15%+ organic and significant local sourcing — direct, guaranteed demand for transitioning farms.",
          verified: true
        },
        {
          name: "Sustainable Food Places",
          url: "https://www.sustainablefoodplaces.org/",
          type: "network",
          summary: "UK network of local food partnerships — councils, farmers, food businesses and charities working on each place's food system, including linking local producers to public-sector contracts. Led by the Soil Association, Food Matters, Sustain, Food Sense Wales and Nourish Scotland.",
          reach: "120+ food partnerships; 123 local authorities working with them.",
          scale: "L",
          verified: true
        },
        {
          name: "Eating Better",
          url: "https://www.eating-better.org/",
          type: "network",
          summary: "Alliance working for 'less and better' meat and dairy — a 50% cut in UK consumption by 2030 and a shift to better (pasture-fed, higher-welfare, agroecological) meat and dairy as standard. Publishes sourcing guides for caterers and retailers.",
          reach: "About 70 member organisations, including Sustain, Pasture for Life, LEAF, NFFN, the Landworkers' Alliance and The Wildlife Trusts.",
          scale: "M",
          relevance: "The demand-side twin of pasture-based regenerative livestock.",
          verified: true
        },
        {
          name: "Bite Back",
          url: "https://www.biteback2030.com/",
          type: "charity",
          summary: "Youth-led movement founded by Jamie Oliver and Nicolai Tangen, campaigning to put child health first — especially against junk-food advertising and marketing aimed at young people.",
          reach: "National campaigns; its youth board helped win the government pledge to restrict online junk-food advertising.",
          scale: "M",
          verified: true
        },
        {
          name: "Chefs in Schools",
          url: "https://chefsinschools.org.uk/",
          type: "charity",
          summary: "Founded 2018 by Henry Dimbleby, chef Nicole Pisani and head teacher Louise Nichols. Puts trained chefs into school kitchens and upskills kitchen teams to cook from scratch, alongside food education.",
          reach: "Improved school food for 100,000+ children in its first six years.",
          scale: "M",
          verified: true
        },
        {
          name: "School Food Matters",
          url: "https://www.schoolfoodmatters.org/",
          type: "charity",
          summary: "London charity (2007) campaigning for fresh, sustainable school food and running food-education programmes — growing, cooking and selling produce, holiday food and fun.",
          reach: "76,600+ children in 800+ schools; works in every London borough and cities across England.",
          scale: "M",
          verified: true
        },
        {
          name: "Veg Power",
          url: "https://vegpower.org.uk/",
          type: "programme",
          summary: "Industry-and-media-backed campaign to get children eating more veg, best known for the 'Eat Them to Defeat Them' TV ads and primary schools programme.",
          reach: "2024: 620,000 children in 2,375 schools. Over six years: 1.7m children, 5,000+ schools, £20m+ of donated advertising.",
          scale: "L",
          verified: true
        },
        {
          name: "Recipe for Change",
          url: "https://www.recipeforchange.org.uk/",
          type: "network",
          summary: "Coalition calling for a levy on unhealthy food (building on the Soft Drinks Industry Levy), reformulation by industry, and the revenue reinvested in children's health and access to good food. Led by Sustain, the Obesity Health Alliance and the Food Foundation.",
          reach: "41 health organisations, royal medical colleges and food campaigners.",
          scale: "M",
          verified: true
        },
        {
          name: "Obesity Health Alliance",
          url: "https://obesityhealthalliance.org.uk/",
          type: "network",
          summary: "Coalition of health charities, medical royal colleges and campaign groups pushing for policies on the food environment — marketing, promotions, reformulation — rather than individual willpower.",
          reach: "50+ member organisations, including the BMA, Cancer Research UK, Diabetes UK and British Heart Foundation.",
          scale: "L",
          verified: true
        },
        {
          name: "Slow Food in the UK",
          url: "https://www.slowfood.org.uk/",
          type: "network",
          summary: "UK arm of the international Slow Food movement: local groups, the Ark of Taste catalogue of traditional foods at risk, and a Cooks' Alliance of chefs committed to using them.",
          reach: "80 UK products on the Ark of Taste; around 100 chefs in the Cooks' Alliance.",
          scale: "S",
          relevance: "Builds demand for flavour and variety — rare breeds, heritage grains, regional foods.",
          verified: true
        },
        {
          name: "Nourish Scotland",
          url: "https://www.nourishscotland.org/",
          type: "charity",
          summary: "Scottish food-justice campaign that pushed for the Good Food Nation Act and now presses for its plans to be delivered; Scotland lead for Sustainable Food Places.",
          reach: "Food partnerships in 15 of Scotland's 32 local authority areas.",
          scale: "M",
          verified: true
        },
        {
          name: "Food Sense Wales",
          url: "https://www.foodsensewales.org.uk/",
          type: "charity",
          summary: "Founded 2018 to put sustainable food and farming at the heart of Welsh policy ('food in all policies'); runs Peas Please, Sustainable Food Places and Food for Life work in Wales.",
          reach: "Wales-wide.",
          scale: "M",
          verified: true
        }
      ]
    }
  ],

  /* Read-across''' for the charity idea — where the gap seems to be. */
  gap: [
    "Nobody on this list is a charity offering multi-year, income-replacing grants to a farmer for the specific purpose of getting through the yield-and-income dip of a planned transition. That gap is real.",
    "The closest things are: the Food & Nature Resilience Fund (pays for verified outcomes, not lost income; commercial backers); Regenerate Outcomes (absorbs up-front training cost against future carbon credits); Real Farming Trust's LEAP (small charitable loans/grants); the Royal Countryside Fund's Farm Resilience Programme (skills, not cash); and SFI (per-action payments that don't track a farm's income curve).",
    "The pieces a new charity would not need to build exist already: farmer reach (NFFN, Farmer Clusters, Groundswell, BASE-UK, Pasture for Life), advice and mentoring (FWAG, Allerton, FarmED, Regenerate Outcomes), measurement (Farm Carbon Toolkit, Global Farm Metric, Soil Association Exchange), and funders (Esmée Fairbairn, Farming the Future, Rothschild).",
    "Beyond the farm gate, the gap is infrastructure more than intent: plenty of organisations are building demand (Food for Life, Eating Better, the Food Foundation) and short chains (Better Food Traders, food hubs), but small abattoirs, mills and aggregation hubs are closing or missing — so a transitioning farm's more varied output often has nowhere local to go. A transition fund may need a route-to-market partner as much as a cheque.",
    "The hard design questions are the ones the existing outcome-payers have dodged: how to define and verify 'the dip' fairly, how to avoid paying for change that would have happened anyway, and how to hand off to a market premium or public scheme at the end."
  ]
};
