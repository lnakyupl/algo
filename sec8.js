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

function sol3() {
    const root = {
        value: 1,
        left: {
            value: 2,
            left: {
                value: 4,
                left: null,
                right: null,
            },
            right: {
                value: 5,
                left: null,
                right: null,
            },
        },
        right: {
            value: 3,
            left: {
                value: 6,
                left: null,
                right: null,
            },
            right: {
                value: 7,
                left: null,
                right: null,
            },
        },
    };
    let order;

    function traversal(node) {
        if (!node) {
            return '';
        }
        switch (order) {
            case 'pre':
                return ` ${node.value}${traversal(node.left)}${traversal(node.right)}`;
            case 'in':
                return `${traversal(node.left)} ${node.value}${traversal(node.right)}`;
            case 'post':
                return `${traversal(node.left)}${traversal(node.right)} ${node.value}`;
            default:
                return '';
        }
    }
    order = 'pre';
    console.log(traversal(root));

    order = 'in';
    console.log(traversal(root));

    order = 'post';
    console.log(traversal(root));
}
// sol3();

function sol4(N) {
    function printPartialSet(str, arr) {
        const array = arr.slice();
        if (array.length === 1) {
            console.log(`${str} ${array[0]}`);
            if (str) console.log(str);
            return;
        }
        printPartialSet(`${str} ${array.pop()}`, array);
        printPartialSet(str, array);
    }
    const entireSet = [...Array(N).keys()].map(i => i + 1);
    entireSet.reverse(); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

    printPartialSet('', entireSet);
}
// sol4(3);

function sol5(arr) {
    const N = arr.length;
    let available = false;

    function find(count, booleanArray) {
        if (available) {
            return;
        }
        if (!count) {
            const firstArr = arr.filter((v, i) => booleanArray[i]);
            const secondArr = arr.filter((v, i) => !booleanArray[i]);
            if (firstArr.reduce((s, a) => s + a, 0) === secondArr.reduce((s, a) => s + a, 0)) {
                available = true;
            }
            return;
        }
        find(count - 1, [...booleanArray, true]);
        find(count - 1, [...booleanArray, false]);
    }
    find(N, []);

    return available ? 'YES' : 'NO';
}
// console.log(sol5([1, 3, 5, 6, 7, 10]));
// console.log(sol5([1, 3, 5, 6, 7, 12])); // YES
// console.log(sol5([1, 3, 5, 6, 7, 14])); // YES
// console.log(sol5([1, 3, 5, 6, 7, 16])); // YES
// console.log(sol5([1, 3, 5, 6, 7, 18])); // NO

function sol6(C, arr) {
    const availableValues = [];
    function find(sum, list) {
        if (sum > C) {
            return;
        }
        if (!list.length) {
            availableValues.push(sum);
            return;
        }
        const copy = list.slice();
        find(sum + copy.pop(), copy);
        find(sum, copy);
    }
    find(0, arr);

    console.log(Math.max(...availableValues));
}
// sol6(34, [81, 58, 42, 33, 61]);

function sol7(M, arr) {
    const availableValues = [];
    arr.sort((a, b) => a[1] - b[1]);
    let counter = 0;

    function find(scoreSum, timeSum, list) {
        counter++;
        if (timeSum > M) {
            return;
        }
        if (!list.length) {
            availableValues.push(scoreSum);
            return;
        }
        const copy = list.slice();
        const question = copy.pop();
        find(scoreSum + question[0], timeSum + question[1], copy);
        find(scoreSum, timeSum, copy);
    }
    find(0, 0, arr);

    console.log(Math.max(...availableValues));
    console.log(counter);
}
// sol7(20, [
//     [10, 5],
//     [25, 12],
//     [15, 8],
//     [6, 3],
//     [7, 4],
// ]);

function sol8(N, M) {
    //         0
    //   1     2     3
    // 1 2 3 1 2 3 1 2 3

    function createTree(arr, depth, value) {
        const node = { value };

        if (!depth) {
            return node;
        }

        node.child = [];
        for (const v of arr) {
            node.child.push(createTree(arr, depth - 1, v));
        }
        return node;
    }

    let count = 0;
    function traversal(str, node) {
        if (!node.child) {
            console.log(`${str} ${node.value}`);
            count++;
            return;
        }
        for (const c of node.child) {
            if (node.value) {
                traversal(`${str} ${node.value}`, c);
            } else {
                traversal(str, c);
            }
        }
    }

    // [1, 2, 3]
    const array = [...Array(N).keys()].map(i => i + 1);

    const root = createTree(array, M, 0);
    traversal('', root);
    console.log(count);
}
// sol8(3, 2);

