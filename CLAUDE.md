# Blog « Et vice et versa »

Blog personnel de Dimitri, site statique généré avec Hugo et le thème Ananke.

## Commandes

- `hugo server` : prévisualisation sur http://localhost:1313/ (ajouter `-D` pour voir les brouillons)
- `hugo` : génère le site dans `public/` (ignoré par Git)
- Pour vérifier un rendu sans toucher à `public/` : `hugo --quiet -d "$(mktemp -d)"`, puis inspecter le HTML/CSS produit

Version de Hugo utilisée : v0.169 extended (Homebrew). Le dernier alignement thème/Hugo date de Hugo v0.165.0 / Ananke v2.19.1.

## Structure

- `content/fr/` : articles en français (langue par défaut, la seule réellement utilisée)
- `content/en/` : version anglaise, uniquement un brouillon de test pour l'instant
- `themes/gohugo-theme-ananke/` : sous-module Git pointant vers **le fork de Dimitri** (`DimitriHautot/gohugo-theme-ananke`). Ne pas modifier le thème : surcharger depuis le projet (voir ci-dessous).
- `static/images/cover.jpg` : image de fond de l'accueil et des en-têtes
- `hugo.toml` : configuration (langues, réseaux sociaux, paramètres Ananke)

## Articles

- Un article avec des images = un **page bundle** : `content/fr/<slug>/index.md` + ses images dans le même dossier. Un article sans image peut être un simple `content/fr/<slug>.md`.
- Front matter en TOML (`+++`), sur ce modèle :
  ```toml
  title = "…"
  date = 2026-11-13T23:02:00+02:00
  draft = false
  featured_image = '/<slug>/logo.png'   # ou '/images/cover.jpg'
  show_reading_time = true
  ```
- Images :
  - syntaxe Markdown : `![texte alternatif descriptif](image.png)` ;
  - ajouter `#zoom` à la destination (`![…](schema.svg#zoom)`) pour l'ouvrir en grand au clic (render hook `layouts/_markup/render-image.html`) ;
  - pour fixer une taille, utiliser le shortcode `{{< figure src="…" alt="…" width="300px" >}}` (fixer la largeur plutôt que la hauteur, pour garder le ratio).
- Les articles sont écrits en français, à la première personne, pour un public non technique : expliquer les termes techniques.

## Personnalisation du thème

Toujours surcharger, jamais éditer `themes/` :

- **CSS** : `assets/ananke/css/custom.css`, chargé via `[params.ananke] custom_css = ["custom.css"]` dans `hugo.toml`. Il contient déjà :
  - le style des tableaux (Ananke n'en a pas) ;
  - la largeur des articles (56rem au lieu de 48rem) ;
  - la fenêtre de zoom des images ;
  - le cadrage `bg-mountains` de l'image de fond de l'accueil ;
  - les titres en sans sérif (surcharge de `.athelas`).
- **Templates** : copier le fichier du thème dans `layouts/` au même chemin relatif (ex. `layouts/_default/rss.xml`, flux RSS avec le contenu complet).
- **Paramètres** : beaucoup de classes Ananke se règlent dans `[params]` (`post_content_classes`, `featured_image_class`, `background_color_class`, `body_classes`…). Regarder dans `themes/gohugo-theme-ananke/layouts/` quel paramètre est lu avant d'écrire du CSS.
- La police est Avenir (sans sérif) partout.

## Git

- Messages de commit courts, en français de préférence. Nouvel article : `New content: "<slug>"`. Modification d'un article : `<slug> - <description>`.
- Ne pas committer `.idea/`, `.mcp.json`, ni les modifications en cours sur d'autres articles : committer uniquement les fichiers concernés (`git commit -- <chemins>`).
- Ne pas pousser sans demande explicite.
