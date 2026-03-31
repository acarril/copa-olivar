# Olivar Open — Repositorio de datos

Datos históricos de partidos del Abierto Olivar, un torneo de tenis familiar que se celebra anualmente. La primera edición fue en 2014; la edición 10 (2026) es la más reciente. Las ediciones 2020 y 2021 no se realizaron por la pandemia.

## Estructura del torneo

Cada edición tiene varias categorías (ej. masculino singles, femenino singles, dobles mixto). Las categorías y sus formatos varían entre ediciones. Todos los cuadros son eliminación directa (knockout). No hay fases de grupos.

El grupo de jugadores es una familia extensa de siete ramas: Correa, Ruiz Tagle (de Eugenia), Ruiz Tagle (de Carola), Ovalle, Lihn, Andueza-Melero y Ross.

## Archivos de datos

```
data/
├── players.csv         # Todos los jugadores en todas las ediciones
├── families.csv        # Las siete ramas familiares
├── editions.csv        # Una fila por edición anual
├── categories.csv      # Definiciones de categorías (Femenino, Exportación, etc.)
├── tournaments.csv     # Una fila por categoría × edición (el cuadro real)
├── entries.csv         # Qué jugadores participaron en qué categoría (incluye cabezas de serie)
├── matches.csv         # Todos los resultados de partidos
└── relationships.csv   # Relaciones familiares conocidas entre jugadores
```

### categories.csv
Una categoría es la definición atemporal de un tipo de cuadro (ej. "Femenino", "Masculino Nacional"). Existe independientemente de cualquier edición — se usa al hablar de reglas, historial o requisitos de participación a través de los años.

| Columna | Descripción |
|---|---|
| `category_id` | ID único (ej. `ct1`) |
| `name` | Nombre en formato máquina (ej. `womens_singles`) |
| `label` | Nombre legible en español |
| `default_format` | Formato de puntuación por defecto — ver más abajo |
| `slug` | Nombre corto amigable para URLs (ej. `femenino`) |

### tournaments.csv
Un torneo es un cuadro específico: una categoría en una edición determinada (ej. "el Femenino 2026"). La clave foránea `category_id` se usa en `entries.csv` y `matches.csv`.

| Columna | Descripción |
|---|---|
| `tournament_id` | ID único (ej. `1`) |
| `edition_id` | A qué edición pertenece |
| `category_id` | A qué categoría pertenece |
| `format` | Formato de puntuación específico; si está vacío, hereda `default_format` de la categoría |
| `notes` | Cualquier observación relevante |

### players.csv
| Columna | Descripción |
|---|---|
| `player_id` | ID único (ej. `p1`) |
| `name` | Nombre completo |
| `nickname` | Nombre común o apodo (ej. `Ness`, `Chuma`) |
| `gender` | `M` o `F` |
| `birth_year` | Opcional |
| `photo_url` | Enlace opcional a una foto |
| `family_id` | Referencia a `families.csv` |

### editions.csv
Una fila por cada año en que se realizó el torneo.

### entries.csv
Una fila por jugador por categoría por edición. Registra la participación y las cabezas de serie.

### matches.csv
| Columna | Descripción |
|---|---|
| `match_id` | ID único (ej. `m1`) |
| `edition_id` / `tournament_id` | Claves foráneas |
| `round` | `R16`, `QF`, `SF`, `3P`, `F` |
| `winner1_id` | Ganador (singles) o primer jugador del par ganador (dobles) |
| `winner2_id` | Segundo jugador del par ganador; vacío en singles |
| `loser1_id` / `loser2_id` | Mismo esquema para el lado perdedor |
| `score` | Ver notación de puntuación más abajo |
| `referee_id` | ID del jugador que arbitró, si se registró |
| `walkover` | `true` si el partido no se jugó |
| `notes` | Cualquier observación relevante |

### relationships.csv
Vínculos familiares conocidos. `parent_child` significa que player1 es padre/madre de player2. `siblings` es una relación no dirigida.

## Notación de puntuación

Los resultados siempre se escriben desde la **perspectiva del ganador** (el marcador del ganador primero).

### `single_set_noad`
Un set, sin ventaja. Tiebreak al 5-5 (se juega a 7, sin ventaja; punto de oro al 6-6).

- Normal: `6-4`
- Tiebreak: `6-5(N)` donde N son los puntos del perdedor en el tiebreak — ej. `6-5(4)` significa que el tiebreak quedó 7-4.

### `super_tiebreak_noad`
Super tiebreak a 10 puntos, sin ventaja. Punto de oro al 9-9.

- Se escribe como `[W-L]` — ej. `[10-7]`.

### Excepción en finales
Los tiebreaks de finales requieren diferencia de 2 puntos (sin punto de oro). Se registra el marcador real.

## Cómo agregar datos

Para agregar resultados de una nueva edición:
1. Agregar una fila a `editions.csv`.
2. Agregar filas a `tournaments.csv` para las categorías y formatos de esa edición.
3. Agregar los jugadores nuevos a `players.csv` (nombre formal en `name`, nombre común en `nickname`).
4. Agregar las entradas a `entries.csv`, incluyendo cabezas de serie cuando corresponda.
5. Agregar los partidos a `matches.csv`, una fila por partido, usando la notación de puntuación indicada arriba.
