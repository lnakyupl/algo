function sol1(N, edgeList) {
    const matrix = Array(N + 1).fill(null)
        .map(() => Array(N + 1).fill(false));
    edgeList.forEach(edge => matrix[edge[0]][edge[1]] = true);

    const loopFlag = Array(N + 1).fill(false);

    let count = 0;
    function findPath(node) {
        if (node === N) {
            count++;
            return;
        }
        for (let i = 1; i < N + 1; i++) {
            if (matrix[node][i] && !loopFlag[i]) {
                loopFlag[i] = true;
                findPath(i);
                loopFlag[i] = false;
            }
        }
    }
    loopFlag[1] = true;
    findPath(1);
    console.log(count);
}
// sol1(5, [
//     [1, 2],
//     [1, 3],
//     [1, 4],
//     [2, 1],
//     [2, 3],
//     [2, 5],
//     [3, 4],
//     [4, 2],
//     [4, 5],
// ]);

function sol2(N, edgeList) {
    const list = Array(N + 1);
    edgeList.forEach(([v1, v2]) => {
        list[v1] = { value: v2, next: list[v1] };
    });

    const loopFlag = Array(N + 1).fill(false);

    let count = 0;
    function findPath(node) {
        if (node === N) {
            count++;
            return;
        }
        let edge = list[node];
        while (edge) {
            if (!loopFlag[edge.value]) {
                loopFlag[edge.value] = true;
                findPath(edge.value);
                loopFlag[edge.value] = false;
            }
            edge = edge.next;
        }
    }
    loopFlag[1] = true;
    findPath(1);
    console.log(count);
}
// sol2(5, [
//     [1, 2],
//     [1, 3],
//     [1, 4],
//     [2, 1],
//     [2, 3],
//     [2, 5],
//     [3, 4],
//     [4, 2],
//     [4, 5],
// ]);

function sol3(map) {
    let count = 0;
    const N = map.length + 2;
    const matrix = Array(N).fill(null)
        .map(() => Array(N).fill(1));
    const loopFlag = Array(N).fill(null)
        .map(() => Array(N).fill(false));
    map.forEach((arr, i) => {
        arr.forEach((value, j) => {
            matrix[i + 1][j + 1] = value;
        });
    });
    const direction = [
        [-1, 0], // top
        [0, 1], // right
        [1, 0], // bottom
        [0, -1], // left
    ];
    function findPath(i, j) {
        if (i === j && i === map.length) {
            count++;
            return;
        }
        direction.forEach(([h, v]) => {
            if (!loopFlag[i + h][j + v] && matrix[i + h][j + v] === 0) {
                loopFlag[i + h][j + v] = true;
                findPath(i + h, j + v);
                loopFlag[i + h][j + v] = false;
            }
        });
    }
    loopFlag[1][1] = true;
    findPath(1, 1);
    console.log(count);
}
// sol3([[0, 0, 0, 0, 0, 0, 0],
//       [0, 1, 1, 1, 1, 1, 0],
//       [0, 0, 0, 1, 0, 0, 0],
//       [1, 1, 0, 1, 0, 1, 1],
//       [1, 1, 0, 0, 0, 0, 1],
//       [1, 1, 0, 1, 1, 0, 0],
//       [1, 0, 0, 0, 0, 0, 0]]);

function sol4() {
    const root = {
        value: 1,
        left: {
            value: 2,
            left: { value: 4 },
            right: { value: 5 },
        },
        right: {
            value: 3,
            left: { value: 6 },
            right: { value: 7 },
        },
    };
    let result = '';
    const queue = [];
    queue.unshift(root);

    let node;
    while (node = queue.pop()) {
        if (node.left) {
            queue.unshift(node.left);
        }
        if (node.right) {
            queue.unshift(node.right);
        }
        result += ` ${node.value}`;
    }
    console.log(result);
}
// sol4();

function sol5(start, end) {
    const next = [-1, 1, 5];
    const queue = [];
    queue.push(...next.map(p => ({ cur: start + p, count: 1 })));

    let result;
    while (true) {
        const { cur, count } = queue.shift();
        if (cur === end) {
            result = count;
            break;
        }
        queue.push(...next.map(p => ({ cur: cur + p, count: count + 1 })));
    }
    console.log(result);
}
// sol5(5, 14);
// sol5(8, 3);

function sol6(map) {
    let count = 0;
    const N = map.length + 2;
    const matrix = Array(N).fill(null)
        .map(() => Array(N).fill(0));
    const flag = Array(N).fill(null)
        .map(() => Array(N).fill(false));
    map.forEach((arr, i) => {
        arr.forEach((value, j) => {
            matrix[i + 1][j + 1] = value;
        });
    });
    const direction = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];

    function checkIsolated(m, n) {
        flag[m][n] = true;
        direction.forEach(([h, v]) => {
            if (matrix[m + h][n + v] && !flag[m + h][n + v]) {
                checkIsolated(m + h, n + v);
            }
        });
    }

    for (let i = 1; i <= map.length; i++) {
        for (let j = 1; j <= map.length; j++) {
            if (matrix[i][j] && !flag[i][j]) {
                checkIsolated(i, j);
                count++;
            }
        }
    }

    console.log(count);
}
// sol6([
// [1, 1, 0, 0, 0, 1, 0],
// [0, 1, 1, 0, 1, 1, 0],
// [0, 1, 0, 0, 0, 0, 0],
// [0, 0, 0, 1, 0, 1, 1],
// [1, 1, 0, 1, 1, 0, 0],
// [1, 0, 0, 0, 1, 0, 0],
// [1, 0, 1, 0, 1, 0, 0]]);

function sol7(map) {
    let count = 0;
    const N = map.length + 2;
    const matrix = Array(N).fill(null)
        .map(() => Array(N).fill(0));
    const flag = Array(N).fill(null)
        .map(() => Array(N).fill(false));
    map.forEach((arr, i) => {
        arr.forEach((value, j) => {
            matrix[i + 1][j + 1] = value;
        });
    });
    const direction = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    const queue = [];

    function checkIsolated(m, n) {
        flag[m][n] = true;
        direction.forEach(([h, v]) => {
            if (matrix[m + h][n + v] && !flag[m + h][n + v]) {
                queue.push([m + h, n + v]);
            }
        });

        let next;
        while (next = queue.shift()) {
            flag[next[0]][next[1]] = true;
            direction.forEach(([h, v]) => {
                if (matrix[next[0] + h][next[1] + v] && !flag[next[0] + h][next[1] + v]) {
                    queue.push([next[0] + h, next[1] + v]);
                }
            });
        }
    }

    for (let i = 1; i <= map.length; i++) {
        for (let j = 1; j <= map.length; j++) {
            if (matrix[i][j] && !flag[i][j]) {
                checkIsolated(i, j);
                count++;
            }
        }
    }

    console.log(count);
}
sol7([
    [1, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 0]]);
