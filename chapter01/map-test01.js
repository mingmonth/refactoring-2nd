const oneTwoThree = [1, 2, 3];
let result = oneTwoThree.map((v) => {
  console.log(v);
  return v;
});

console.log(oneTwoThree);
console.log(result);
console.log(oneTwoThree === result);

result = oneTwoThree.map((v) => {
  return v + 1;
});
result;

console.log(result);

result = oneTwoThree.map((v) => {
  if (v % 2) {
    return "홀수";
  }
  return "짝수";
});
result; // ['홀수', '짝수', '홀수']

console.log(result);

// 배열.reduce((누적값, 현잿값, 인덱스, 요소) => { return 결과 }, 초깃값);
result = oneTwoThree.reduce((acc, cur, i) => {
  console.log(acc, cur, i);
  return acc + cur;
}, 0);
// 0 1 0
// 1 2 1
// 3 3 2
console.log(result);

// 위의 map 예제를 reduce로 만들어보겠습니다.
result = oneTwoThree.reduce((acc, cur) => {
  acc.push(cur % 2 ? "홀수" : "짝수");
  return acc;
}, []);
result; // ['홀수', '짝수', '홀수']
console.log(result);

// 홀수 값만 필터 처리
result = oneTwoThree.reduce((acc, cur) => {
  if (cur % 2) acc.push(cur);
  return acc;
}, []);
result; // [1, 3]
console.log(result);

const promiseFactory = (time) => {
  return new Promise((resolve, reject) => {
    console.log(time);
    setTimeout(resolve, time);
  });
};
[1000, 2000, 3000, 4000].reduce((acc, cur) => {
  return acc.then(() => promiseFactory(cur));
}, Promise.resolve());
// 바로 1000
// 1초 후 2000
// 2초 후 3000
// 3초 후 4000
