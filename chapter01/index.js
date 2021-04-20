import * as plays from "./plays.json";
import * as invoices from "./invocies.json";
import createStatementData from "./createStatementData";

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minumumFractionDigits: 2,
  }).format(aNumber / 100);
}

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, play));
}

function renderHtml(data) {
  let result = "청구 내역 (고객명: ${data.customer})\n";
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";
  for (let perf of data.performances) {
    result += "<tr><td>${perf.play.name}</td><td>${perf.audience}석</td>";
    result += "<td>$usd(perf.amount)}</td></tr>\n";
  }
  result += "</table>\n";
  result += "<p>총액: <em>${usd(data.totalAmount)}</em></p>\n";
  result += "<p>적립 포인트 <em>${data.totalVolumeCredits}</em>점</p>\n";
  return result;
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
}

// JSON.parse 는 object 형태로 값 반환
// 객체 형태일때 . 으로 접근 가능
console.log(invoices[0].performances);
console.log(statement(invoices, plays));
