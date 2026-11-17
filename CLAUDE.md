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

## Mozilla Observatory

Objectif : garder la note la plus haute possible sur https://developer.mozilla.org/en-US/observatory. Les en-têtes de sécurité sont définis dans `static/.htaccess`, que Hugo copie à la racine de `public/`. L'Observatory note chaque sous-domaine séparément : ce fichier ne vaut que pour blob.hautot.be.

### Règles pour les templates et les articles

- **Aucun JavaScript inline** : pas de `<script>` sans `src`, pas d'attribut `on…`, pas d'URL `javascript:`, ni dans les templates, ni dans le Markdown (HTML brut). La CSP (`script-src 'self'`) le bloquerait.
- Un script va dans `assets/js/` et se charge avec empreinte et SRI, comme dans `layouts/_partials/site-scripts.html` :
  ```go-html-template
  {{- with resources.Get "js/xxx.js" | minify | fingerprint }}
  <script src="{{ .RelPermalink }}" integrity="{{ .Data.Integrity }}" defer></script>
  {{- end }}
  ```
- Si un template surchargé du thème contient un `<script>` inline (le thème en a : `site-scripts.html`, `commento.html`…), sortir le script dans `assets/js/` au moment de la surcharge.
- **Aucune ressource externe** : pas de CDN, Google Fonts, analytics, commentaires tiers (Commento, Disqus…), ni d'embed (shortcodes `youtube`, `vimeo`, `x`, `instagram`, `gist`, `<iframe>`). Mettre l'image dans le page bundle ; pour une vidéo, une capture avec un lien. Les liens `<a href>` vers d'autres sites ne sont pas concernés.
- Les styles inline sont tolérés (`style-src 'unsafe-inline'`, non pénalisé ; le thème en génère), mais le CSS va de préférence dans `custom.css`.

### Règles pour `static/.htaccess`

- Ne jamais affaiblir la CSP pour « faire marcher » quelque chose : pas de `'unsafe-inline'` ou `'unsafe-eval'` dans `script-src`, pas de `*`, `https:` ou `data:` dans `script-src`/`default-src`.
- Une source légitime nouvelle s'ajoute à la seule directive concernée (`img-src`, `frame-src`…), jamais à `default-src` ; une ressource externe inévitable se charge avec SRI.
- Conserver : HSTS `max-age` ≥ 6 mois avec `includeSubDomains`, `nosniff`, `frame-ancestors 'none'` + `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, et le blocage des fichiers cachés (sauf `/.well-known/`).

### Vérifier

- `hugo --quiet -d "$(mktemp -d)"`, puis chercher les balises `<script>` sans `src` dans le HTML produit : aucune attendue.
- Servir ce dossier avec la CSP de `static/.htaccess` et vérifier dans la console du navigateur qu'il n'y a aucune violation CSP (zoom d'image et bouton de copie des blocs de code compris).
- Après déploiement : `curl -sI https://blob.hautot.be/`, puis relancer l'Observatory.

## Git

- Messages de commit courts, en français de préférence. Nouvel article : `New content: "<slug>"`. Modification d'un article : `<slug> - <description>`.
- Ne pas committer `.idea/`, `.mcp.json`, ni les modifications en cours sur d'autres articles : committer uniquement les fichiers concernés (`git commit -- <chemins>`).
- Ne pas pousser sans demande explicite.
