// If You Copy, Don`t Delete This Credit!!! 
// Don`t Sell This Script Or I Take Immediately 
// Yang Jual Script Ini Report/Hangusin Aja Akunnya Atau Pukulin ae orangnya
// Don`t Change This Credit!!!

import { watchFile, unwatchFile } from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";
import moment from "moment-timezone";

/*============= WAKTU =============*/
let wibh = moment.tz("Asia/Jakarta").format("HH");
let wibm = moment.tz("Asia/Jakarta").format("mm");
let wibs = moment.tz("Asia/Jakarta").format("ss");
let wktuwib = `${wibh}:${wibm}:${wibs}`;

global.waktuwib = `${moment.tz("Asia/Jakarta").format("LL")} ${moment.tz("Asia/Jakarta").format("LT")}`

let d = new Date(new Date() + 3600000);
let locale = "id";
let week = d.toLocaleDateString(locale, { weekday: "long" });
let date = d.toLocaleDateString(locale, {
  day: "numeric",
  month: "long",
  year: "numeric",
});
/*============== SETINGS ==============*/
global.pairing = true
global.self = true

global.mprefix = '.'

/*============== NOMOR ==============*/
global.botnumber = "6282334226291"; // Bot Number
global.ownernum = "62881026950162"; //Owner Number

global.nameown = "FarelHanafi"; // Owner Name
global.namebot = "MashaMD"; // Bot Name

/*============== CREATE PANEL ==============*/
global.domain = ""; // Web Domain
global.capikey = ""; // Key PLTC
global.apikey = ""; // Key PLTA

/*============== APIKEY ==============*/
global.lolkey = "" // api.lolhuman.xyz
global.lann = "" // api.betabotz.eu.org
global.elxyz = "" // api.elxyz.me
global.masha = "" // sekai.reinaja.my.id

/*============== WATERMARK ==============*/
global.wm = "FarelHanafi";
global.namedoc = "Masha";
global.botdate = `Day's: ${week} ${date}`;
global.bottime = `Time: ${wktuwib}`;
global.titlebot = "Simple Whatsap Bot";
global.author = "Farel Hanafi";

/*============== IMAGE ==============*/
global.thumb2 = "https://telegra.ph/file/73c2c51587d964eda02e2.jpg";

/*=========== DOCUMENT ===========*/
global.thumbdoc = "https://telegra.ph/file/73c2c51587d964eda02e2.jpg";

const docTypes = [
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/pdf",
  "text/rtf",
  "application/json",
];
const randomIndex = Math.floor(Math.random() * docTypes.length);

global.doctyper = docTypes[randomIndex];

/*=========== GLOBAL FUNCTION ===========*/
const xtime = moment.tz("Asia/Jakarta").format("HH:mm:ss");
let rellwaktu = "";
global.rellwaktu = rellwaktu
global.ucapanwaktu = rellwaktu

if (xtime >= "00:00:00" && xtime < "05:00:00") {
  rellwaktu = "Malam";
} else if (xtime >= "05:00:00" && xtime < "12:00:00") {
  rellwaktu = "Pagi";
} else if (xtime >= "12:00:00" && xtime < "15:00:00") {
  rellwaktu = "Siang";
} else if (xtime >= "15:00:00" && xtime < "18:00:00") {
  rellwaktu = "Sore";
} else if (xtime >= "18:00:00" && xtime <= "23:59:59") {
  rellwaktu = "Malam";
}

/*=========== JANGAN DIUBAH DEKS ===========*/
let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright(`${file} Updated`));
});
