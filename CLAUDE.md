# Olivar Open — Claude instructions

This repo stores historical match data for the Olivar Open family tennis tournament. See README.md for the full data model.

## ID conventions

- Player IDs: `p1`, `p2`, ... — always check the last used ID in `players.csv` before adding new players.
- Match IDs: `m1`, `m2`, ... — always check the last used ID in `matches.csv` before adding new matches.
- Entry IDs: plain integers, sequential — check last used in `entries.csv`.
- Family IDs: `f1`–`f7` — fixed, defined in `families.csv`.
- Category IDs: sequential integers — check `categories.csv`.
- Edition IDs: sequential integers — check `editions.csv`.

## Data entry conventions

- **Names**: always use the full formal name in `name` (e.g. `Catalina Picon`, `Francisca Ross`). Put the common name or apodo in `nickname` (e.g. `Cata`, `Fran`). Never use the nickname as the primary name.
- **Scores**: winner's tally always first. See `docs/scoring_conventions.md` for full notation rules.
- **No round-robin**: all draws are single-elimination. Valid `round` values are `R16`, `QF`, `SF`, `3P`, `F`. Never add a `group` column.
- **Doubles**: use `winner2_id` and `loser2_id` for the second player of each pair. Leave blank for singles matches.
- **Uncertain scores**: enter the best available score and add `score unconfirmed` in the `notes` column.
- **Modified draws**: if a player appears in the draw but did not actually play, do not create a match row and do not add them to `entries.csv`. They can still exist in `players.csv` for future editions.

## Current state (as of edition 10, 2026)

### Entered
- `mens_singles_exportacion` (category_id=1): complete. Winner: JP (p2).
- `mens_singles_nacional` (category_id=2): complete. Winner: Chuma (p11).
- `womens_singles` (category_id=3): complete. Winner: Isi (p27).

### Pending
- `mixed_doubles` (category_id=4): not yet entered.
- `jr_doubles` (category_id=5): not yet entered.
- `referee_id` fields: left blank across all matches; to be filled in later.
- `family_id` on players: column exists but all values are blank; assignment deferred.

### Known data issues
- `m23` (womens singles SF, Isi beat Fran): score `6-1` is unconfirmed. Flagged in `notes`.

## Family context

Seven family branches, each descending from one of seven siblings (1 man, 6 women):

| family_id | name | branch |
|---|---|---|
| f1 | Correa | |
| f2 | Ruiz Tagle | Eugenia |
| f3 | Ruiz Tagle | Carola |
| f4 | Ovalle | |
| f5 | Lihn | |
| f6 | Andueza-Melero | |
| f7 | Ross | |

Known relationships (see `relationships.csv`):
- p1 (Ness) is parent of p9 (Rafa) and p12 (Andrés Jr.)
- p7 (Agustin) and p18 (Tomas) are siblings (Andueza-Melero family)
- p11 (Chuma) and p13 (Vicho) are siblings (Ruiz Tagle family)
