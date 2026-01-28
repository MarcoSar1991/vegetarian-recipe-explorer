# Veggie Recipes (React + Vite)

Un'applicazione demo per cercare e salvare ricette vegetariane basata su React + Vite.

L'app usa l'API di Spoonacular per recuperare ricette e i dettagli delle ricette. È studiata come progetto front-end minimale con ricerca, schede dettaglio e gestione dei preferiti lato client (localStorage).

## Caratteristiche principali

- Ricerca di ricette vegetariane (10 risultati per ricerca)
- Visualizzazione dei dettagli della ricetta (ingredienti, istruzioni, tempo e porzioni)
- Salvataggio delle ricette preferite in locale (localStorage)
- Interfaccia responsive costruita con Tailwind CSS
- Contenuti HTML puliti con DOMPurify per evitare XSS nelle descrizioni

## Prerequisiti

- Node.js (consigliato >= 22.20.0)
- npm (o yarn/pnpm a scelta)
- Una chiave API di Spoonacular (gratuita con limiti): https://spoonacular.com/food-api

## Configurazione (variabili d'ambiente)

Copia il file di esempio (o crea un nuovo `.env`) nella root del progetto e aggiungi la tua chiave API:

```bash
# file: .env
VITE_SPOONACULAR_API_KEY=la_tua_chiave_spoonacular
```

Note: Vite espone le variabili che iniziano con `VITE_` al codice client, quindi la chiave deve avere il prefisso `VITE_`.

## Installazione e comandi utili

Nella cartella del progetto esegui:

```bash
npm install
```

Per avviare il server di sviluppo (HMR):

```bash
npm run dev
```

Per creare la build di produzione:

```bash
npm run build
```

Per avviare una preview della build prod:

```bash
npm run preview
```

Per eseguire ESLint sul progetto:

```bash
npm run lint
```

Percorso e file principali

- `index.html` - template principale
- `src/main.jsx` - punto d'ingresso React
- `src/App.jsx` - routing e layout principale
- `src/pages/Home.jsx` - pagina principale con ricerca
- `src/pages/RecipeDetails.jsx` - pagina dettagli ricetta
- `src/pages/Favorites.jsx` - pagina dei preferiti
- `src/components/` - componenti riusabili (SearchBar, RecipeCard, RecipeGrid)
- `src/services/api.jsx` - wrapper per chiamate a Spoonacular (usa `import.meta.env.VITE_SPOONACULAR_API_KEY`)
- `src/context/` - gestione dello stato dei preferiti (context + provider)
- `tailwind` - configurazione Tailwind integrata tramite dipendenze

Dipendenze principali

- react, react-dom — UI
- vite — dev server e build
- react-router-dom — routing
- axios — chiamate HTTP
- dompurify — sanitizzazione HTML
- tailwindcss — utility-first CSS

Dettagli implementativi rilevanti

- Le ricerche impostano `diet=vegetarian` di default nella chiamata a Spoonacular (`src/services/api.jsx`).
- La pagina dei dettagli usa `DOMPurify` per sanitizzare `recipe.summary` prima di renderizzare HTML.
- I preferiti sono salvati in `localStorage` dall'`FavoritesProvider`.

Problemi comuni e troubleshooting

- Errore di richiesta o risposta vuota: controlla che `VITE_SPOONACULAR_API_KEY` sia impostata e valida.
- Limiti di quota Spoonacular: l'API ha limiti nelle richieste; se superi la quota vedrai errori dalla API.

Suggerimenti per lo sviluppo

- Aggiungi un file `.env.local` (o usa il tuo metodo preferito) per non committare la chiave API.
- Per test più robusti, considera di mockare le chiamate HTTP durante i test unitari.
- Se vuoi rimuovere la limitazione al filtro `vegetarian`, modifica il parametro `diet` in `src/services/api.jsx`.

Contribuire

Se vuoi migliorie, apri una issue o invia una pull request. Alcuni possibili miglioramenti:

- Migliorare la gestione degli errori e i messaggi all'utente
- Aggiungere test unitari e di integrazione

Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file `LICENSE.txt` nella root del repository per i dettagli.

Contatti

Questo progetto è un esempio didattico; per domande o richieste particolari apri una issue nel repository.
