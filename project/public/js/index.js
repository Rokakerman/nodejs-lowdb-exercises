
document.getElementById("send").addEventListener("click", sendHuman);
document.getElementById("getnames").addEventListener("click", getNames);

async function postHuman(name, lastname, age) {
    const URL = "http://localhost:1000/addhuman?";
    const FIRSTNAME = "fname=";
    const LASTNAME = "lname=";
    const AGE = "age="
    const AND = "&";

    let response = await fetch(URL + FIRSTNAME + name + AND + LASTNAME + lastname + AND + AGE + age, {method: "POST"});
    
};

async function getNames(name) {
    const URL = "http://localhost:1000/searchname?";
    const FIRSTNAME = "fname=";
    name = await document.getElementById("search-name").value;

    let response = await fetch(URL + FIRSTNAME + name, {method: "GET"});

}

function sendHuman() {
    if (document.getElementById("user-name").value == "") {
        alert("Please type in a name");
    } else if (document.getElementById("user-surename").value == "") {
        alert("Please type in a lastname");
    } else if (document.getElementById("user-age").value == "") {
        alert("Please type in a age");
        return
    } else {
    let name = document.getElementById("user-name").value;
    let lastname = document.getElementById("user-surename").value;
    let age = document.getElementById("user-age").value;
    postHuman(name, lastname, age);
    }

};

