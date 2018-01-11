#pragma strict
import System.IO; // For Reading the TXT
import System.Collections.Generic; //FOR LIST.<STRING>

var Button_1 : UnityEngine.UI.Text;
var Button_2 : UnityEngine.UI.Text;
var Button_3 : UnityEngine.UI.Text;
var Button_4 : UnityEngine.UI.Text;

var Time_Left : int = 60;
var Time_Is_Out : boolean = false;
var Game_Status : boolean = true;

var Word_Count : int = 1;
var Word_Generated : String;
var Words = new Array ();

var Title : UnityEngine.UI.Text;
var Score_Current : UnityEngine.UI.Text;
var Score_High : UnityEngine.UI.Text;
var Time_Left_Text : UnityEngine.UI.Text;

var Button_Restart : GameObject;
var Button_Quit : GameObject;

var Option_1 : GameObject;
var Option_2 : GameObject;
var Option_3 : GameObject;
var Option_4 : GameObject;
var Button_Current : GameObject;

var sr : StreamReader;
var line;
var level : TextAsset;
var number2 : int;

function Start () {
	level = Resources.Load("JustEveryWordEver", typeof(TextAsset));
	Button_Restart.SetActive(false);
	Button_Quit.SetActive(false);
	PlayerPrefs.SetInt("Score_Current", 0);
	Set_The_Buttons();
	CountDown();

}

function Update () {
	if (PlayerPrefs.GetInt("Score_Current") > PlayerPrefs.GetInt("Score_High")) {
		PlayerPrefs.SetInt("Score_High", PlayerPrefs.GetInt("Score_Current"));
	}
	Score_Current.text = "Current Score: " + PlayerPrefs.GetInt("Score_Current");
	Score_High.text = "Highscore: " + PlayerPrefs.GetInt("Score_High");
	Time_Left_Text.text = "Time Left: " + Time_Left;
}

function Generate_Word () {
	sr = new StreamReader(new MemoryStream(level.bytes));
	var number = Random.Range(1,84100);
	while (number > number2) {
		line = sr.ReadLine();
		number2++;
	}
	number2 = 0;
	Word_Generated = line;
	Words[Word_Count] = line;
	Word_Count++;
	sr.Close();
}

function Set_The_Buttons () {
	Words.Clear();
	Word_Count = 1;
	Generate_Word();
	Button_1.text = Word_Generated;
	Generate_Word();
	Button_2.text = Word_Generated;
	Generate_Word();
	Button_3.text = Word_Generated;
	Generate_Word();
	Button_4.text = Word_Generated;
}

function Option () {
	if (Game_Status == true) {
		Words.Sort();
		var Child : UnityEngine.UI.Text = Button_Current.GetComponentInChildren.<UnityEngine.UI.Text>();
		if (Child.text == Words[1]) {
			PlayerPrefs.SetInt("Score_Current", PlayerPrefs.GetInt("Score_Current") + 1);
			Set_The_Buttons();
		}else {
			Game_Status = false;
		}
		Debug.Log(Words[1]);
		Debug.Log(Child.text);
	}
}

function CountDown () {
	while (Time_Left > 0 && Game_Status == true) {
		Time_Left--;
		yield WaitForSeconds (1);
	}
	Time_Is_Out = true;
	Button_Restart.SetActive(true);
	Button_Quit.SetActive(true);
	Title.text = "Game Over";
}

function Switcher_1 () {
	Button_Current = Option_1;
}

function Switcher_2 () {
	Button_Current = Option_2;
}

function Switcher_3 () {
	Button_Current = Option_3;
}

function Switcher_4 () {
	Button_Current = Option_4;
}

function RestartGame () {
	Application.LoadLevel("Game");
}

function ExitGame () {
	Application.Quit();
}