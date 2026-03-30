# Draw Generation Rules

Rules for constructing the draw for a new edition. Currently defined for the **Exportacion** category only.

---

## Exportacion (8 players, single elimination)

### 1. Seeding

Seeds are assigned based on the previous edition's results:

| Seed | Assigned to |
|------|-------------|
| S1   | Winner (champion) |
| S2   | Finalist (lost in F) |
| S3   | SF loser who faced the champion |
| S4   | SF loser who faced the finalist |

S3 and S4 are always deterministic: because the bracket records which SF loser played which finalist, there is no ambiguity.

### 2. Relegation and promotion

One player is relegated from Exportacion to Nacional, and the Nacional winner is promoted to Exportacion as an unseeded player.

**Who gets relegated:** the player with the worst QF exit. Apply tiebreaks in order until one player is eliminated:

1. **Loss margin**: relegate the player with the largest QF loss margin (winner's games minus loser's games). E.g., losing 1–6 (margin 5) is worse than losing 3–6 (margin 3).
2. **Opponent's run**: if margins are equal, relegate the player whose QF opponent went less far. A finalist opponent outranks a semifinalist opponent (the player who lost to a semifinalist had it easier, so their loss is less excusable).
3. **Opponent's SF performance**: if both QF opponents reached the SF, relegate the player whose QF opponent lost more lopsidedly in their SF match (larger SF loss margin = weaker opponent = less excusable QF loss).
4. **Opponent's SF draw**: if SF loss margins are also equal, relegate the player whose QF opponent faced the finalist in the SF (rather than the champion).

### 3. Draw construction

The 8 players are:
- S1, S2, S3, S4 (seeded, from step 1)
- 4 unseeded players: the promoted Nacional winner + 3 returning unseeded players

**Bracket slots** (standard seeded placement):

```
QF1: S1 vs U?   ─┐
                  ├─ SF1 ─┐
QF2: S3 vs U?   ─┘        │
                           ├─ F
QF3: S4 vs U?   ─┐        │
                  ├─ SF2 ─┘
QF4: S2 vs U?   ─┘
```

S1 and S2 are placed in opposite halves. S3 and S4 are placed one per half (S3 in S1's half, S4 in S2's half). The 4 unseeded players are randomly drawn into the 4 unseeded QF slots, one per match.

The promoted player has no special placement — they are part of the random draw.

---

## Nacional (variable players, single elimination)

### 1. Seeding

| Seed | Assigned to |
|------|-------------|
| S1   | Relegated player from Exportacion |
| S2   | Finalist from last year's Nacional |
| S3   | SF loser who faced S1 (the Nacional champion) |
| S4   | SF loser who faced the finalist |

Same logic as Exportacion: S3 and S4 are determined by which SF loser faced which finalist, so they are always unambiguous.

### 2. Promotion

The Nacional winner is promoted to Exportacion as an unseeded player. There is no relegation out of Nacional.

### 3. Draw construction

The bracket is padded to the next power of 2. If the player count is not a power of 2, top seeds receive byes in descending order (S1 first, then S2, etc.) until all slots are filled.

**Example — 6 players (padded to 8):**

```
S1 (bye) ──────┐
               ├─ SF1 ─┐
S3 vs U?  ─────┘        │
                        ├─ F
S4 vs U?  ─────┐        │
               ├─ SF2 ─┘
S2 (bye) ──────┘
```

**Example — 8 players (no byes):** same structure as Exportacion.

The unseeded players are randomly drawn into the remaining slots, one per first-round match.

---

## Female Singles (variable players, single elimination)

### 1. Seeding

| Seed | Assigned to |
|------|-------------|
| S1   | Winner (champion) |
| S2   | Finalist |
| S3   | SF loser who faced the champion |
| S4   | SF loser who faced the finalist |

### 2. Draw construction

No promotion or relegation. The bracket is padded to the next power of 2 if needed, with top seeds receiving byes in descending order.

The unseeded players are randomly drawn into the remaining slots, one per first-round match.
