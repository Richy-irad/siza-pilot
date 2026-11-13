import type { Dictionary } from "./types";

export const fr: Dictionary = {
  lang: "fr",
  htmlLang: "fr-CA",
  home: "/",
  privacyHref: "/confidentialite",
  meta: {
    title: "Siza — On vous trouve de l'aide, vite | Montréal et Laval",
    description:
      "Panne d'auto, porte verrouillée, plus de chauffage? Un vrai humain trouve un fournisseur vérifié disponible et vous confirme le prix avant son arrivée. Aucuns frais Siza.",
    privacyTitle: "Politique de confidentialité | Siza",
  },
  langSwitch: { navLabel: "Langue", ariaLabel: "EN — English version" },
  header: { call: "Appeler", homeLabel: "Siza, accueil" },
  hero: {
    badge: "Projet pilote · {area} · {hours}",
    headline: "Coincé? On vous trouve de l'aide — vite.",
    sub: "Un vrai humain appelle des fournisseurs vérifiés pour vous et vous revient avec un nom, une heure d'arrivée et un prix — avant que quiconque se déplace.",
    cta: "Dites-nous ce qui se passe →",
    underCta: "Formulaire de 90 secondes · réponse en {responseWindow} pendant nos heures",
    save: "Enregistrer notre numéro — pour l'avoir le jour où ça arrive",
    trust: [
      "Fournisseurs locaux vérifiés",
      "Vous payez le fournisseur directement",
      "Aucuns frais Siza",
    ],
  },
  contact: {
    call: "Appeler",
    text: "Texto",
    whatsapp: "WhatsApp",
    smsPrefill: "Bonjour Siza, j'ai besoin d'aide pour : ",
  },
  safety:
    "Quelqu'un est en danger, odeur de gaz, ou accident avec blessés? **Composez le 911 d'abord.** Siza n'est pas un service d'urgence.",
  services: {
    heading: "Ce qu'on couvre en ce moment",
    available: "Disponible",
    soon: "Bientôt",
    getHelp: "Demander de l'aide",
    notify: "M'aviser",
    items: {
      roadside: {
        title: "Dépannage routier",
        desc: "Remorquage, survoltage, crevaison, clés barrées dans l'auto.",
      },
      heating: {
        title: "Chauffage / climatisation",
        desc: "Fournaise en panne, plus de chauffage, thermopompe.",
      },
      locksmith: {
        title: "Serrurerie",
        desc: "Porte de maison ou d'auto verrouillée, clés perdues.",
      },
      plumbing: { title: "Fuite de plomberie", desc: "Tuyau qui fuit ou qui a éclaté." },
      flooding: { title: "Sous-sol inondé", desc: "Eau au sous-sol, pompage." },
    },
    roadsideTowing: {
      title: "Remorquage",
      desc: "Voiture en panne ou accidentée, vers le garage de votre choix.",
    },
  },
  how: {
    heading: "Comment ça marche",
    steps: [
      {
        title: "Dites-nous ce qui se passe.",
        body: "Formulaire de 90 secondes, appel ou texto.",
      },
      {
        title: "On appelle pour vous.",
        body: "On joint des fournisseurs vérifiés près de vous et on vous revient avec un nom, une heure d'arrivée et un prix estimé — même si on n'a encore trouvé personne, pour que vous ne restiez jamais sans nouvelles.",
      },
      {
        title: "Vous décidez.",
        body: "Vous acceptez le prix, le fournisseur se déplace, vous le payez directement. On fait un suivi après.",
      },
    ],
  },
  why: {
    heading: "Pourquoi Siza",
    items: [
      {
        title: "On appelle pour vous.",
        body: "Fini d'appeler cinq numéros qui ne répondent pas.",
      },
      {
        title: "Prix confirmé d'avance.",
        body: "Vous connaissez le prix avant que quelqu'un se déplace. Si quelque chose change sur place, le fournisseur vous en parle d'abord.",
      },
      {
        title: "Fournisseurs vérifiés.",
        body: "Des entreprises locales dont on a vérifié la licence, les assurances et les avis.",
      },
      {
        title: "Quelqu'un en répond.",
        body: "On fait un suivi après chaque intervention. Si ça se passe mal, on s'en occupe.",
      },
    ],
  },
  insurance: {
    title: "Vous avez de l'assistance routière incluse?",
    body: "On vous le rappellera : votre assureur ou CAA-Québec est souvent votre option gratuite. Si vous préférez choisir votre garage ou éviter une réclamation, on s'occupe du reste.",
  },
  founder: {
    heading: "Pourquoi Siza existe",
    quote:
      "« Récemment, en route vers le garage, mon tuyau d'échappement s'est détaché. J'ai attendu une dépanneuse une heure et demie et payé 350 $, sans connaître le prix avant son arrivée. Siza, c'est ce que j'aurais voulu ce jour-là : quelqu'un qui appelle pour moi, trouve qui est disponible et me confirme le prix d'avance. »",
    name: "Richard, fondateur · Vaudreuil-Dorion",
  },
  faq: {
    heading: "Questions fréquentes",
    items: [
      {
        q: "Combien ça coûte?",
        a: "Siza ne vous facture rien pendant le projet pilote. Vous payez seulement le fournisseur, au prix confirmé avant son déplacement.",
      },
      {
        q: "C'est une application?",
        a: "Pas encore. Pour l'instant, une vraie personne coordonne chaque demande, du premier appel au suivi.",
      },
      {
        q: "Qui sont les fournisseurs?",
        a: "Des entreprises locales indépendantes (remorqueurs, serruriers, techniciens) que nous avons vérifiées. On vous donne leur nom pour que vous puissiez les chercher.",
      },
      {
        q: "Quelles zones couvrez-vous?",
        a: "{area} pour commencer. L'ouest de l'île et Vaudreuil-Soulanges arrivent bientôt.",
      },
      {
        q: "Quelles sont vos heures?",
        a: "{hours}. En dehors de ces heures, laissez un message ou remplissez le formulaire : on vous revient dès l'ouverture. En cas de danger, composez le 911.",
      },
      {
        q: "Comment je paie?",
        a: "Directement au fournisseur, selon ses modes de paiement (virement Interac, comptant ou carte). Siza ne touche jamais à votre argent.",
      },
      {
        q: "Et si personne n'est disponible?",
        a: "On vous le dit franchement, sans vous faire attendre pour un « peut-être », et on vous indique la meilleure option (assureur, CAA-Québec, propriétaire).",
      },
      {
        q: "Que faites-vous de mes renseignements?",
        a: "On les utilise seulement pour traiter votre demande et en faire le suivi. Voir notre [politique de confidentialité](/confidentialite).",
      },
    ],
  },
  final: {
    heading: "Le meilleur moment pour enregistrer notre numéro, c'est avant d'en avoir besoin.",
    save: "Enregistrer notre numéro",
    cta: "Dites-nous ce qui se passe",
  },
  provider: {
    lead: "Vous êtes remorqueur, serrurier ou technicien en chauffage dans la région?",
    strong: "Joignez notre banc de fournisseurs — aucuns frais pendant le pilote.",
    call: "Appeler",
    or: "ou",
    email: "écrire",
  },
  footer: {
    privacy: "Politique de confidentialité",
    copyright: "© 2026 Siza",
    disclaimer:
      "Siza est un service de mise en relation. Les travaux sont réalisés et facturés par des fournisseurs indépendants.",
  },
  sticky: { call: "Appeler", text: "Texto", form: "Formulaire" },
  privacy: {
    title: "Politique de confidentialité",
    back: "← Retour à l'accueil",
    items: [
      {
        label: "Responsable de la protection des renseignements personnels",
        body: "Richard Dushime Iradukunda, [{email}](mailto:{email}).",
      },
      {
        label: "Ce que nous recueillons",
        body: "Nom, numéro de téléphone, adresse ou lieu de l'intervention, description de la situation, comment vous avez entendu parler de nous.",
      },
      {
        label: "Pourquoi",
        body: "Traiter votre demande, la transmettre au fournisseur qui accepte l'intervention, faire un suivi, et améliorer le projet pilote.",
      },
      {
        label: "Avec qui nous les partageons",
        body: "Uniquement avec le fournisseur qui prend votre demande (nom, téléphone, adresse, description). Jamais vendus.",
      },
      {
        label: "Où ils sont conservés",
        body: "Les formulaires sont hébergés par Tally (Belgique). Les statistiques de visite sont anonymes et sans témoins (cookies).",
      },
      {
        label: "Combien de temps",
        body: "Au plus 12 mois après la fin du projet pilote, puis supprimés.",
      },
      {
        label: "Vos droits",
        body: "Accès, rectification, retrait du consentement ou suppression — écrivez à [{email}](mailto:{email}).",
      },
    ],
  },
};
