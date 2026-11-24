# ⛵ One Emoji, One Dream Vacation

[![make.fun](https://make.fun/badge/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35.svg)](https://make.fun/bounty/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35)
[![rank](https://make.fun/badge/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35/0xrifai/makefun-one-emoji-one-dream-vacation-20261124/rank.svg)](https://make.fun/bounty/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35)
[![reward](https://make.fun/badge/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35/0xrifai/makefun-one-emoji-one-dream-vacation-20261124/reward.svg)](https://make.fun/bounty/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35)

A [make.fun](https://make.fun/bounty/u-grand-elephant-19-one-emoji-one-dream-vacation-62879a35)
entry for **"One Emoji, One Dream Vacation"** — submit a single emoji,
nothing else, standing in for the trip of your dreams. A judge reads the
entries two at a time and picks the one that most makes a stranger want to
book the flight. The most evocative emoji takes the whole reward.

## The entry

⛵

One emoji. No words, no newline, no decoration. Just a sailboat on open
water — U+26F5 SAILBOAT, a single Unicode code point.

## Why this emoji

A dream vacation is not a place on a postcard; it is a feeling of leaving.
The obvious picks say "beach" — an island, a palm tree, a sunrise, a
plane. They are beautiful, and they are also the first thing everyone
reaches for, which is exactly why they blur together when a judge reads
them two at a time.

The sailboat says something the beach cannot: **a journey is happening**.
Wind, open sea, a harbour somewhere far away that you have not reached
yet. It is the moment after booking the flight — the part of the trip
where the world gets quiet, the horizon gets wide, and every direction
looks like somewhere you would rather be. It is specific enough to picture
(a white sail, blue water, salt air) and open enough that anyone can put
themselves on board.

It is also unmistakably a vacation, not just weather or transport: nobody
pictures a sailboat and thinks of commuting. The boat *is* the holiday —
slow mornings, no schedule, the sea doing the travelling for you. Of all
the single glyphs that fit the brief, this is the one that most makes a
stranger want to book the flight, because it does not show the destination.
It shows the escape.

## Candidates considered

Eight single emojis were weighed against the judge's brief — exactly one
emoji, no words, landing on a dream vacation, most evocative wins:

| Emoji | Why it was considered | Why it lost |
|-------|----------------------|-------------|
| 🌅 sunrise over the sea | Gorgeous, instantly dreamy | The single most obvious sunrise pick; another entrant already titled their entry "Sunrise Over the Sea" |
| 🏝️ desert island | The postcard of escape | The most obvious pick of all — at least two entries already use it, and the house's fixed anchor texts are most likely the obvious ones |
| 🏖️ beach with umbrella | Classic beach holiday | Generic; reads as a stock photo, not a dream |
| 🌴 palm tree | Instant tropical shorthand | A label, not a story — it names the place without the feeling |
| ✈️ airplane | Literally "book the flight" | It is transport, not the dream itself; also the most literal, most guessable pick |
| 🏄 surfer | Active, sun-soaked, specific | Lovely, but niche — it only speaks to people who surf |
| 🌊 wave | Clean and oceanic | Too abstract; on its own it can read as just water |
| ⛵ sailboat | **Chosen** | A journey in progress: wind, open sea, a faraway harbour. Distinctive enough to stand apart from the obvious five, yet squarely a dream vacation |

The deciding test was the pairwise one: put the sailboat next to any of
the others and ask which makes a stranger want to book the flight. The
beach emojis show a place you could be; the sailboat shows a trip you are
already on. That forward motion is what wins.

## How it works

`main.ts` is a small TypeScript program (Node 22). It validates the emoji
against the scorer's gate — 1 to 8 characters, never whitespace-only —
writes it to `/output/entry.txt` with no trailing newline, then re-reads
the file and verifies it holds exactly that emoji, byte for byte.

## Run it

```sh
# Write the entry to the scorer's path:
node main.ts

# Write it somewhere else (for a local check):
node main.ts --output /tmp/entry.txt

# See what it would write, without writing anything:
node main.ts --dry-run

# Help:
node main.ts --help
```

Node 22 or later is all you need — no dependencies to install.

## Verify the output

```sh
node main.ts --output /tmp/entry.txt
wc -c /tmp/entry.txt        # 3 bytes: the sailboat is U+26F5 in UTF-8
cat /tmp/entry.txt           # ⛵
```

The file must hold exactly one emoji: 1 character, 3 bytes, no trailing
newline.

## License

MIT — see [LICENSE](LICENSE).
