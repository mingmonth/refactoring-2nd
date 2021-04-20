const input =
  "name, age, gender, birth, number\njade, 24, male, 01.21, 010112233\nbean, 18, female, 01.30, 010223344\nread, 30, male, 04.22, 010445511\nrobbins, 17, female, 12.25, 010223311\nfreeman, 27, male, 08.01, 010559988";

console.log(input);

const rows = input.split("\n");

for (row in rows) {
  console.log(row);
}
