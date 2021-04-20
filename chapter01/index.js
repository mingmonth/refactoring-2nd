import * as plays from "./plays.json";
import * as invoices from "./invocies.json";
import createStatementData from "./createStatementData";

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data, invoice) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;
  for (let performance of data.performances) {
    result += `${performance.play.name}: ${usd(performance.amount)} (${
      performance.audience
    }석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minumumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}

// JSON.parse 는 object 형태로 값 반환
// 객체 형태일때 . 으로 접근 가능
console.log(invoices[0].performances);
console.log(statement(invoices, plays));
