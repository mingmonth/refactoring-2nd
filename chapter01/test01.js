const fs = require("fs");
// JSON.parse 는 object 형태로 값 반환
const plays = JSON.parse(fs.readFileSync("./plays.json"));
const invoices = JSON.parse(fs.readFileSync("./invocies.json"));

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice[0].customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minumumFractionDigits: 2,
  }).format;

  for (let pref of invoice[0].performances) {
    const play = plays[pref.playID];
    let thisAmout = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (pref.audience > 30) {
          thisAmount += 1000 * (pref.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (pref.audience > 20) {
          thisAmount += 10000 + 500 * (pref.audience - 20);
        }
        thisAmount += 300 * pref.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    volumeCredits += Math.max(pref.audience - 30, 0);
    if ("comedy" === play.type) volumeCredits += Math.floor(pref.audience / 5);

    result += `${play.name}: ${format(thisAmount / 100)} (${
      pref.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
// 객체 형태일때 . 으로 접근 가능
console.log(invoices[0].performances);
result = statement(invoices, plays);
console.log(result);
