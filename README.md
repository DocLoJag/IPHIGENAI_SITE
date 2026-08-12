# IphigenAI — il sito

Sito statico di [iphigenai.com](https://iphigenai.com): presentazione di
IphigenAI, il tutor con intelligenza artificiale per studenti delle scuole
superiori. Costruito sul design system Iphigenai (Newsreader serif, Hanken
Grotesk sans, Spline Sans Mono; forest green + gold).

Il sito ha un solo scopo: spiegare il prodotto e invitare a **contattarci per
provarlo** (si prova su invito, niente registrazione libera). Non descrive
prezzi né servizi di consulenza. Dal 2026-08 sostituisce «Il diario», il
precedente blog editoriale (la sua storia resta nei commit).

## Struttura

- `index.html` — pagina unica: hero, come funziona, i tre tutor, come si
  prova, sicurezza e privacy, contatti, footer
- `assets/css/site.css` — token del design system + componenti; in coda le
  sezioni del sito di presentazione, sopra restano (come archivio) gli stili
  del diario (`.entry`, `.article-*`)
- `assets/js/site.js` — switcher lingua (ora forzato a IT), email composta a
  runtime (anti-scraper), validazione e invio del form contatti
- `assets/img/` — marchio Φ, wordmark, pattern, favicon (SVG)
- `CNAME` — dominio personalizzato per GitHub Pages

## Lingua

Per ora il sito è **solo in italiano**, ma è predisposto per la traduzione:

- i contenuti sono avvolti in nodi `data-lang="it"`;
- il CSS mostra/nasconde in base a `<html data-lang="…">`;
- `site.js` contiene già la logica di switch (ora forzata a `'it'`).

Per aggiungere l'inglese: duplicare i blocchi `data-lang="it"` come
`data-lang="en"`, ripristinare il markup del lang-switch (commentato
nell'header di `index.html`) e la riga con `saved` in `site.js`.

## Come si lavora

Nessun build step: si modifica l'HTML/CSS e si fa push. Per provare in locale:

```
python -m http.server 4173
```

poi aprire http://localhost:4173.

## Deploy

Il sito è servito da **GitHub Pages** (branch `main`, root) con dominio
`iphigenai.com` via `CNAME`. Ogni push su `main` va in produzione in 1–2 minuti.

## Form contatti

Il form invia tramite [Formspree](https://formspree.io) (ID in
`assets/js/site.js`, costante `FORMSPREE_ID`). Honeypot `_gotcha` contro lo
spam; in caso di errore di rete il form mostra un avviso con l'email di
fallback. Piano gratuito: 50 invii/mese.
