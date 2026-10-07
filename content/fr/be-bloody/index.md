+++
title = 'BeBloody - Donnez votre sang'
date = 2026-10-01T21:37:00+02:00
draft = false
+++

BeBloody (”Soyez saignant !”) est une mini application web qui calcule les prochaines dates de dons possibles de sang, plasma et plaquettes en fonction de vos derniers dons.
Le principe est simple: une fois un don effectué, vous l’ajoutez dans l’application, et elle vous indique les dates à partir desquelles les prochains seront possibles. Pratique pour prendre rendez-vous tant que vous êtes encore dans le centre de transfusion.

{{< figure src="screenshot-main.png" alt="Interface BeBloody" height="800px" >}}

## En pratique

L’application tient compte de votre sexe et du pays de résidence. En effet, ces deux critères peuvent entre en ligne de compte pour le calcul des dates. En Belgique par exemple, le sexe du donneur n’a pas d’influence sur le calcul, mais en France, oui.

Quelques caractéristiques:
* support de quatre langues (français, néerlandais, allemand, anglais)
* support de deux législations: Belgique et France
* support des modes clair, sombre ou système
* paramétrage des types de dons possibles
* liens web vers les sources officielles utilisées pour le calcul des dates

{{< figure src="screenshot-parameters.png" alt="Paramètres BeBloody" height="800px" >}}

## Installation

L’application est une PWA. Pour l’installer, visitez simplement sa [page d’accueil](https://bebloody.hautot.be) avec le navigateur web de votre téléphone. Ensuite, dans le menu de ce dernier, choisissez de partager la page sur l’écran d’accueil. C’est tout !

{{< figure src="QR-bebloody.hautot.be.png" alt="Code QR menant vers la page d'installation de BeBloody" width="150px" >}}

**La première ouverture vous affiche le panneau de configuration, indispensable pour indiquer votre sexe et votre pays de résidence.**
Ensuite, commencez simplement à encoder vos derniers dons, sur base de votre carte de donneur.

En Belgique 🇧🇪, sachez que les étiquettes collées sur la carte permettent de distinguer les types de dons:
- **sang**: chiffres noirs sur fond blanc
- **plasma**: chiffres blancs sur fond noir
- **plaquettes**: chiffres noirs sur fond orange

## Points importants

L’application a été développée par un donneur particulier pour se faciliter la tâche de prise de rendez-vous. Elle n’a été validée par aucune instance officielle. Elle s’applique dans un cadre “best effort”, sans garantie quelconque.

## Détails techniques

L’application vit dans un navigateur web, idéalement celui de votre téléphone portable. Elle y enregistre vos préférences et l’historique de vos dons.
* ✅ Aucune centralisation de vos données dans un serveur.
* ✅ De ce fait, aucun cookie enregistré ni partagé.
* ✅ Entièrement compatible avec le RGPD.

L’application vérifie de temps en temps si une nouvelle version n’est pas disponible, et le cas échéant vous propose de se mettre à jour. C’est le seul cas de “E.T. téléphone maison”.

L’application a été testée sous iOS, avec les navigateurs Safari et Firefox. De par la nature même des PWA, leur espace de stockage est cloisonné. Les données encodées dans la version navigateur classique seront inaccessibles de la version PWA de ce navigateur, et à fortiori entre les différents navigateurs d’un même téléphone.
Conséquence: en cas de changement de téléphone, il est possible que les données ne soient pas transférées, même en suivant une procédure de migration proposée par le nouveau téléphone. A tester.

Le code source est disponible sur GitHub: https://github.com/DimitriHautot/BeBloody/.

## Contributions

Si vous voulez enrichir l’application par l’ajout de règles pour un pays, veuillez consulter [cette note](https://github.com/DimitriHautot/BeBloodyClaude/#proposer-les-r%C3%A8gles-dun-nouveau-pays) pour connaître la marche à suivre.

## Langues

L’application a été développée en français, et les traductions en néerlandais, allemand et anglais ont été effectuées par Claude Code. Si vous constatez des erreurs de traduction, ou si vous voulez simplement en demander d’autres, n’hésitez pas à prendre contact avec l’auteur.

## Contact

Tout problème technique peut être reporté par la [création d’un ticket sur GitHub](https://github.com/DimitriHautot/BeBloody/issues/new), ou via un message sur [Bluesky](https://bsky.app/profile/dimitri.hautot.be) ou [Mastodon](https://mastodon.top/@demitrip).

## Historique

Je suis [informaticien](https://dimitri.hautot.be/), spécialisé dans le développement d’applications Java d’entreprise, avec très peu de connaissances en développement web. Avoir un side project tel que BeBloody était l’occasion d’élargir mon champ de compétences. J’ai donc commencé par une première version, se basant sur le framework Nuxt. Il y en a même eu une deuxième, un peu plus aboutie, mais toujours loin d’un MVP.

Mais la vie de famille et les différentes contraintes que l’on peut rencontrer dans une journée faisaient que je ne pouvais y consacrer que très peu de temps. Et les rares moments où je parvenais à m’y plonger quelques heures d’affilée étaient consacrés au déboggage et à des itérations très improductives. Bref, le besoin était là, mais les mois passaient et rien de concret n’en sortait.

Pendant ce temps, l’intelligence artificielle générative agentique faisait sa révolution, et bousculait le métier de développeur informatique. D’abord réticent à l’utiliser, j’ai ensuite revu ma position et l’ai considérée comme une assistante puissante, rapide, et infatigable. Et finalement, quoi de mieux qu’un side project pour expérimenter une nouvelle technologie ?

J’ai donc combiné une nécessité professionnelle de mise à niveau avec un projet personnel, et j’ai commencé à “vibe coder” par itérations, en posant le cadre, validant le code produit, remontant les erreurs rencontrées, tout en apprenant à manipuler Claude Code.

Le résultat est cette PWA, BeBloody, qui vous a été présentée dans cet article.

**J’espère que la consommation de ressources inhérente à l’utilisation de l’intelligence artificielle sera compensée par l’apport sociétal que peut constituer cette application, en facilitant le don de sang, plasma, plaquettes, et qui sait, à sauver des vies humaines.**

Merci pour votre lecture.

&nbsp;

&nbsp;

&nbsp;

{{< figure src="apple-touch-icon.png" alt="Logo BeBloody" height="80px" >}}
