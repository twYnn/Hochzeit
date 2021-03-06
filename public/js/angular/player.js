var playerApp = angular.module("playerApp", ["webSocket", "languages", "showLogs", "switchLanguage"]);

playerApp.controller("playerCtrl", function ($scope, socket, languages){
	$scope.language = document.getElementById("lang").textContent || "en";
	$scope.buzzerName;
	$scope.buzzerImg;
	$scope.pseudo = "";
	$scope.room = {};
	$scope.canRespond = true;
	$scope.languages = languages;
	$scope.title = languages[$scope.language].wait;
	navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

	$scope.changePseudo = function() { socket.emit("changePseudo", $scope.pseudo); };
	socket.emit("getMyRoom");
	socket.on("getRoom", function(room)
	{
		var i = -1;
		var j;
		var k;

		$scope.title = languages[$scope.language].room[room.state];
		if (room.state != "Closed")
		{
			$scope.buzzerName = room.buzzer;
			if ($scope.buzzerName)
				$scope.buzzerImg = $scope.buzzerName.replace(/ /g, "-").toLowerCase();
			$scope.languageIndex = room.languages.indexOf($scope.language) ? room.languages.indexOf($scope.language) : 0;
			while (room.quest[++i])
			{
				j = $scope.languageIndex * (room.languages.length ? (room.quest[i].answers.length / room.languages.length) : 1);
				k = ($scope.languageIndex + 1) * (room.languages.length ? (room.quest[i].answers.length / room.languages.length) : 1);
				room.quest[i].languageAnswers = [];
				while (room.quest[i].answers[j] && j < k)
				{
					room.quest[i].languageAnswers.push(room.quest[i].answers[j]);
					++j;
				}
			}
		}
		$scope.room = room;
		$scope.$apply();
	});

	socket.on("nextQuestion", function(){
		++$scope.room.index;
		$scope.canRespond = true;
		$scope.$apply();
	});

	socket.on("hasResponded", function()
	{
		$scope.canRespond = false;
		$scope.$digest();
	});

	socket.on("stateChanged", function(newState)
	{
		$scope.room.state = newState;
		$scope.$apply();
	});

	$scope.sendAnswer = function(answer)
	{
		if ($scope.room.quest[$scope.room.index].answers.indexOf(answer) >= 0 && $scope.canRespond)
			socket.emit("sendAnswer", $scope.room.index, answer);
	};

	$scope.buzzer = function()
	{
		socket.emit("buzzer");
	};

	socket.on("buzzer", function(name)
	{
		if (($scope.buzzerName = name))
		{
			$scope.buzzerImg = $scope.buzzerName.replace(/ /g, "-").toLowerCase();
			if (navigator.vibrate) navigator.vibrate(500);
		}
		$scope.$apply();
	});
});