/* organisations.js — the UK regenerative-farming landscape.
 * ============================================================================
 * FIRST PASS (16 Sep 2026). Who is already active in helping UK farmers move
 * from intensive to regenerative / agroecological / nature-friendly farming —
 * networks, advisers, certifiers, funders, land-access bodies, welfare
 * charities, outcome-payers and public schemes.
 *
 * Compiled to inform a possible new charity that would fund farmers through
 * the income dip of a transition (see the "Where the gap is" section on the
 * page). Method: docs/landscape-research-method.md — re-run it to refresh.
 *
 * Shape of one entry:
 * {
 *   name, url,
 *   type:     "charity" | "cic" | "co-op" | "company" | "programme" |
 *             "funder" | "public" | "network" | "union" | "research"
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
  updated: "2026-09-16",
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
    }
  ],

  /* Read-across for the charity idea — where the gap seems to be. */
  gap: [
    "Nobody on this list is a charity offering multi-year, income-replacing grants to a farmer for the specific purpose of getting through the yield-and-income dip of a planned transition. That gap is real.",
    "The closest things are: the Food & Nature Resilience Fund (pays for verified outcomes, not lost income; commercial backers); Regenerate Outcomes (absorbs up-front training cost against future carbon credits); Real Farming Trust's LEAP (small charitable loans/grants); the Royal Countryside Fund's Farm Resilience Programme (skills, not cash); and SFI (per-action payments that don't track a farm's income curve).",
    "The pieces a new charity would not need to build exist already: farmer reach (NFFN, Farmer Clusters, Groundswell, BASE-UK, Pasture for Life), advice and mentoring (FWAG, Allerton, FarmED, Regenerate Outcomes), measurement (Farm Carbon Toolkit, Global Farm Metric, Soil Association Exchange), and funders (Esmée Fairbairn, Farming the Future, Rothschild).",
    "The hard design questions are the ones the existing outcome-payers have dodged: how to define and verify 'the dip' fairly, how to avoid paying for change that would have happened anyway, and how to hand off to a market premium or public scheme at the end."
  ]
};
