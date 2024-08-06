case "addprem":
{
  if (!isCreator) return;
  if (!text) return reply2(`Example:\n${prefix + command} @tag|time(s/m/h/d)`);
  let [teks1, teks2] = text.split`|`;
  const nmrnya = teks1.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
  const onWa = await rell.onWhatsApp(nmrnya);
  if (!onWa.length > 0)
    return reply2("This number is not registered on WhatsApp!");
  if (teks2) {
    PREM.addPremiumUser(nmrnya, teks2, premium);
    reply2(`Success ${command} @${nmrnya.split("@")[0]} During ${teks2}`);
    global.db.users[nmrnya].limit = global.db.users[nmrnya].vip
      ? global.limit.vip
      : global.limit.premium;
    global.db.users[nmrnya].uang = global.db.users[nmrnya].vip
      ? global.uang.vip
      : global.uang.premium;
  } else {
    reply2(`Enter the time!\nExample: ${prefix + command} @tag|time`);
  }
}
break

import premium from './database/premium.json' assert { type: 'json' }
import PREM from '../../../../storage/json/premium.json' assert { type: 'json' }
const isVip = global.db.users[m.sender] ? global.db.users[m.sender].vip : false
const IsPremium = isCreator || PREM.checkPremiumUser(m.sender, premium) || false
// Check Expiry
PREM.expiredCheck(rell, premium);


import cron from "node-cron"
cron.schedule('00 00 * * *', () => {
    let user = Object.keys(global.db.users)
    for (let jid of user) {
        const limitUser = global.db.users[jid].vip ? global.limit.vip : prem.checkPremiumUser(jid, premium) ? global.limit.premium : global.limit.free
        global.db.users[jid].limit = limitUser
        console.log('Limit Reseted')
    }
}, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
})
