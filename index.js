const express = require("express");
const fs = require("fs");

//express app
const application = express();
//port for server
const PORT = 3000 || 7000;

//Post Endpoint
application.post("/rest/ticket", (req, res) => {
  

  var dataInfo = [
    {
      id: 35436,
      created_at: "2015-07-20T22:55:29Z",
      updated_at: "2016-05-05T10:38:52Z",
      type: "incident",
      subject: "MFP not working right",
      description: "PC Load Letter? What does that even mean???",
      priority: "med",
      status: "open",
      recipient: "support_example@selu.edu",
      submitter: "Michael_bolton@selu.edu",
      assignee_id: 235323,
      follower_ids: [235323, 234],
      tags: ["enterprise", "printers"],
    },

    {
      id: 35437,
      created_at: "2015-07-20T22:55:29Z",
      updated_at: "2016-05-05T10:38:52Z",
      type: "incident",
      subject: "Network Down",
      description: "Ethernet Connection not working",
      priority: "high",
      status: "open",
      recipient: "support_example@selu.edu",
      submitter: "jeremy.clay@selu.edu",
      assignee_id: 235322,
      follower_ids: [235322, 235],
      tags: ["enterprise", "routers"],
    },
  ];

  const jsonString = JSON.stringify(dataInfo);

  // If there are no errors during the write operation, the server sends a response with a status code of 201 and a message "Created".
  fs.writeFile("TicketInfo.json", jsonString, (err) => {
    if (!err) 
    {
      res.status(201).send("Created");
    } 
    // if it fails will send back "Bad request"
    else
    {
      console.log(err.message);
      res.status(400).send("Bad Request");
    }
  });
});

application.get("/rest/list", (req, res) => 
{
  // read contents of a file named TicketInfo.json

  fs.readFile("TicketInfo.json", (err, dataInfo) => {
    
    if (!err) {
      //return all
      res.setHeader("content-type", "application/json");

      res.send(dataInfo);

      return;
    }
     // if does not work return Not Found
    console.log(err);

    res.status(400).send("Not Found");
  });
});

// route to get by id
application.get("/rest/ticket/:Id", (req, res) => {
  // read contents of TicketInfo.json
  fs.readFile("TicketInfo.json", "utf-8", (err, dataInfo) => 
  {
    if (err) throw err;

     // The program will parse the JSON string dataInfo using the JSON.parse() 
    var dataInfo = JSON.parse(dataInfo);

    var Id = parseInt(req.params.Id);
    //store the resulting object in a variable named dataInfo
    var dataInfoFound = dataInfo.find((ObjectId) => ObjectId.Id === Id);

    res.json(dataInfoFound);

  });

});

//listens to port
application.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));




