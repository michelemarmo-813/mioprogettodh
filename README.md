# Il mio sito

Sito statico in HTML/CSS/JS con tre pagine:

- `index.html` — home
- `video.html` — pagina video (placeholder, vedi istruzioni nel file)
- `grafici.html` — pagina grafici Flourish (placeholder, vedi istruzioni nel file)

## Come pubblicarlo su GitHub Pages

Apri il Terminale, spostati in questa cartella e collega il repo GitHub che hai già creato.

Se questa cartella **non è ancora un repo git**:

```bash
cd "percorso/di/questa/cartella"
git init
git add .
git commit -m "Primo commit: struttura sito"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/NOME-REPO.git
git push -u origin main
```

Se il repo è **già collegato** (hai clonato tu stesso il repo in questa cartella):

```bash
cd "percorso/di/questa/cartella"
git add .
git commit -m "Primo commit: struttura sito"
git push
```

## Attivare GitHub Pages

1. Vai sulla pagina del repo su github.com
2. Settings > Pages (menu a sinistra)
3. In "Build and deployment" > "Source" scegli **Deploy from a branch**
4. Branch: **main**, cartella: **/ (root)** > Save
5. Dopo 1-2 minuti il sito sarà online su:
   `https://TUO-USERNAME.github.io/NOME-REPO/`

## Prossimi passi

- Registra il video e seguine le istruzioni in `video.html` per inserirlo
- Crea i grafici su flourish.studio e incolla gli embed in `grafici.html`
- Ogni volta che modifichi i file, ripeti `git add . && git commit -m "..." && git push`
  per aggiornare il sito online (GitHub Pages si aggiorna da solo in 1-2 minuti)
