function promptPasswordLength() {
    while (true) {
      inp_len = prompt("Please enter the password length (must bewtten 8 and 128 characters).")
      if (inp_len == null) { // user cancels
        return null;
      }

      else {
        var n = parseInt(inp_len);
        if (n >= 8 && n <= 128){
          return n;
        }
      }                       
    }
}

var CHARACTER_SETS = [
    [true, "Numbers", "0123456789"],
    [true, "Lowercase", "abcdefghijklmnopqrstuvwxyz"],
    [false, "Uppercase", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
    [false, "ASCII symbols", "!\"#$%" + String.fromCharCode(38) + "'()*+,-./:;" + String.fromCharCode(60) + "=>?@[\\]^_`{|}~"],
    [false, "Space", " "],
];

function promptCharTypes() {
    var useSpecialChar = confirm("Special characters?");
    var useNumChar = confirm("Numeric characters?");
    var useLowerChar = confirm("Lowercase characters?");
    var useUpperChar = confirm("Uppercase characters?");

    return {
        'useSpecialChar': useSpecialChar,
        'useNumChar': useNumChar,
        'useLowerChar': useLowerChar,
        'useUpperChar': useUpperChar,
    };
}


function randomChoice (arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}  

function getRandomPassword(pw_len, char_types) {
    var charset = '';
    if (char_types['useSpecialChar']){
        charset = charset.concat(CHARACTER_SETS[3][2]);
    }
    console.log(charset);
    if (char_types['useNumChar']){
        charset = charset.concat(CHARACTER_SETS[0][2]);
    }
    console.log(charset);
    if (char_types['useLowerChar']){
        charset = charset.concat(CHARACTER_SETS[1][2]);
    }
    console.log(charset);
    if (char_types['useUpperChar']){
        charset = charset.concat(CHARACTER_SETS[2][2]);
    }
    console.log(charset);
    charset = charset.split('')
    console.log(charset);

    password = ''

    var i;
    console.log(pw_len);

    for (i = 0; i < pw_len; i += 1){
        password = password.concat(randomChoice(charset));
        console.log(i);
    }

    document.getElementById("password").setAttribute("value", password);
}


function passwordGenerator() {
    var usrPW_len = promptPasswordLength();

    if (usrPW_len != null){
        char_types = promptCharTypes();
        if (char_types != null){
            getRandomPassword(usrPW_len, char_types);
        }
    }
    return null;       
}

function copyToClipboard(){
    var copyText = document.getElementById("password");
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    document.execCommand("copy");
    if (copyText.value.length == 0) {
        alert("Please generate a password first");
    }
    else {
        alert("Copied the text: " + copyText.value);
    }
}
