function sol1(number) {
    if (number === 1) {
        return '1';
    }
    return `${sol1(number - 1)} ${number}`;
}
// console.log(sol1(3));

function sol2(decimal) {
    if (decimal < 2) {
        return decimal.toString();
    }
    return sol2(Math.floor(decimal / 2)) + (decimal % 2);
}
// console.log(sol2(16));
