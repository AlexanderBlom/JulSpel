<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="style.css">
	<link href="https://fonts.googleapis.com/css?family=Mountains+of+Christmas" rel="stylesheet">
	<title>Highscore</title>
</head>
<body>
	<nav class="navbar navbar-expand-lg bg-dark">
		<ul class="nav">
			<li><a class="navbar-brand nav-link" href="index.html">Hem</a></li>
			<li><a class="navbar-brand nav-link" href="spel.html">Spela</a></li>
			<li><a class="navbar-brand nav-link" href="highscore.php">Highscore</a></li>
		</ul>
	</nav>
	<h2>Highscore</h2>
	<table class="table">
		<tr>
			<th>Player</th>
			<th>Score</th>
		</tr>

<?php
include 'dbinfo.php';
$dbh = new PDO('mysql:host=localhost;dbname=julspel;charset=utf8mb4', $dbuser, $dbpass);

$stmt = $dbh->prepare("INSERT INTO Highscore (namn, score) VALUES (:namn, :score)");
$stmt->bindparam('namn', $_GET['name']);
$stmt->bindparam('score', $_GET['score']);
$stmt->execute();

$stmt = $dbh->prepare("SELECT * FROM `Highscore` ORDER by score desc");
$stmt->execute();
$row = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($row as $value) {
	echo "
			<tr>
				<td>" . $value['namn'] . "</td>
				<td>" . $value['score'] . "</td>
			</tr>";

}

echo "</table>";
?>
</body>
</html>