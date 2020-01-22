const express = require("express");
const lowdb = require("lowdb");
const app = express();
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);
//const cors = require("cors");
//const bodyParser = require("body-parser");
const port = process.env.PORT || 1000;

//app.use(cors());
app.use(express.static("public"));

const initiateDatabase = () => {
    const databaseInitiated = database.has("person").value();

    if (!databaseInitiated) {
        database.defaults({ person: [] }).write();
    }
}

const insertPerson = async (firstName, lastName, age) => {
    const response = await database.get("person")
    .push({ FirstName: firstName, Lastname: lastName, Age: age })
    .write(); console.log("request: Succes");

    return response;
};

const getNames = async (name) => {
    //let posts = await getNumberOfPosts();
    const response = await database.get("person")
    .filter({FirstName: name}).value();
    console.log(response);
    
    return response
};

const getNumberOfPosts = async () => {
    const response = await database.get("person")
    .size()
    .value()

    return response
};

app.post("/addhuman", async (request, response) => {
    //console.log(request.url);
    const firstName = request.query.fname;
    console.log("FIRSTNAME:", firstName);
    const lastName = request.query.lname;
    console.log("LASTNAME:", lastName);
    const age = request.query.age;
    console.log("AGE:", age);
    let message = {
        succes: true,
        message: "Human added"
    };

    const res = await insertPerson(firstName, lastName, age);
    message.data = res[0];
    response.send(JSON.stringify(message));
    console.log(message);
    //database.set("insults", { insult: "test", play: "test1"})
    //database.get("insults").push({ insult: insult, play: play }).write();
});

app.get("/searchname", async (request, response) => {
    console.log(request.url);
    const name = request.query.fname;
    console.log(name);

    let result = await getNames(name);
    console.log('Test: ', result);
    let data = result[0].FirstName;
    let readable = JSON.stringify(data);
    console.log(readable);
    response.send(readable);

    return readable
});

app.get("/third", async (request, response) => {
    const result = await database.get("person[2]")
    .value()
    let readable = JSON.stringify(result.FirstName);
    console.log(readable);
    response.send(readable);
  
});

app.get("/getAges", async (request, response) => {
    const listOfHumans = await database.get("person")
    .value()

    const totalHumans = await database.get("person")
    .size()
    .value()

    result = 0;
    for (let i = 0; i < totalHumans; i++) {
        let number = listOfHumans[i].Age;
        result =+ number + result;
        //array.push(number);
        console.log(result);
    }
    //let readable = JSON.stringify(result.FirstName);
    //response.send(readable);
    response.send(JSON.stringify(result));
    return response
});

/*app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);*/

app.listen(port, () => {
    console.log("starting server", port);
    initiateDatabase();
});