<!DOCTYPE html>
<html>
<head>
	<style type="text/css">
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
	</style>
	<title>Highscore</title>
</head>
<body>
	<h2>Highscore</h2>
	<table>
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