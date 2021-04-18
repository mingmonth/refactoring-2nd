const fs = require("fs");
// JSON.parse 는 object 형태로 값 반환
const plays = JSON.parse(fs.readFileSync("./plays.json"));
const invoices = JSON.parse(fs.readFileSync("./invocies.json"));

function statement(invoice) {
  let totalAmount = 0;
  let result = `청구 내역 (고객명: ${invoice[0].customer})\n`;
  for (let performance of invoice[0].performances) {
    result += `${playfor(performance).name}: ${usd(amoutFor(performance))} (${
      performance.audience
    }석)\n`;
    totalAmount += amoutFor(performance);
  }

  result += `총액: ${usd(totalAmount)}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let performance of invoice[0].performances) {
      volumeCredits += volumeCreditsFor(performance);
    }
    return volumeCredits;
  }

  function volumeCreditsFor(aPerformance) {
    let volumeCredits = 0;
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playfor(aPerformance).type)
      volumeCredits += Math.floor(aPerformance.audience / 5);
    return volumeCredits;
  }

  function playfor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amoutFor(aPerformance) {
    let result = 0;
    switch (playfor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playfor(aPerformance).type}`);
    }
    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minumumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}
// 객체 형태일때 . 으로 접근 가능
console.log(invoices[0].performances);
result = statement(invoices);
console.log(result);
