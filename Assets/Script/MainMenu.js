#pragma strict
var HighScore : UnityEngine.UI.Text;

function Update () {
	HighScore.text = "Highscore: " + PlayerPrefs.GetInt("Score_High").ToString();
}

function StartGame () {
	Application.LoadLevel("Game");
}

function ExitGame () {
	Application.Quit();
}