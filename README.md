# Vegetarian Recipe Explorer

Applicazione frontend SPA per cercare, consultare e salvare ricette vegetariane. Il progetto è sviluppato con React, Vite e Tailwind CSS e usa l'API Spoonacular per recuperare ricette e relativi dettagli.

## Funzionalità principali

- Ricerca di ricette vegetariane (10 risultati per ricerca)
- Dettagli della ricetta con ingredienti, istruzioni, tempo e porzioni
- Gestione dei preferiti lato client tramite `localStorage`
- Interfaccia responsive realizzata con Tailwind CSS
- Sanitizzazione delle descrizioni HTML con DOMPurify

## Prerequisiti e configurazione

- Node.js 22.20.0 o versione successiva (consigliato)
- npm
- Una [chiave API Spoonacular](https://spoonacular.com/food-api)

Crea `.env.local` dal template versionato:

```bash
cp .env.example .env.local
```

Apri `.env.local` e assegna la tua chiave:

```dotenv
VITE_SPOONACULAR_API_KEY=la_tua_chiave_spoonacular
```

I file locali `.env` sono esclusi da Git. Dopo aver modificato una variabile d'ambiente, riavvia Vite affinché venga riletta.

Le variabili con prefisso `VITE_` vengono incorporate nel bundle JavaScript e sono quindi visibili nel browser: non costituiscono un sistema sicuro per proteggere una credenziale. Una soluzione di produzione con credenziali realmente sensibili richiederebbe un backend o un proxy che effettui le chiamate all'API.

## Sviluppo locale

Installa le dipendenze definite nel lockfile e avvia il server di sviluppo:

```bash
npm ci
npm run dev
```

Vite mostra nel terminale l'URL locale dell'applicazione, normalmente:

```text
http://localhost:5173/
```

## Quality checks

Prima di proporre una modifica, esegui:

```bash
npm run lint
npm run build
```

Il primo comando verifica il codice con ESLint. Il secondo crea la build di produzione e genera l'artifact statico nella cartella `dist/`.

Per controllare localmente la build generata puoi usare `npm run preview`.

## CI/CD

Il workflow GitHub Actions [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) viene eseguito sulle pull request verso `main` e sui push a `main`.

Durante la build, `VITE_SPOONACULAR_API_KEY` viene fornita tramite il Repository Secret GitHub Actions omonimo, da configurare nelle impostazioni del repository. La chiave non è salvata nel workflow o nel codice sorgente.

Nelle pull request il workflow:

1. installa le dipendenze con `npm ci`;
2. esegue `npm run lint`;
3. esegue `npm run build`;
4. non effettua alcun deploy.

In seguito a un push su `main` il workflow:

1. installa le dipendenze con `npm ci`;
2. esegue lint e build;
3. carica la cartella `dist/` come artifact di GitHub Pages;
4. pubblica automaticamente l'applicazione su GitHub Pages.

## Ambienti e deploy

- **Development:** server Vite locale
- **Production:** GitHub Pages

Non è previsto un ambiente di staging separato: il progetto è una SPA statica semplice e la pipeline rimane proporzionata alla sua architettura.

Vite compila l'applicazione e produce file statici in `dist/`; GitHub Actions pubblica questi file su GitHub Pages. In produzione non viene eseguito alcun server Node.js.

L'applicazione è disponibile all'indirizzo:

https://marcosar1991.github.io/vegetarian-recipe-explorer/

In `vite.config.js` è configurato:

```js
base: "/vegetarian-recipe-explorer/"
```

Questo base path permette di caricare correttamente gli asset dal project site di GitHub Pages.

## Struttura principale

- `index.html`: template principale
- `src/main.jsx`: punto di ingresso React
- `src/App.jsx`: routing e layout principale
- `src/pages/`: pagine di ricerca, dettagli e preferiti
- `src/components/`: componenti riutilizzabili
- `src/services/api.jsx`: chiamate all'API Spoonacular
- `src/context/`: stato dei preferiti

Le ricerche applicano il filtro `diet=vegetarian`; le descrizioni delle ricette vengono sanitizzate con DOMPurify e i preferiti sono conservati in `localStorage`.

## Problemi comuni

- In caso di richieste fallite o risposte vuote, verifica che `VITE_SPOONACULAR_API_KEY` sia impostata e valida.
- L'account gratuito Spoonacular applica limiti alle richieste. Consulta la [pagina dei prezzi e dei limiti](https://spoonacular.com/food-api/pricing).

## Repository e licenza

Repository: https://github.com/MarcoSar1991/vegetarian-recipe-explorer

Il progetto è distribuito con licenza MIT. Consulta [`LICENSE.txt`](LICENSE.txt) per i dettagli.
