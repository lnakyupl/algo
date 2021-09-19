function sol1(N) {
    // n 번째 계단을 올라가는 방법의 수는 n - 1 번째와 n - 2 번째 경우의 합
    const arr = [];
    arr[0] = 0;
    arr[1] = 1;
    arr[2] = 2;

    for (let i = 3; i <= N; i++) {
        arr[i] = arr[i - 2] + arr[i - 1];
    }
    console.log(arr[N]);
}
sol1(7);

function sol2(N) {
    sol1(N + 1);
}
sol2(7);

function sol3(arr) {
    // 0 1 2 3 4 5 6 7 8   index
    // 0 5 3 7 8 6 2 9 4   arr: 입력 수열
    // 0 1 1 2 3 2 1 4 2   dp : arr[index] 를 마지막 값으로 가지는 가장 긴 수열의 길이

    // arr[index] 가 가장 길게 증가하는 집합중 마지막이 되려면 전 수열의 마지막 값보다 커야한다.

    //         dp[4]
    // 0 1 1 2 ?

    //         arr
    // 0 5 3 7         dp[4] = 0, 5, 7 에 해당하는 dp 값중 가장 큰것 + 1

    const dp = [0];
    arr.unshift(0);

    for (let i = 1; i <= arr.length; i++) {
        dp[i] = Math.max(...arr.slice(0, i).map((num, idx) => num < arr[i] ? dp[idx] : 0)) + 1;
    }
    console.log(Math.max(...dp));
}
sol3([5, 3, 7, 8, 6, 2, 9, 4]);
sol3([2, 7, 5, 8, 6, 4, 7, 12, 3]); // 5
sol3([12, 1, 2, 3, 15]); // 4

function sol4(coinList, limit) {
    const dp = Array(limit).fill(Number.MAX_SAFE_INTEGER);
    dp.unshift(0);

    for (const coin of coinList) {
        for (let i = coin; i <= limit; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
        // console.log(dp);
    }
    console.log(dp[limit]);
}
sol4([1, 2, 5], 15);

function sol5(MAX, list) {
    // list 는 시간과 점수의 쌍 배열
    // dp[i][j] 는 0 ~ i 번째 문제를 골라서 풀었을때 제한시간안에 얻을 수 있는 최대 점수

    // 0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // 1: [0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    // 2: [0, 0, 0, 0, 0, 10, 10, 10, 10, 10, 10, 10, 25, 25, 25, 25, 25, 35, 35, 35, 35]
    // 3: [0, 0, 0, 0, 0, 10, 10, 10, 15, 15, 15, 15, 25, 25, 25, 25, 25, 35, 35, 35, 40]
    // 4: [0, 0, 0, 6, 6, 10, 10, 10, 16, 16, 16, 21, 25, 25, 25, 31, 31, 35, 35, 35, 41]
    // 5: [0, 0, 0, 6, 7, 10, 10, 13, 16, 17, 17, 21, 25, 25, 25, 31, 32, 35, 35, 38, 41]

    const dp = Array(list.length + 1).fill(null)
        .map(() => Array(MAX + 1).fill(0));

    for (let i = 1; i <= list.length; i++) {
        const [score, time] = list[i - 1];
        for (let j = 1; j <= MAX; j++) {
            if (j < time) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - time] + score);
            }
        }
    }
    console.log(dp[list.length][MAX]);
}
sol5(20, [[10, 5], [25, 12], [15, 8], [6, 3], [7, 4]]);