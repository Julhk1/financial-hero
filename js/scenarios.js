const scenarios = {
    boulangerie: {
        1: {
            title: "Financement Initial & Apport",
            description: "Dépôt du capital de 20 000 € et déblocage de l'emprunt de 30 000 € en banque.",
            accounts: { "512": "512 - Banque", "101": "101 - Capital Social", "164": "164 - Emprunts" },
            expectedEntries: { "512": { debit: 50000 }, "101": { credit: 20000 }, "164": { credit: 30000 } }
        },
        2: {
            title: "Acquisition du Matériel",
            description: "Achat au comptant du fournil professionnel pour 15 000 € HT.",
            accounts: { "215": "215 - Matériel Industriel", "512": "512 - Banque" },
            expectedEntries: { "215": { debit: 15000 }, "512": { credit: 15000 } }
        },
        3: {
            title: "Chiffre d'Affaires Global",
            description: "Ventes cumulées de pains de l'année : 40 000 € HT (+ 2 200 € de TVA collectée à 5,5%). Encaissé en banque.",
            accounts: { "512": "512 - Banque", "701": "701 - Ventes", "44571": "44571 - TVA Collectée" },
            expectedEntries: { "512": { debit: 42200 }, "701": { credit: 40000 }, "44571": { credit: 2200 } }
        },
        4: {
            title: "Achats Facturés de Farine",
            description: "Achat de sacs de farine pour 10 000 € HT (+ 550 € de TVA déductible). En attente sur le compte fournisseur.",
            accounts: { "601": "601 - Achats Consommations", "44566": "44566 - TVA Déductible", "401": "401 - Fournisseurs" },
            expectedEntries: { "601": { debit: 10000 }, "44566": { debit: 550 }, "401": { credit: 10550 } }
        },
        5: {
            title: "Règlement des dettes fournisseurs",
            description: "Paiement par virement bancaire du solde dû au meunier pour un montant de 10 550 €.",
            accounts: { "401": "401 - Fournisseurs", "512": "512 - Banque" },
            expectedEntries: { "401": { debit: 10550 }, "512": { credit: 10550 } }
        },
        6: {
            title: "Enregistrement des Salaires",
            description: "Comptabilisation du salaire brut de l'apprenti boulanger pour 2 000 €. Constatez la dette nette sur le compte personnel (1 600 €).",
            accounts: { "641": "641 - Salaires", "411": "411 - Tiers Personnel" },
            expectedEntries: { "641": { debit: 2000 }, "411": { credit: 1600 } }
        },
        7: {
            title: "Charges Sociales Patronales",
            description: "Enregistrement de la part patronale URSSAF s'élevant à 400 €.",
            accounts: { "645": "645 - Charges Sociales", "431": "431 - URSSAF" },
            expectedEntries: { "645": { debit: 400 }, "431": { credit: 400 } }
        },
        8: {
            title: "Paiement net du salaire",
            description: "Virement de la rémunération nette à l'apprenti sur son compte pour 1 600 €.",
            accounts: { "411": "411 - Tiers Personnel", "512": "512 - Banque" },
            expectedEntries: { "411": { debit: 1600 }, "512": { credit: 1600 } }
        },
        9: {
            title: "Inventaire : Cession d'immobilisation",
            description: "Vente d'un ancien pétrin d'occasion pour 1 000 € facturé à un confrère à crédit.",
            accounts: { "411": "411 - Tiers Clients", "775": "775 - Produits des Cessions" },
            expectedEntries: { "411": { debit: 1000 }, "775": { credit: 1000 } }
        },
        10: {
            title: "Inventaire : Sortie de l'actif cédé",
            description: "Sortie de la valeur d'origine du pétrin (1 000 €) du patrimoine de l'entreprise.",
            accounts: { "675": "675 - VNC des Actifs", "215": "215 - Matériel Industriel" },
            expectedEntries: { "675": { debit: 1000 }, "215": { credit: 1000 } }
        },
        11: {
            title: "Inventaire : Clôture annuelle de TVA",
            description: "Soldez la TVA Collectée (2 200 €) et la TVA Déductible (550 €). Constatez l'obligation de paiement nette (44551).",
            accounts: { "44571": "44571 - TVA Collectée", "44566": "44566 - TVA Déductible", "44551": "44551 - TVA à payer" },
            expectedEntries: { "44571": { debit: 2200 }, "44566": { credit: 550 }, "44551": { credit: 1650 } }
        },
        12: {
            title: "Inventaire : Amortissement du matériel",
            description: "Calcul de la dépréciation linéaire annuelle du four de production (durée 5 ans) : 3 000 €.",
            accounts: { "6811": "6811 - Dotation Amortissements", "2815": "2815 - Amortissement Matériel" },
            expectedEntries: { "6811": { debit: 3000 }, "2815": { credit: 3000 } }
        },
        13: {
            title: "Inventaire : Stock final de Farine",
            description: "Le comptage physique valorise le stock restant à 2 000 €. Constatez l'augmentation de l'actif.",
            accounts: { "311": "311 - Stocks Matières", "6031": "6031 - Variation Stocks" },
            expectedEntries: { "311": { debit: 2000 }, "6031": { credit: 2000 } }
        },
        14: {
            title: "Fiscalité : Calcul de l'IS",
            description: "L'Impôt sur les Sociétés calculé sur le bénéfice d'exercice s'élève à 2 500 €.",
            accounts: { "695": "695 - Impôts", "401": "401 - Fournisseurs (Trésor Public)" },
            expectedEntries: { "695": { debit: 2500 }, "401": { credit: 2500 } }
        },
        15: {
            title: "Clôture définitive du grand livre",
            description: "L'exercice comptable de la boulangerie est parfait. Enregistrez une ligne neutre à 0 € sur le compte 101 pour verrouiller la balance.",
            accounts: { "101": "101 - Capital Social" },
            expectedEntries: { "101": { debit: 0 } }
        }
    },
    saas: {
        1: {
            title: "Levée de fonds Seed",
            description: "Des investisseurs injectent 100 000 € de fonds propres sur le compte en banque de la startup SaaS.",
            accounts: { "512": "512 - Banque", "101": "101 - Capital Social" },
            expectedEntries: { "512": { debit: 100000 }, "101": { credit: 100000 } }
        },
        2: {
            title: "Activation des frais de R&D",
            description: "Les salaires de l'équipe technique de développement de l'application sont capitalisés à l'actif pour 25 000 €.",
            accounts: { "203": "203 - Frais de Recherche", "721": "721 - Production Immobilisée" },
            expectedEntries: { "203": { debit: 25000 }, "721": { credit: 25000 } }
        },
        3: {
            title: "Facturation d'Abonnements Annuels",
            description: "Campagne de vente : 60 000 € HT encaissés d'avance (+ 12 000 € de TVA collectée à 20%).",
            accounts: { "512": "512 - Banque", "701": "701 - Ventes", "44571": "44571 - TVA Collectée" },
            expectedEntries: { "512": { debit: 72000 }, "701": { credit: 60000 }, "44571": { credit: 12000 } }
        },
        4: {
            title: "Hébergement Cloud International",
            description: "Facture de serveurs cloud AWS reçue pour 5 000 € HT à payer au fournisseur.",
            accounts: { "601": "601 - Achats Consommations", "401": "401 - Fournisseurs" },
            expectedEntries: { "601": { debit: 5000 }, "401": { credit: 5000 } }
        },
        5: {
            title: "Contrat à l'exportation en Dollars",
            description: "Vente de licences à une entreprise américaine pour une valeur brute de 10 000 € HT laissée à crédit.",
            accounts: { "411": "411 - Tiers Clients", "701": "701 - Ventes" },
            expectedEntries: { "411": { debit: 10000 }, "701": { credit: 10000 } }
        },
        6: {
            title: "Fluctuation monétaire (Perte de change)",
            description: "Le client règle par virement mais le cours des devises a changé. La banque ne crédite que 9 600 €. Enregistrez la perte de change (400 €).",
            accounts: { "512": "512 - Banque", "666": "666 - Pertes de Change", "411": "411 - Tiers Clients" },
            expectedEntries: { "512": { debit: 9600 }, "666": { debit: 400 }, "411": { credit: 10000 } }
        },
        7: {
            title: "Salaires des ingénieurs",
            description: "Enregistrement de la rémunération brute de l'équipe de maintenance pour 12 000 €.",
            accounts: { "641": "641 - Salaires", "411": "411 - Tiers Personnel" },
            expectedEntries: { "641": { debit: 12000 }, "411": { credit: 12000 } }
        },
        8: {
            title: "Cotisations Sociales Tech",
            description: "Enregistrement des charges patronales du pôle technique dues à l'URSSAF : 3 000 €.",
            accounts: { "645": "645 - Charges Sociales", "431": "431 - URSSAF" },
            expectedEntries: { "645": { debit: 3000 }, "431": { credit: 3000 } }
        },
        9: {
            title: "Cut-off : Produits constatés d'avance (PCA)",
            description: "Les abonnements annuels signés au milieu d'année (60 000 €) courent sur l'exercice suivant. Retirez 30 000 € du résultat courant.",
            accounts: { "701": "701 - Ventes", "487": "487 - Produits Constatés d'Avance" },
            expectedEntries: { "701": { debit: 30000 }, "487": { credit: 30000 } }
        },
        10: {
            title: "Inventaire : Client douteux",
            description: "Un client majeur nous doit 5 000 € mais subit un dépôt de bilan. Basculez sa créance en alerte 416.",
            accounts: { "416": "416 - Clients Douteux", "411": "411 - Tiers Clients" },
            expectedEntries: { "416": { debit: 5000 }, "411": { credit: 5000 } }
        },
        11: {
            title: "Inventaire : Dépréciation de créance",
            description: "Le risque de non-recouvrement est estimé à 100%. Constatez la dépréciation prudente de 5 000 €.",
            accounts: { "656": "656 - Pertes sur Créances Probables", "416": "416 - Clients Douteux" },
            expectedEntries: { "656": { debit: 5000 }, "416": { credit: 5000 } }
        },
        12: {
            title: "Inventaire : Amortissement R&D",
            description: "Les frais logiciels activés (25 000 €) s'amortissent sur 5 ans. Constatez la dotation de 5 000 €.",
            accounts: { "6811": "6811 - Dotation Amortissements", "2815": "2815 - Amortissement Matériel" },
            expectedEntries: { "6811": { debit: 5000 }, "2815": { credit: 5000 } }
        },
        13: {
            title: "Inventaire : Déclaration de TVA",
            description: "Solder la ligne de TVA collectée (12 000 €) pour enregistrer la dette finale envers l'État.",
            accounts: { "44571": "44571 - TVA Collectée", "44551": "44551 - TVA à payer" },
            expectedEntries: { "44571": { debit: 12000 }, "44551": { credit: 12000 } }
        },
        14: {
            title: "Fiscalité : Déficit fiscal",
            description: "En raison des lourdes charges de croissance, le résultat fiscal est négatif. L'impôt sur les sociétés est de 0 €.",
            accounts: { "695": "695 - Impôts" },
            expectedEntries: { "695": { debit: 0 } }
        },
        15: {
            title: "Clôture de la startup SaaS",
            description: "Le grand livre analytique est validé. Passez une écriture technique à 0 € sur le capital social (101) pour finir.",
            accounts: { "101": "101 - Capital Social" },
            expectedEntries: { "101": { debit: 0 } }
        }
    },
    industrie: {
        1: {
            title: "Financement des infrastructures",
            description: "Déblocage d'un emprunt bancaire lourd de 500 000 € pour l'aménagement de l'usine manufacturière.",
            accounts: { "512": "512 - Banque", "164": "164 - Emprunts" },
            expectedEntries: { "512": { debit: 500000 }, "164": { credit: 500000 } }
        },
        2: {
            title: "Installation des lignes robotiques",
            description: "Achat d'équipements automatisés lourds de montage pour 300 000 € réglés par virement.",
            accounts: { "215": "215 - Matériel Industriel", "512": "512 - Banque" },
            expectedEntries: { "215": { debit: 300000 }, "512": { credit: 300000 } }
        },
        3: {
            title: "Approvisionnement en Métaux",
            description: "Achat de matières premières de production (acier/tôles) pour 80 000 € à crédit.",
            accounts: { "601": "601 - Achats Consommations", "401": "401 - Fournisseurs" },
            expectedEntries: { "601": { debit: 80000 }, "401": { credit: 80000 } }
        },
        4: {
            title: "Expédition des premières machines",
            description: "Vente de turbines finies à un donneur d'ordre pour 200 000 € HT configurés à crédit.",
            accounts: { "411": "411 - Tiers Clients", "701": "701 - Ventes" },
            expectedEntries: { "411": { debit: 200000 }, "701": { credit: 200000 } }
        },
        5: {
            title: "Encaissement des livraisons",
            description: "Encaissement bancaire partiel des règlements des acheteurs pour 150 000 €.",
            accounts: { "512": "512 - Banque", "411": "411 - Tiers Clients" },
            expectedEntries: { "512": { debit: 150000 }, "411": { credit: 150000 } }
        },
        6: {
            title: "Masse Salariale Ouvrière",
            description: "Comptabilisation des salaires de l'équipe de production pour un total brut de 40 000 €.",
            accounts: { "641": "641 - Salaires", "411": "411 - Tiers Personnel" },
            expectedEntries: { "641": { debit: 40000 }, "411": { credit: 40000 } }
        },
        7: {
            title: "Charges Sociales Patronales",
            description: "Enregistrement des cotisations de retraite et prévoyance d'usine dues à l'URSSAF : 10 000 €.",
            accounts: { "645": "645 - Charges Sociales", "431": "431 - URSSAF" },
            expectedEntries: { "645": { debit: 10000 }, "431": { credit: 10000 } }
        },
        8: {
            title: "Règlement des charges sociales",
            description: "Paiement bancaire du solde URSSAF du trimestre pour un montant de 10 000 €.",
            accounts: { "431": "431 - URSSAF", "512": "512 - Banque" },
            expectedEntries: { "431": { debit: 10000 }, "512": { credit: 10000 } }
        },
        9: {
            title: "Inventaire : Stock d'acier restant",
            description: "L'inventaire de fin d'année valorise les métaux bruts non consommés à 30 000 €. Constatez l'actif.",
            accounts: { "311": "311 - Stocks Matières", "6031": "6031 - Variation Stocks" },
            expectedEntries: { "311": { debit: 30000 }, "6031": { credit: 30000 } }
        },
        10: {
            title: "Inventaire : Stock de Machines Finies",
            description: "Des turbines assemblées mais non vendues dorment dans les entrepôts pour une valeur de 50 000 €. Enregistrez la variation (713).",
            accounts: { "355": "355 - Stocks Prod Finis", "713": "713 - Variation Stocks Prod" },
            expectedEntries: { "355": { debit: 50000 }, "713": { credit: 50000 } }
        },
        11: {
            title: "Inventaire : Amortissement des robots",
            description: "La chaîne automatisée (300 000 €) s'amortit de façon linéaire sur 10 ans. Constatez la dépréciation de 30 000 €.",
            accounts: { "6811": "6811 - Dotation Amortissements", "2815": "2815 - Amortissement Matériel" },
            expectedEntries: { "6811": { debit: 30000 }, "2815": { credit: 30000 } }
        },
        12: {
            title: "Consolidation : Retraitement réciproque (Ventes)",
            description: "La maison mère a vendu pour 10 000 € de pièces à sa propre filiale. Pour le bilan du groupe, éliminez ce produit interne artificiel.",
            accounts: { "701": "701 - Ventes", "411": "411 - Tiers Clients" },
            expectedEntries: { "701": { debit: 10000 }, "411": { credit: 10000 } }
        },
        13: {
            title: "Consolidation : Retraitement réciproque (Achats)",
            description: "Symétriquement, éliminez la charge d'achat réciproque interne correspondante de 10 000 €.",
            accounts: { "401": "401 - Fournisseurs", "601": "601 - Achats Consommations" },
            expectedEntries: { "401": { debit: 10000 }, "601": { credit: 10000 } }
        },
        14: {
            title: "Fiscalité : Liquidation de l'IS Groupe",
            description: "L'impôt consolidé calculé sur les bénéfices industriels nets s'élève à 15 000 €.",
            accounts: { "695": "695 - Impôts", "401": "401 - Fournisseurs" },
            expectedEntries: { "695": { debit: 15000 }, "401": { credit: 15000 } }
        },
        15: {
            title: "Validation des comptes d'Usine",
            description: "Fin du cycle industriel consolidé. Passez une ligne technique à 0 € sur le compte 101 pour archiver.",
            accounts: { "101": "101 - Capital Social" },
            expectedEntries: { "101": { debit: 0 } }
        }
    }
};
