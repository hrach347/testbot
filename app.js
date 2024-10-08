const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const cron = require("node-cron");
const express = require("express");

const server = express();
const client = new Client();
const db = ["37493705670@c.us", "37493705670@c.us", "37493705670@c.us"];
let i = 0;
client.on("qr", (qr) => {
  qrcode.generate(qr);
});

client.on("ready", () => {
  console.log("Client is ready!");
  cron.schedule("* * * * *", () => {
    if (db[i]) {
      client.sendMessage(db[i], "test");
      i++;
    } else {
      client.sendMessage("37493705670@c.us", "test");
    }
  });
});

client.on("message_create", (msg) => {
  console.log("message detected");
  if (msg.body === "reply me") {
    msg.reply("REPLIED TEXT TEST");
  } else if (msg.body === "send") {
    client.sendMessage("37498222474@c.us", "test arame");
  }
});

client.initialize();

server.get("/", (req, res) => {
  res.json({
    message: "HI",
  });
  console.log("GET REQUEST DETECTED, SERVER: ACTIVE");
});
server.listen(8888);
