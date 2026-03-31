# Olivar Open — Data Repository

Historical match data for the Olivar Open, an annual family tennis tournament. First held in 2014; editions 10 (2026) is the latest. Editions 2020 and 2021 were skipped due to the pandemic.

## Tournament structure

Each edition has several categories (e.g. men's singles, women's singles, mixed doubles). Categories and their formats vary across editions. All draws are single-elimination (knockout). There are no round-robin stages.

The player pool is a large extended family of seven branches: Correa, Ruiz Tagle (Eugenia's), Ruiz Tagle (Carola's), Ovalle, Lihn, Andueza-Melero, and Ross.

## Data files

```
data/
├── players.csv         # All players across all editions
├── families.csv        # The seven family branches
├── editions.csv        # One row per annual tournament
├── categories.csv      # Timeless category definitions (Femenino, Exportación, etc.)
├── tournaments.csv     # One row per category × edition (the actual draw)
├── entries.csv         # Which players entered which category (includes seedings)
├── matches.csv         # All match results
└── relationships.csv   # Known family relationships between players
```

### categories.csv
A category type is the timeless flavor of a draw (e.g. "Femenino", "Masculino Nacional"). It exists independently of any edition — you can reference it when talking about rules, history, or eligibility across years.

| Column | Description |
|---|---|
| `category_id` | Unique ID (e.g. `ct1`) |
| `name` | Machine-readable name (e.g. `womens_singles`) |
| `label` | Human-readable name in Spanish |
| `default_format` | Default score format — see below |
| `slug` | Short Spanish URL-friendly name (e.g. `femenino`) |

### tournaments.csv
A tournament is a specific draw: one category type in one edition (e.g. "the 2026 Femenino"). Foreign key `category_id` is used in `entries.csv` and `matches.csv`.

| Column | Description |
|---|---|
| `tournament_id` | Unique ID (e.g. `1`) |
| `edition_id` | Which edition |
| `category_id` | Which category |
| `format` | Score format override; if blank, inherits `default_format` from category type |
| `notes` | Anything worth flagging |

### players.csv
| Column | Description |
|---|---|
| `player_id` | Unique ID (e.g. `p1`) |
| `name` | Full name |
| `nickname` | Common name or apodo (e.g. `Ness`, `Chuma`) |
| `gender` | `M` or `F` |
| `birth_year` | Optional |
| `photo_url` | Optional link to a photo |
| `family_id` | Reference to `families.csv` |

### editions.csv
One row per year the tournament was held.

### entries.csv
One row per player per category per edition. Captures participation and seedings.

### matches.csv
| Column | Description |
|---|---|
| `match_id` | Unique ID (e.g. `m1`) |
| `edition_id` / `tournament_id` | Foreign keys |
| `round` | `R16`, `QF`, `SF`, `3P`, `F` |
| `winner1_id` | Winner (singles) or first player of winning pair (doubles) |
| `winner2_id` | Second player of winning pair; blank for singles |
| `loser1_id` / `loser2_id` | Same pattern for the losing side |
| `score` | See score notation below |
| `referee_id` | Player ID of the referee, if recorded |
| `walkover` | `true` if the match was not played |
| `notes` | Anything worth flagging |

### relationships.csv
Known family links. `parent_child` means player1 is the parent of player2. `siblings` is undirected.

## Score notation

Scores are always written from the **winner's perspective** (winner's tally first).

### `single_set_noad`
One set, no-advantage. Tiebreak at 5-5 (played to 7, no-ad; golden point at 6-6).

- Normal: `6-4`
- Tiebreak: `6-5(N)` where N is the loser's tiebreak points — e.g. `6-5(4)` means the tiebreak was 7-4.

### `super_tiebreak_noad`
Super tiebreak to 10 points, no-advantage. Golden point at 9-9.

- Written as `[W-L]` — e.g. `[10-7]`.

### Finals exception
Finals tiebreaks require a 2-point margin (no golden point). Record the actual final score.

## Contributing

To add results for a new edition:
1. Add a row to `editions.csv`.
2. Add rows to `tournaments.csv` for that edition's categories and formats.
3. Add any new players to `players.csv` (full name in `name`, common name in `nickname`).
4. Add entries to `entries.csv`, including seeds where applicable.
5. Add matches to `matches.csv`, one row per match, using the score notation above.
