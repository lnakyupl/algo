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
sol1(5, [
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 1],
    [2, 3],
    [2, 5],
    [3, 4],
    [4, 2],
    [4, 5],
]);