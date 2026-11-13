+++
title = "Adieu WordPress : comment j'ai reconstruit afisteb.be en un mois, avec une IA"
date = 2026-11-13T23:02:00+02:00
draft = false
+++

# Adieu WordPress : comment j'ai reconstruit afisteb.be en un mois, avec une IA

L'AFISTEB, l'Association Francophone des Infirmiers de Santé au Travail en Belgique, a un site web depuis 2014 : [afisteb.be](https://www.afisteb.be). Depuis le 21 octobre 2026, ce n'est plus le même site. Il a toujours la même apparence et les mêmes adresses, mais il fonctionne de manière complètement différente. Voici comment, en un peu plus d'un mois, un WordPress bloqué et piraté est devenu un site statique moderne, alors que je ne suis pas développeur web.

## Le point de départ : un site que plus personne ne pouvait faire évoluer

Le site tournait sous WordPress, le système de gestion de contenu le plus répandu au monde. Il était hébergé chez OVH et habillé d'Avada, un thème commercial très populaire. Sur le papier, rien d'inhabituel. En pratique, plusieurs problèmes se cumulaient :

- **Les développeurs d'origine n'étaient plus impliqués dans sa maintenance.** Personne ne connaissait vraiment l'intérieur du site, son historique, etc.
- **Le thème Avada était bloqué dans sa version.** Le fichier de licence avait été perdu, donc plus aucune mise à jour possible.
- **PHP était vieillissant.** Le site tournait sous PHP 7.4, une version qui ne reçoit plus de correctifs de sécurité. J'ai un peu essayé de mettre à jour PHP et WordPress, à l'aide de Docker sur mon Mac, mais sans succès. Je ne connais ni PHP ni WordPress (et sans aucune envie de vraiment m'y plonger), et le thème bloqué rendait chaque tentative risquée. 

Il fallait une autre solution que réparer, sans pour autant y passer trop de mon temps libre.

## Le choix : un site statique

Un site WordPress fabrique chaque page à la demande : à chaque visite, le serveur exécute du code PHP, interroge une base de données et assemble la page. C'est souple, mais cela fait beaucoup de pièces qui doivent rester à jour, et autant de portes d'entrée pour un pirate.

Un **site statique** fonctionne autrement. Les pages sont fabriquées une fois pour toutes, à l'avance, puis déposées sur le serveur comme de simples fichiers. Il n'y a pas de base de données ni de code exécuté à chaque visite, donc presque rien à pirater. C'est aussi plus rapide à télécharger et plus simple à héberger. Le bon vieux web 1.0 !

L'outil qui fabrique les pages s'appelle **Hugo**. C'est un logiciel libre, très rapide, distribué sous forme d'un seul programme. J'avais déjà un peu d'expérience avec Hugo, puisque c'est également lui qui est derrière le blog que vous êtes en train de lire.

Le site de l'Afisteb est un cas d'usage typique pour un générateur de site web : pas de commentaires autorisés sur les articles. Les seules interactions possibles sont le remplissage d'un formulaire de contact, et d'un autre pour devenir membre. Derrière se cache un simple envoi d'email.

Restait un détail : je ne connais rien au design web, et la moindre inspection de style dans un navigateur pour le répliquer aurait été un enfer pour moi. Changer le moteur du site tout en gardant la carrosserie presque identique m'aurait été impossible à faire seul.
J'ai donc travaillé avec **[Claude](https://claude.ai/)**, l'intelligence artificielle d'Anthropic, qui a écrit l'essentiel du code. Mon rôle a été de fournir la matière, de fixer les objectifs, de tester chaque étape et de décider.

## Étape 1 : réunir la matière première

Pour cloner un site, il faut deux choses : son contenu et son apparence.

**Le contenu**, WordPress sait l'exporter. Un fichier XML du 13 octobre 2026 contenait tout : 108 articles, 2 pages, 11 catégories et 14 mots-clés.

**L'apparence** était plus délicate, car dans un premier temps, je suis passé par l'interface web de Claude. L'IA ne pouvait pas consulter le site elle-même. Je lui ai donc fourni des captures d'écran des principales pages, sur ordinateur et sur téléphone, ainsi que la feuille de style du thème Avada et les images de fond. C'est à partir de ces éléments qu'elle a tenté de reconstruire le design. Par la suite, pour plus d'efficacité, je suis passé au terminal Claude, exécuté sur mon Mac. Plus efficace, et de cette manière il pouvait inspecter à loisir le site WordPress, pour le cloner.

## Étape 2 : le clone

Les 15 et 16 octobre, le site a pris forme.

Un script de conversion a transformé l'export WordPress en fichiers texte au format Markdown, un pour chaque article. Le contenu était encombré de codes propres au thème Avada, qui n'ont de sens que dans WordPress. Ils ont été retirés, et les boutons d'Avada sont devenus de simples liens.

Une règle a guidé tout le travail : **conserver toutes les adresses web**. Chaque article, catégorie ou page de liste garde exactement la même adresse qu'avant. Les liens venant d'autres sites et les moteurs de recherche ne voient aucune différence.

L'apparence d'Avada a été refaite à la main, sans le thème : la boîte blanche centrée sur l'image de fond, le menu, la barre de titre verte, la colonne latérale et le menu mobile. Même la typographie française a été reproduite : « guillemets », apostrophes courbes, tirets. Les polices sont désormais hébergées sur le site lui-même.

Plusieurs fonctions apportées par des extensions WordPress ont été remplacées par du code maison, plus léger :

- une **visionneuse de photos** sans aucune librairie externe : flèches, vignettes, diaporama, plein écran, glissement au doigt sur téléphone ;
- des **archives par mois** ;
- une **recherche dans tout le texte** du site. Hugo prépare un index à chaque construction, et la recherche se fait dans le navigateur, sans service externe ;
- des **images allégées automatiquement**. Hugo réduit les photos trop grandes au moment de construire le site. Par exemple, pour une des galeries, les 13 photos sont passées de 11 Mo à 0,8 Mo.

Claude Code a découvert que la page « Connexion santé » contenait un lien publicitaire vers un site sans rapport avec l'association, caché aux visiteurs par un petit script qui le plaçait hors de l'écran. C'est une technique classique de référencement frauduleux, et la preuve que **le site avait été piraté**.

## Étape 3 : améliorer au lieu de seulement copier

Dès le 16 octobre, le clone était fidèle. L'objectif a changé : ne plus seulement reproduire le site, mais l'améliorer quand c'est utile.

**Les galeries photos.** Avant, toutes les photos étaient mélangées dans une seule galerie, gérée par une extension WordPress. Elles ont été récupérées et réparties en **une galerie par événement** : 13 galeries, de 2000 à 2026.

**Les formulaires.** Les formulaires « Contact » et « Devenir membre » étaient gérés par une extension WordPress. Ils passent maintenant par un petit script PHP écrit pour l'occasion, avec plusieurs protections contre les robots et les abus :

- un **anti-robot ALTCHA** : au moment de l'envoi, le navigateur du visiteur résout un petit calcul invisible, en moins d'une seconde, sans cookie ni service tiers ;
- un « pot de miel », un champ invisible que seuls les robots remplissent ;
- des **limites d'envoi**, par visiteur et par jour.

**L'édition du site.** Un site statique n'a pas d'interface d'administration comme WordPress. Pour que les membres de l'association puissent publier des articles sans toucher au code, le site intègre **Decap CMS**, une interface d'édition accessible sur `/admin/`. On y écrit un article comme dans un traitement de texte. À l'enregistrement, Decap dépose la modification dans le dépôt GitHub du site, qui garde l'historique de toutes les versions.

**Des garde-fous.** Le site vérifie lui-même certaines erreurs au moment de sa construction : photo mal nommée dans une galerie, image manquante, deux articles à la même adresse. Dans ces cas, la construction échoue et rien n'est publié. Mieux vaut un site qui ne se met pas à jour qu'un site cassé.

## Étape 4 : couper le cordon avec WordPress

Au départ, le nouveau site affichait encore les PDF et les images stockés sur le serveur WordPress. Tant que c'était le cas, impossible de supprimer l'ancien site.

Le 18 octobre, un script a récupéré les **183 fichiers** réellement utilisés par le contenu (198 Mo). Il les a rangés par année, leur a donné des noms sans accents ni espaces, et a mis à jour tous les liens. Au passage, les 10 présentations des journées de formation qui étaient au format PowerPoint ont été converties en PDF, plus faciles à ouvrir : on est passés de 95 Mo à 46 Mo.

Autre détail corrigé : les journées de formation de 2005 à 2013 étaient toutes datées du 6 septembre 2014, le jour de la création du site WordPress. Elles ont retrouvé leur vraie date.

À partir de là, le site était **entièrement autonome** : tout son contenu se trouve dans son dépôt Git.

## Étape 5 : un premier site de test

Avant de toucher au site en ligne, il fallait tester dans des conditions réelles : de vrais formulaires, de vrais mails, une vraie connexion à l'outil d'édition. Les 19 et 20 octobre, le site a été installé sur un sous-domaine chez un autre hébergeur, pour ne prendre aucun risque avec le WordPress encore en service.

Tout y a été vérifié : pages, recherche, galeries, formulaires et connexion à Decap. Il y a eu quelques surprises, comme cet hébergeur qui envoyait le fichier de réglages de Decap comme du texte brut, que Decap ignorait. Une ligne de configuration a suffi.

## Étape 6 : la publication automatique

Le 20 octobre, la chaîne de publication a été mise en place. À chaque modification (un commit de ma part ou un enregistrement dans Decap), **GitHub Actions** construit le site et l'envoie chez OVH. Seuls les fichiers modifiés sont transférés.

Le nouveau site a été installé chez OVH **dans son propre dossier, à côté de celui utilisé par WordPress**, sans rien partager avec lui. Les deux sites cohabitaient sur le même hébergement, et un seul réglage décidait lequel était visible sur afisteb.be.

## Étape 7 : la bascule

Le 21 octobre 2026, la bascule a pris quelques secondes : dans l'espace client d'OVH, le domaine afisteb.be a été dirigé vers le dossier du nouveau site. Pour revenir en arrière, il suffisait de remettre l'ancien dossier.

Il n'a pas fallu revenir en arrière. Les anciennes adresses des fichiers (`/wp-content/uploads/…`, par exemple) redirigent vers les nouvelles, pour que les liens partagés ailleurs fonctionnent toujours : 517 adresses testées. Une sauvegarde complète du site WordPress a été faite sur un disque personnel, "just in case". Aucune chance qu'il ne soit un jour remis en ligne.

🤔 Tiens, au fait... PHP, 21 octobre 2026, ... 💡, mais oui, c'est bien sûr, [PHP2Shell](https://fr.wikipedia.org/wiki/PHP2Shell) ! Tu parles d'un hasard ! 😅

## Étape 8 : fiabiliser

Les semaines suivantes ont servi à rendre l'ensemble solide.

- **Des tests automatiques.** 53 cas de test pour les formulaires et 26 pour la connexion à l'outil d'édition, lancés avant chaque publication. Si un seul échoue, rien n'est publié.
- **PHP 8.5.** Le site est passé à la dernière version de PHP, le 23 octobre. Une seule ligne de code a dû être modifiée.
- **Des mails qui arrivent.** Les mails envoyés par les formulaires sont maintenant authentifiés (SPF, DKIM et DMARC, dans le jargon), ce qui leur évite d'atterrir dans les spams.
- **Un site de test définitif**, installé chez OVH à côté de la production. Les essais s'y font dans exactement les mêmes conditions. Non, je ne vous donnerai pas son URL. 😛
- **Une leçon apprise.** Le 11 novembre, lors d'une publication, toutes les miniatures des galeries ont disparu du site. La cause : le serveur de GitHub utilisait une autre version de Hugo que mon ordinateur, et les deux ne nomment pas les images réduites de la même façon. Depuis, la version est identique partout, et une vérification bloque la publication si une image manque.
- **Un outil d'édition plus pratique** : dans Decap CMS, un bouton pour joindre un document PDF à un article, et la possibilité d'ajouter plusieurs photos ou documents en une seule fois.

## Étape 9 : le grand nettoyage

Le 12 novembre 2026, après trois semaines sans problème, le WordPress et ses bases de données ont été **définitivement supprimés** du serveur. Les dossiers du serveur ont été réorganisés sans interruption du site, avec les fichiers secrets rangés hors de la partie accessible depuis le web.

## Le bilan

|                | Avant                                       | Après                                                              |
|---             |---                                          |---                                                                 |
| Technologie    | WordPress, thème Avada bloqué, extensions   | Hugo (pages statiques) et deux petits scripts PHP                  |
| Sécurité       | Site piraté, mises à jour impossibles       | Presque rien à attaquer, formulaires protégés, secrets hors du web |
| Édition        | Administration WordPress                    | Decap CMS, chaque modification est gardée dans l'historique        |
| Publication    | Directe sur le serveur                      | Automatique, après des tests                                       |
| Retour arrière | Restaurer une sauvegarde de base de données | Revenir à une version précédente dans Git                          |

Pour les visiteurs, presque rien n'a changé : même apparence, mêmes adresses, même contenu. Ils ont simplement gagné des galeries par événement, une recherche plus rapide et des pages plus légères.

## Ce que j'en retiens

**Avancer par petites étapes.** Chaque étape était testée, puis validée, avant de passer à la suivante, et il y avait toujours un moyen de revenir en arrière. L'ancien site est resté en service jusqu'à la bascule, puis encore actif mais inaccessible pendant trois semaines.

**L'IA comme développeur, moi comme chef d'orchestre.** Je n'aurais pas pu écrire ce code seul. Mais l'IA n'aurait rien pu faire sans quelqu'un pour lui fournir le contenu et les captures d'écran, tester sur un vrai serveur, lire les mails reçus et décider de ce qui comptait. Elle a aussi tenu à jour une documentation détaillée de chaque choix, ce qui rendra le site plus facile à reprendre que l'ancien.

**Simplifier, c'est sécuriser.** Moins de pièces, c'est moins de mises à jour à faire et moins de portes à surveiller. Le meilleur moyen de ne plus craindre les failles de WordPress, c'était de ne plus en avoir besoin. Comme j'aime à le répéter à mes collègues, "less code is less bug".

Le site est en ligne sur [afisteb.be](https://afisteb.be).

## Bonus : schéma de principe d'une publication

Que ce soit pour publier un nouvel article, en corriger un existant, créer une galerie ou une page, le principe est toujours le même. On passe par l'éditeur Decap CMS (mode _WYSIWYG_ ou _Markdown_), on commit et pousse sur GitHub, puis une GitHub Action se déclenche, reconstruit le site et en publie les pages nouvelles ou modifiées.

![Schéma du circuit de publication : l'éditeur écrit dans Decap CMS, Decap enregistre dans le dépôt GitHub, GitHub Actions teste et construit le site avec Hugo, puis l'envoie chez OVH, qui le sert aux visiteurs.](schema-publication.svg#zoom)