function sol9(coin, M) {
    coin.sort((a, b) => a - b);
    const dp = new Array(M + 1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;
    // console.log(...dp);
    for (let i = 0; i < coin.length; i++) {
        for (let j = coin[i]; j <= M; j++) {
            dp[j] = Math.min(dp[j], dp[j - coin[i]] + 1);
            // console.log(...dp);
        }
    }
    return dp[M];
}
sol9([1, 3, 5], 10);

function sol10(array, M) {
    //       0
    //   3   6   9
    //  6 9 3 9 3 6

    function createTree(arr, depth, value) {
        const node = { value };

        if (!depth) {
            return node;
        }

        node.child = [];
        for (let i = 0; i < arr.length; i++) {
            const restArray = arr.slice();
            restArray.splice(i, 1);
            node.child.push(createTree(restArray, depth - 1, arr[i]));
        }
        return node;
    }

    let count = 0;
    function traversal(str, node) {
        if (!node.child) {
            console.log(`${str} ${node.value}`);
            count++;
            return;
        }
        for (const c of node.child) {
            if (node.value) {
                traversal(`${str} ${node.value}`, c);
            } else {
                traversal(str, c);
            }
        }
    }
    const root = createTree(array, M, 0);
    traversal('', root);
    console.log(count);
}
// sol10([3, 6, 9], 2);

function sol11(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
// sol11(5);

function sol12(N, R) {
    const m = new Array(N + 1);
    for (let i = 0; i < m.length; i++) {
        m[i] = [];
    }
    function combination(n, r) {
        let result;
        if (m[n][r]) {
            return m[n][r];
        }

        if (r === 0 || n === r) {
            result = 1;
        } else if (r === 1) {
            result = n;
        } else {
            result = combination(n - 1, r - 1) + combination(n - 1, r);
        }
        m[n][r] = result;

        return result;
    }
    console.log(combination(N, R));
}
// sol12(5, 3);
// sol12(33, 19);

function sol13(N, F) {
    // a, b, c, d, e 의 수열이 있고, 파스칼 삼각형처럼 수를 합산해 나갈때
    // 맨 마지막의 값은 a, b, c, d, e 의 합으로 구할수 있는데
    // 이 경우 수열의 길이가 5 이므로
    // 4C0 * a   +   4C1 * b   +   4C2 * c   +   4C3 * d   + 4C4 * e  로 구할수 있다.

    // 순열(getPermutation)과, 조합(combination), 주어진 순열로 맨 마지막의 값을 구하는 함수(total)
    // 세가지를 구현하여 해결한다.

    const m = new Array(N + 1);
    for (let i = 0; i < m.length; i++) {
        m[i] = [];
    }
    function combination(n, r) {
        let result;
        if (m[n][r]) {
            return m[n][r];
        }

        if (r === 0 || n === r) {
            result = 1;
        } else if (r === 1) {
            result = n;
        } else {
            result = combination(n - 1, r - 1) + combination(n - 1, r);
        }
        m[n][r] = result;

        return result;
    }


    const usedFlag = Array(N + 1).fill(false);
    const permutationList = [];
    function getPermutation(list) {
        if (list.length === N) {
            permutationList.push(list);
            return;
        }
        for (let i = 1; i < N + 1; i++) {
            if (!usedFlag[i]) {
                usedFlag[i] = true;
                getPermutation([...list, i]);
                usedFlag[i] = false;
            }
        }
    }
    getPermutation([]);



    function total(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += combination(N - 1, i) * arr[i];
        }
        return sum;
    }

    for (let i = 0; i < permutationList.length; i++) {
        if (total(permutationList[i]) === F) {
            return permutationList[i];
        }
    }
}
console.log(sol13(4, 16));


function sol14(N, M) {
    const check = new Array(N);
    let count = 0;

    function combination(arr) {
        if (arr.filter(v => v).length === M) {
            const result = arr.map((b, i) => b ? i + 1 : 0).filter(n => n);
            console.log(...result);
            count++;
            return;
        }
        if (arr.length >= N) {
            return;
        }
        combination([...arr, true]);
        combination([...arr, false]);
    }
    combination([]);
    console.log(count);
}
sol14(4, 2);


function sol15(array, K, M) {
    const check = new Array(array.length);
    let count = 0;

    function combination(arr) {
        if (arr.filter(v => v).length === K) {
            const result = arr.map((b, i) => b ? array[i] : 0);
            const sum = result.reduce((a, b) => a + b);
            if (sum % M === 0) {
                // console.log(...result.filter(x => x));
                count++;
            }
            return;
        }
        if (arr.length >= array.length) {
            return;
        }
        combination([...arr, true]);
        combination([...arr, false]);
    }
    combination([]);
    console.log(count);
}
sol15([2, 4, 5, 8, 12], 3, 6);