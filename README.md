# Iphigenai — il sito

Sito statico di [iphigenai.com](https://iphigenai.com): «Il diario», un blog editoriale
bilingue (IT/EN) sull'IA nell'educazione, costruito sul design system Iphigenai
(Newsreader serif, Hanken Grotesk sans, Spline Sans Mono; forest green + gold).

## Struttura

- `index.html` — indice del diario (testata, voci cronologiche, contatti, footer)
- `linee-guida-unesco.html` — primo articolo completo (linee guida UNESCO)
- `assets/css/site.css` — token del design system + componenti + layout
- `assets/js/site.js` — switcher lingua (ricordato in localStorage), email composta
  a runtime (anti-scraper), validazione del form contatti
- `assets/img/` — marchio Φ, wordmark, pattern, favicon (SVG)
- `CNAME` — dominio personalizzato per GitHub Pages

## Come si lavora

Nessun build step: si modifica l'HTML/CSS e si fa push. Per provare in locale:

```
python -m http.server 4173
```

poi aprire http://localhost:4173.

## Deploy

Il sito è servito da **GitHub Pages** (branch `main`, root) con dominio
`iphigenai.com` via `CNAME`. Ogni push su `main` va in produzione in 1–2 minuti.

## Da fare

- ~~Form contatti~~ **Fatto:** il form invia tramite [Formspree](https://formspree.io)
  (ID in `assets/js/site.js`, costante `FORMSPREE_ID`). Honeypot `_gotcha` contro
  lo spam; in caso di errore di rete il form mostra un avviso con l'email di
  fallback. Le richieste arrivano nella casella collegata all'account Formspree.
- **Articoli:** 5 voci dell'indice sono «In preparazione». Quando un articolo è
  pronto: duplicare `linee-guida-unesco.html`, sostituire i contenuti IT/EN, e
  trasformare la voce dell'indice in link (come la voce UNESCO).
