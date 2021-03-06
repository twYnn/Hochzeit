var adminRoomApp = angular.module("adminRoomApp", ["webSocket", "languages", "showLogs", "switchLanguage"]);

adminRoomApp.controller("adminRoomCtrl", function ($scope, socket, languages){
	$scope.language = document.getElementById("lang").textContent || "en";

	$scope.room = {};
	$scope.languageIndex = 0;
	$scope.conclusion = {};
	$scope.buzzerName;
	$scope.addPts = 0;
	var roomID = document.getElementById("roomID").textContent;

	$scope.changeState = function(){ socket.emit("roomChangeState", roomID); };
	socket.on("stateChanged", function(newState)
	{
		$scope.room.state = newState;
		if (newState == "Closed") makeConclusions();
		$scope.$apply();
	});

	function makeConclusions()
	{
		var swap;
		var i = -1;
		var j;

		$scope.conclusion.winners = $scope.room.players;
		while ($scope.conclusion.winners[++i])
		{
			j = -1;
			while ($scope.conclusion.winners[++j])
				if ($scope.conclusion.winners[j + 1] && $scope.conclusion.winners[j + 1].points > $scope.conclusion.winners[j].points)
				{
					swap = $scope.conclusion.winners[j];
					$scope.conclusion.winners[j] = $scope.conclusion.winners[j + 1];
					$scope.conclusion.winners[j + 1] = swap;
				}
		}
	}

	socket.emit("getRoom", roomID);
	socket.on("getRoom", function(room)
	{
		$scope.room = room;
		$scope.languageIndex = room.languages.indexOf($scope.language) ? room.languages.indexOf($scope.language) : 0;
		$scope.buzzerName = room.buzzer;
		$scope.addPts = room.quest[room.index].points;
		if (room.state == "Closed") makeConclusions();
		$scope.$apply();
	});

	$scope.nextQuestion = function()
	{
		if (!$scope.room.quest[$scope.room.index + 1] && confirm(languages[$scope.language].noNextQuestion))
			$scope.changeState();
		else
			socket.emit("nextQuestion", roomID);
	}
	socket.on("nextQuestion", function(){
		++$scope.room.index;
		$scope.addPts = $scope.room.quest[$scope.room.index].points;
		var i = -1;
		while ($scope.room.players[++i])
			$scope.room.players[i].correctAnswer = undefined;
		$scope.$apply();
	});

	socket.on("newAnswer", function(pseudo, answer, points)
	{
		var i = -1;
		while ($scope.room.players[++i].pseudo != pseudo);
		if ($scope.room.players[i])
		{
			if ($scope.room.players[i].points < points)
				$scope.room.players[i].correctAnswer = true;
			$scope.room.players[i].points = points;
			$scope.room.players[i].answers.push(answer);
		}
		$scope.$apply();
	});

	socket.on("newPlayer", function(index, player)
	{
		$scope.room.players[index] = player;
		$scope.$apply();
	});

	socket.on("buzzer", function(pseudo)
	{
		$scope.buzzerName = pseudo;
		$scope.$apply();
	});

	$scope.addPoints = function(pseudo)
	{
		socket.emit("addPts", roomID, pseudo, $scope.addPts);
	};

	$scope.denyBuzzer = function()
	{
		socket.emit("denyBuzzer", roomID);
	}

	$scope.points = function(add)
	{
		$scope.addPts += add;
	}
});