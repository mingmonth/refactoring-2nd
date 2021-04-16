const fs = require("fs");
// JSON.parse 는 object 형태로 값 반환
const plays = JSON.parse(fs.readFileSync("./plays.json"));
const invoices = JSON.parse(fs.readFileSync("./invocies.json"));

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

function statement(invoice) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice[0].customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minumumFractionDigits: 2,
  }).format;

  for (let performance of invoice[0].performances) {
    volumeCredits += Math.max(performance.audience - 30, 0);
    if ("comedy" === playfor(performance).type)
      volumeCredits += Math.floor(performance.audience / 5);

    result += `${playfor(performance).name}: ${format(
      amoutFor(performance) / 100
    )} (${performance.audience}석)\n`;
    totalAmount += amoutFor(performance);
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
// 객체 형태일때 . 으로 접근 가능
console.log(invoices[0].performances);
result = statement(invoices);
console.log(result);
