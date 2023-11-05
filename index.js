const { Client, GatewayIntentBits } = require("discord.js");
const https = require("node:https");
const dotenv = require('dotenv');
//トークン取得
dotenv.config();
var token = process.env.token;
console.log(token);

var x;

function Pget(){
    https.get("https://object.piennu777.jp/feelings/getcount.php").on("response",res => {
        let data = ""
        res.on("data",d => data += d)
        res.once("end",() => {
            console.log(data)
            x = data.replace(/\r?\n/g, '');;
        })
    })
}

//クライアントに接続
const client = new Client({
    intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b)
});

client.on("ready", () => {
    console.log(`${client.user.tag} でログインしています。`);
});
client.on("messageCreate",async msg => {
    console.log(msg.member.displayName + ": " + msg.content);
    if ( msg.content == "!piennu" ){
        Pget();
        msg.channel.send(`現在のお気持ち募金総額は${x}円です`)
    }
})

client.login(token)
