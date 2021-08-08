# L'interceptor

L'intercepteur est un fichier typescript qui va, lorsque c'est possible, ajouter le token transmis par le backend à toute requête faite par le frontend. Cela permet de s'affranchir de penser à ce token, il suffit de le récupérer, le placer dans la bonne variable et laisser la magie opérer !
Il n'existe que deux endroits où cet interceptor est contourné par le site : lorsque l'utilisateur chercher à modifier son mot de passe ou vérifier son adresse email, le site envoie un code qui ne correspond donc pas à un token d'authentification, mais plutôt un token à usage unique, l'ajout de ces deux tokens se fait donc directement dans la fonction d'envoi de la requête au backend.