// If You Copy, Don`t Delete This Credit!!!
// Don`t Sell This Script Or I Take Immediately
// Yang Jual Script Ini Report/Hangusin Aja Akunnya Atau Pukulin ae orangnya
// Don`t Change This Credit!!!

import * as Func from "./core/library/systems/functions.js";
import util from "util";
import { read, readFileSync, unwatchFile, watchFile, writeFileSync } from "fs";
import axios from "axios";
import { writeExif } from "./core/library/systems/sticker.js";
import dScrape from "d-scrape";
import { fileURLToPath } from "url";
import "./core/library/Bot/listmenu.js";
import baileys from "@xyzendev/baileys";
import os from "os";
import chalk from "chalk";
import { exec } from "child_process";
import speed from "performance-now";
import ytdl from "youtubedl-core";
import { performance } from "perf_hooks";
import fs from "fs";
import { randomBytes } from "crypto";
import moment from "moment-timezone";
import { toAudio, toImage } from "./core/library/systems/converts.js";

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

const premium = JSON.parse(readFileSync("storage/json/premium.json"));
const USERS = JSON.parse(readFileSync("storage/json/users.json"));
//database
global.db.data = JSON.parse(fs.readFileSync("storage/database.json"));
if (global.db.data)
  global.db.data = {
    users: {},
    groups: {},
    sticker: {},
    database: {},
    game: {},
    others: {},
    settings: {},
    usage: {},
    ...(global.db.data || {}),
  };

export default async function handleCases(masha, store, m, chatUpdate) {
  try {
    switch (isCommand ? m.command.toLowerCase() : false) {
      case "ai":
      case "openai":
      case "gpt":
        {
          if (!m.text) return reply("Prompt?");
          const response = await fetch(
            `https://sekai.reinaja.my.id/api/gpt?q=${m.text}`
          );
          if (!response.ok) {
            reply(`API Error! Status: ${response.status}`);
          }

          const result = await response.json();
          const data = result.data;
          reply2(data);
        }
        break;
        case "wikisearch":
        case "wikipedia":
        case "wiki":
          {
            if (!m.text) return reply2("Prompt?");
            const response = await fetch(
              `https://sekai.reinaja.my.id/api/wikipedia?q=${m.text}`
            );
            if (!response.ok) {
              reply2(`API Error! Status: ${response.status}`);
            }
  
            const result = await response.json();
            const data = result.data.result.content;
            reply2(data);
          }
          break;
          case "ghstalk":
            {
              if (!m.text) return reply2("Prompt?");
              const response = await fetch(
                `https://sekai.reinaja.my.id/api/githubstalk?q=${m.text}`
              );
              if (!response.ok) {
                reply2(`API Error! Status: ${response.status}`);
              }
    
              const result = await response.json();
              const data = result.data;
              reply2(data);
            }
            break;
            case "enable":
              {
                if (!m.isGroup) return
                if (!args[0]) return reply("antilink, antilinkgc")
                if (args[0] == "antilink") {
                  global.db.data.groups[from].antilink = true
                } else if (args[0] == "antilinkgc") {
                  global.db.data.groups[from].antilinkgc = true
                }
              }
            break
            case "disable":
              {
                if (!m.isGroup) return
                if (!args[0]) return reply("antilink, antilinkgc")
                if (args[0] == "antilink") {
                  global.db.data.groups[from].antilink = false
                } else if (args[0] == "antilinkgc") {
                  global.db.data.groups[from].antilinkgc = false
                }
              }
            break
            case "on":
              {
                if (!isCreator) return
                if (!args[0]) return reply("autotype, onlygc, onlypc")
                if (args[0] == "autotype") {
                  db.data.settings[botNumber].autotype = true
                } else if (args[0] == "onlygc") {
                  db.data.settings[botNumber].onlygrub = true
                } else if (args[0] == "onlypc") {
                  db.data.settings[botNumber].onlypc = true
                }
              }
            break
            case "off":
              {
                if (!isCreator) return
                if (!args[0]) return reply("autotype, onlygc, onlypc")
                if (args[0] == "autotype") {
                  db.data.settings[botNumber].autotype = false
                } else if (args[0] == "onlygc") {
                  db.data.settings[botNumber].onlygrub = false
                } else if (args[0] == "onlypc") {
                  db.data.settings[botNumber].onlypc = false
                }
              }
            break
            // TAMBAH SENDIRI
      default:
        //salam
        const salamRegex =
          /^(assalamu(?:'alaikum|alaikum)|salamualaikum|samlikom|samlekom)(?:\s+wr\.?\s+wb\.?|(?:\s+wa\s+rahmatullahi\s+wa\s+barakatuh)?)$/i;
        const salam = m.body.toLowerCase();
        if (salamRegex.test(salam))
          return m.reply(`wa'alaikumussalam wa rahmatullahi wa barakatuh.`);
    }
  } catch (e) {
    console.log(e);
  }
}

let fileP = fileURLToPath(import.meta.url);
watchFile(fileP, () => {
  unwatchFile(fileP);
  console.log(`Successfully To Update File ${fileP}`);
});
