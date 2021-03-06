/*
** Service that provides strings to angular, depending on the langage set in the server
*/
angular.module("languages", [])
	.factory("languages", function()
	{
		var languages = {
			fr: {
				wait:				"Veuillez patienter",
				closeLogs:			"Fermer les alertes",
				responded:			"Répondu",
				waitingForAnswers:	"En attente de réponse",
				failServer:			"Une erreur est intervenu sur le serveur",
				newAdmin:
				{
					failPassword:	"Mot de passe inexistant ou confirmation incorrecte",
					successServer:	"L'enregistrement du nouvel admin est terminé ! La page va s'actualiser"
				},
				adminAuth:
				{
					failPassword:	"Mot de passe erroné",
					emptyPassword:	"Mot de passe inexistant"
				},
				missingData:		"Il manque des informations",
				noNextQuestion:		"Il n'y a plus de questions, appuyez sur Entrer pour fermer la salle",
				room:
				{
					Open:			"Inscription réussie !",
					"In Game":		"En jeu",
					Closed:			"Session fermée"
				}
			},
			en: {
				wait:				"Please wait",
				closeLogs:			"Close",
				responded:			"Responded",
				waitingForAnswers:	"Waiting for an answer",
				failServer:			"An error was caught during the process",
				newAdmin:
				{
					failPassword: 	"Password empty or incorrect confirmation",
					successServer:	"The recording of the new admin has been successful ! The page will refresh"
				},
				adminAuth:
				{
					failPassword:	"Authentification failed, try again",
					emptyPassword:	"The password you've send is empty"
				},
				missingData:		"Informations are missing",
				noNextQuestion:		"There is no more questions left, press Enter to close the room",
				room:
				{
					Open:			"Registration successful !",
					"In Game":		"In game",
					Closed:			"Room closed"
				}
			},
			de: {
				wait:				"Bitte warten",
				closeLogs:			"Schliesen",
				responded:			"Geantwortet",
				waitingForAnswers:	"Auf die Antwort warten",
				failServer:			"Prozessfehler",
				newAdmin:
				{
					failPassword: 	"Falsches oder leeres Password",
					successServer:	"The recording of the new admin has been successful ! The page will refresh"
				},
				adminAuth:
				{
					failPassword:	"Authentification failed, try again",
					emptyPassword:	"The password you've send is empty"
				},
				missingData:		"Informations are missing",
				noNextQuestion:		"There is no more questions left, press Enter to close the room",
				room:
				{
					Open:			"Erfolgreiche Registrierung !",
					"In Game":		"Im Spiel",
					Closed:			"Raum geschlossen"
				}
			}
		};
		return (languages);
	});