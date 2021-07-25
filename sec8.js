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
