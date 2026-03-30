# Score Recording Conventions

## Formats

### `single_set_noad`
One set, no-advantage. Tiebreak at 5-5 (played to 7, no-ad; golden point at 6-6).

Score notation:
- Normal set: `6-0`, `6-1`, `6-2`, `6-3`, `6-4`
- Tiebreak: `6-5(N)` where N is the **loser's** tiebreak point total
  - Example: winner leads 5-5, wins tiebreak 7-3 → `6-5(3)`
  - Example: golden point at 6-6, winner takes it → `6-5(6)`

### `super_tiebreak_noad`
Super tiebreak to 10 points, no-advantage. Golden point at 9-9.

Score notation: `[W-L]` where W is winner's points, L is loser's.
- Example: `[10-7]`, `[10-0]`, `[10-9]` (golden point)

## Finals rule
In finals, if the match reaches a tiebreak (or is a super tiebreak), a 2-point margin is required
(i.e., no golden point — keep playing until +2). Record the actual score.

## General fields
- `score` is always from the **winner's perspective** (winner's games/points first)
- `walkover`: set to `true` if the match was not played (retirement, no-show); score may be blank
- `round` values: `RR` (round-robin), `QF`, `SF`, `3P` (third-place playoff), `F` (final)
- `winner2_id` / `loser2_id`: blank for singles matches
