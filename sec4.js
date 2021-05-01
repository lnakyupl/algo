function sol1(arr) {
    // 비교 함수와 각자리 합을 구하는 함수를 만들고,
    // 입력 값을 차례로 비교함수에 넣어서 가장 큰 값을 찾는다
    function compare(a, b) {
        const sumA = decimalSum(a);
        const sumB = decimalSum(b);
        if (sumA === sumB) {
            return a > b ? a : b;
        }
        return sumA > sumB ? a : b;
    }
    function decimalSum(num) {
        // 10으로 계속 나누는 방법보다, 입력값을 string 바꾼뒤, 배열로 나눠서 각 자리를 더하는 방법이 편함
        return num.toString().split('')
            .reduce((acc, val)=> Number.parseInt(val) + acc , 0);
    }

    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        max = compare(arr[i], max);
    }
    return max;
}
// console.log(sol1([128, 460 ,603 ,40, 521, 137, 123]));

function sol2(arr) {
    // memoization 을 위해 입력될 자연수의 최대값 만큼의 배열 초기화하여
    // 소수 여부를 배열에 저장하도록 하고
    // string 연산으로 입력되는 각 수를 뒤집어
    // 소수인 경우에 result 에 추가해서 결과를 구한다

    const prime = new Array(100001);
    prime[0] = false;
    prime[1] = false;
    function reverse(num) {
        return Number.parseInt(num.toString().split('').reverse().join(''));
    }
    function isPrime(num) {
        if (prime[num] === undefined) {
            getPrime(num);
        }
        return prime[num];
    }
    function getPrime(num) {
        let flag = true;
        // 소수의 정의
        // 자신을 제외한 수로 나눠지면 소수가 아니다
        for (let i = 2; i < num; i++) {
            if (num % i === 0) {
                flag = false;
            }
        }
        // getPrime 함수의 호출을 줄이기 위해서 소수인 경우
        // 소수의 정수 배는 소수가 아니므로 prime 배열에 미리 결과를 구해둔다.
        if (flag) {
            for (let i = 2; num * i > prime.length; i++) {
                prime[num * i] = false;
            }
        }
        prime[num] = flag;
    }

    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let r = reverse(arr[i]);
        if (isPrime(r)) {
            result.push(r);
        }
    }
    return result.join(' ');
}
// sol2([32, 55, 62, 20, 250, 370, 200, 30, 100]);

function sol3(x, y, arr) {
    // 3 4 1 2
    // 4 3 2 1
    // 3 1 4 2
    // 입력이 2중 배열이라 가정하고, 2중 for 문을 돌면서,
    // 멘토 - 멘티 짝이 가능한 경우에 count 를 증가시켜 결과를 도출한다
    function test(a, b) {
        let flag = true;
        // 수학 테스트 결과의 갯수만큼 반복문을 돌려서
        // a, b 학생의 테스트 결과로 멘토 멘티 짝이 합당한지 확인
        for (let i = 0; i < y; i++) {
            if (arr[i][a] >= arr[i][b]) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    let count = 0;
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < x; j++) {
            if (i !== j && test(i, j)) {
                count++
            }
        }
    }
    return count;
}
// 답이 이상한거 같다
// console.log(sol3(4, 3,
//     [[3, 4, 1, 2],
//     [4, 3, 2, 1],
//     [3, 1, 4, 2],]));

function sol4(n, m, arr) {
    function totalPrice() {
        // 배열의 모든 합
        return  arr.reduce((acc, val) => val[0] + val[1] + acc, 0);
    }
    function removeMin() {
        // 선물을 제외할때는 배송비와 상품 가격의 합이 가장 큰 것을 제외해야
        // 최소 비용으로 최대 인원의 선물을 예산내로 구할 수 있다.
        // 배송비와 상품의 합이 같다면, 상품의 가격이 작은 것을 제외해야
        // 상품의 가격이 더 큰 것이 선물 가능 리스트에 들어가서 할인을 받게 된다.
        let maxIdx = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[maxIdx][0] + arr[maxIdx][1] <= arr[i][0] + arr[i][1]) {
                if (arr[maxIdx][0] + arr[maxIdx][1] === arr[i][0] + arr[i][1]) {
                    maxIdx = arr[maxIdx][0] < arr[i][0] ? maxIdx : i;
                } else {
                    maxIdx = i;
                }
            }
        }
        arr.splice(maxIdx, 1);
    }

    // 상품 가격을 기준으로 내림차순 정렬 (편하게 할인 상품을 선택하기 위해)
    arr.sort((a, b) => b[0] - a[0]);

    while(true) {
        // 상품 + 배송비의 모든합에 할인 받은 가격
        if (totalPrice() - arr[0][0] / 2 <= m) {
            return arr.length;
        } else {
            for (let i = 0; i < arr.length; i++) {
                let sum = (idx) => arr[idx][0] + arr[idx][1];
                if (i === 0) {
                    if (totalPrice() - sum(0) - arr[1][0] / 2 <= m) {
                        return arr.length - 1;
                    }
                } else {
                    if (totalPrice() - sum(i) - arr[0][0] / 2 <= m) {
                        return arr.length - 1;
                    }
                }
            }
            removeMin();
        }
    }
}
//
// console.log(sol4(5, 28,
//     [[6 ,6],
//         [2 ,2],
//         [4 ,3],
//         [4 ,5],
//         [10, 3]]));


function sol5_1(n, k, arr) {
    // 카드를 내림차순 정렬 하고, 큰 순서대로 카드를 하나씩 뽑아서 가장 큰 값을 뽑는다
    arr.sort((a, b) => b - a);

    let max = 301;
    let count = 0;
    for (let x = 0; x < n; x++) {
        for (let y = x + 1; y < n ; y++) {
            for (let z = y + 1; z < n; z++) {
                let cur = arr[x] + arr[y] + arr[z];
                if (max < cur) {
                    debugger;
                }
                if (max > cur) {
                    count++;
                    max = cur;
                }
                if (count === k) {
                    return max;
                }
            }
        }
    }
}
function sol5_2(n, k, arr) {
    const map = {};
    const result = [];
    for (let x = 0; x < n; x++) {
        for (let y = x + 1; y < n ; y++) {
            for (let z = y + 1; z < n; z++) {
                let cur = arr[x] + arr[y] + arr[z];
                if (!map[cur]) {
                    result.push(arr[x] + arr[y] + arr[z]);
                    map[cur] = true;
                }
            }
        }
    }
    result.sort((a, b) => b - a);
    return result[k - 1];
}
function makeCase(){
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
    }
    const result = []
    for (let i = 0; i < 100; i++) {
        result.push(getRandomIntInclusive(1, 100));
    }
    return result;
}
// for (let i = 0; i < 100; i++) {
//     sol5_1(100, 100, makeCase());
// }
// sol5(10, 3, [13, 15, 34, 23, 45, 65, 33, 11, 26, 42])
console.log(sol5_2(10, 3, [13, 15, 34, 23, 45, 65, 33, 11, 26, 42]));