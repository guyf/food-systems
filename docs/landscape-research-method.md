# Method: mapping the UK regenerative-farming landscape

How `data/organisations.js` (rendered at `organisations.html`) was compiled, and a
prompt to re-run it. First pass: 16 September 2026.

## Purpose

Guy is considering a charity that **funds UK farmers through the income dip of a
transition from intensive to regenerative farming** — bridging the years when
inputs are cut, yields fall and the new system hasn't yet reached a viable income.
Before designing it, map who already does what, so the charity fills a real gap
and partners rather than duplicates.

## Scope

- **Geography:** UK (England, Scotland, Wales, Northern Ireland). International
  bodies only where they run a UK programme.
- **Include:** anything that helps a farmer change system — peer networks, advice
  and demonstration, research, certification/standards, advocacy, land access,
  farmer welfare and hardship money, outcome payments and premiums, transition
  finance (grant, loan, blended), philanthropic funders of this field, and the
  public schemes that set the baseline.
- **Exclude:** general farming bodies with no regenerative strand (NFU, CLA,
  AHDB) except as context; purely academic departments; rewilding bodies that
  take land out of farming; overseas-only programmes.

## Categories

1. Farmer-led networks & peer learning
2. Knowledge, advice, research & demonstration farms
3. Advocacy, policy, certification & standards
4. Land access & new entrants
5. Farmer welfare & hardship support
6. Paying farmers for the transition — outcome payments, premiums & private finance
7. Philanthropic funders active in this space
8. Government & public schemes (context)

Plus a short **"Where the gap is"** read-across at the end, written from the
charity's point of view.

## Per-entry fields

| field       | what to write |
|-------------|---------------|
| `name`      | as the organisation styles itself; brackets for the parent / alias |
| `url`       | home page, or the most relevant programme page |
| `type`      | charity · cic · co-op · company · programme · funder · public · network · union · research |
| `summary`   | 2–3 sentences on what they *actually do* — not their mission statement |
| `reach`     | size / importance / reach, with a number where one exists (members, farms, hectares, £, visitors, founding year) |
| `scale`     | L national/large · M national/medium · S regional/small — a judgement, not a formula |
| `relevance` | optional: why it matters to a transition-funding charity (partner, comparator, template, gap) |
| `verified`  | `true` only if a fact in the entry was checked against a live web source in this pass |

## Search strategy (what was actually run)

Web searches, one or two per category, of the form:

- `UK farmer-led regenerative agriculture networks <names>`
- `<organisation> members farms hectares UK` — to get a reach number
- `UK charities funding farmers transition to regenerative agriculture bridging finance income gap <year>`
- `<welfare charities> farmer support charities UK`
- `<foundations> funding regenerative farming UK grants`
- `<outcome-payers> paying UK farmers regenerative transition outcomes`
- `<certifiers / networks> certified members UK`

Each result was mined for: the organisation's own description, one hard reach
number, adjacent organisations mentioned (the "who else is in the room" test),
and any funder named. Entries with no search hit were written from general
knowledge and marked `verified: false`.

**Best single sources found:** the Esmée Fairbairn "Financing the future of UK
sustainable agriculture" piece; the Rothschild Foundation regenerative
food-and-farming strategy page; the Farming Help partnership pages (welfare
charities); GWCT's Farmer Clusters ten-year review; the Soil Association /
Innovative Farmers pages; and coverage of the 2026 Lloyds–Wildfarmed Food &
Nature Resilience Fund (the closest comparator to the charity idea).

## Judging "size / importance / reach"

Prefer one verifiable number over adjectives. In descending usefulness:
paying members or contracted farms → hectares / clusters / sites → annual
grant or payment total → annual visitors or delegates → year founded and
staff size. Where nothing is published, say "small" and mark unverified.

## Known gaps in this pass

- No Scottish or Northern Irish farmer networks beyond the devolved public
  schemes (e.g. Soil Association Scotland, Pasture for Life Scotland, RSABI,
  NFFN nations chapters are only mentioned in passing).
- Agroforestry and horticulture-specific bodies (Agroforestry Research Trust,
  Soil Association's agroforestry work) not listed.
- Corporate supply-chain programmes lumped into one line; worth a page of
  their own if the charity might co-fund with them.
- Reach numbers not audited against annual reports / Charity Commission.
- Regional FarmStart schemes, farm clusters' own websites, and university
  centres (Harper Adams, RAU, Cranfield soils) omitted for length.

## Prompt to re-run this

> Refresh `data/organisations.js` for the food-systems site. Read
> `docs/landscape-research-method.md` first and keep its categories and fields.
> For every existing entry, re-check the URL still resolves and update `reach`
> with the latest published number (members, farms, hectares, £, visitors),
> setting `verified: true` only where you found a live source this pass. Then
> search for organisations that have appeared since the `updated` date —
> especially new transition-finance or outcome-payment schemes, new pooled
> funds, and anything Scotland / Wales / NI specific — and add them. Address
> the "Known gaps" list. Rewrite the `gap` section from the point of view of a
> charity that funds farmers through the income dip of a regenerative
> transition. Update the `updated` date, run `node --check data/organisations.js`,
> and summarise what changed.
