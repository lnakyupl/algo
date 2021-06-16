function sol1(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[minIdx] > arr[j]) {
                minIdx = j;
            }
        }
        // let temp = arr[i];
        // arr[i] = arr[minIdx];
        // arr[minIdx] = temp;

        // b = [a, a = b][0]; 한줄 스왑
        // arr[minIdx] = [arr[i], arr[i] = arr[minIdx]][0];

        // [a, b] = [b, a] 구조 분해 할당 스왑
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}
// sol1([13, 5, 11, 7, 23, 15]);

function sol2(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
// sol2([13, 5, 11, 7, 23, 15]);

function sol3(arr) {
    // stable, quick sort, tim sort (chrome v.70)
    arr.sort((a, b) => {
        return a < 0 && b > 0 ? -1 : 0;
    });
    return arr;
}
// sol3([1, 2, 3, -3, -2, 5, 6, -6]);
// sol3([10, -1]);

function sol4(arr) {
    let j;
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        for (j = i - 1; j >= 0 && arr[j] > key; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = key;
    }
    return arr;
}
// sol4([11, 7, 5, 6, 10, 9]);

function sol5(s, n, arr) {
    // 캐시를 배열로 생각해서 queue 나 stack 으로 구현할 경우
    // 어떤 자료구조를 선택하든 삽입이나 삭제에서 shift 가 일어나 전체 배열의 접근이 필요하며
    // 캐시 확인 작업에서 배열 전체 탐색이 필요하다.

    // Map 은 삽입 순서로 순회가 가능하므로 문제에서 요구하는 결과 도출이 가능하며
    // 입력 순서 유지를 위해 list 를 이용할 것으로 추측 되므로 삽입 삭제에 유리하고
    // 캐시 확인 작업에서 상수 시간이 걸려 유리하므로 맵을 이용하여 구현한다.

    const map = new Map();

    for (let i = 0; i < n; i++) {
        const job = arr[i];

        if (map.has(job)) {
            map.delete(job);
            map.set(job);
        } else {
            if (map.size >= s) {
                map.delete(map.keys().next().value);
            }
            map.set(job);
        }
    }

    return [...map.keys()].reverse();
}
// sol5(5, 9, [1, 2, 3, 2, 6, 2, 3, 5, 7]);

function sol6(arr) { // 좌표정렬
    // 입력으로 받은 배열을 복사해서 정렬한뒤
    // 두 배열의 값을 비교해 변경된 위치를 찾는다.
    const sortedArr = [...arr];
    sortedArr.sort((a, b) => a - b);

    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== sortedArr[i]) {
            result.push(i + 1);
        }
    }
    return result;
}
// sol6([120, 130, 150, 150, 130, 150]);

function sol7(matrix) {
    return matrix.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });
}
// sol7([[2, 7], [1, 3], [1, 2], [2, 5], [3, 6]]);

function sol8(conferences) { // 회의실 배정
    // 주어진 기간 동안 가장 많은 회의를 하려면
    // 입력 되는 시간 쌍의 차가 작은 (회의 시간이 짧은) 회의를 많이 넣을 수록 회의는 많이 할 수 있으므로
    // 회의시간이 짧은 순으로 입력 값(회의)을 정렬한뒤, 회의실의 빈 스케쥴에 순서대로 넣었을 때 들어가는 회의 수를 구하면 된다
    // (시작시간과 종료 시간이 같은 회의는 무한으로 입력이 가능하므로 예외 처리)

    // 주어지는 입력값에 시간이 정수로 주어진다는 조건이 없지만 편의상........... 배열로....... 구현한다
    // (만약 정수가 아닌 값이라면 회의실 스케쥴로 등록할때 등록 가능여부를 판단하는 로직을 변경해야 하고 탐색 비용이 더 들어갈 것이다.)

    let count = 0;
    const timeTable = [];

    conferences.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0]));

    for (const conf of conferences) {
        const temp = []; // conf: [2, 5]     2 ~ 5  -> [2, 3, 4]
        for (let i = conf[0]; i < conf[1]; i++) {
            temp.push(i);
        }

        if (temp.length === 0) { // 시작시간과 종료 시간이 같은 회의는 무한으로 입력이 가능
            count++;
        } else if (temp.every(time => !timeTable[time])) {
            temp.forEach((time) => { timeTable[time] = true; });
            count++;
        }
    }
    return count;
}
// sol8([[1, 4], [2, 3], [3, 5], [4, 6], [5, 7]]);
// sol8([[3, 3], [1, 3], [2, 3]]);

function sol9(times) { // 결혼식
    const timeTable = new Array(72);
    timeTable.fill(0);
    for (const time of times) {
        for (let i = time[0]; i < time[1]; i++) {
            timeTable[i]++;
        }
    }
    return Math.max(...timeTable);
}
// sol9([[14, 18], [12, 15], [15, 20], [20, 30], [5, 14]]);

function sol10(arr, findValue) { // 이분검색
    arr.sort((a, b) => a - b);
    let start = 0;
    let end = arr.length - 1;
    let index = Math.ceil(arr.length / 2);

    while (arr[index] !== findValue) {
        if (arr[index] > findValue) {
            end = index - 1;
        } else {
            start = index + 1;
        }
        index = Math.ceil((end + start) / 2);
        if (start >= end) {
            break;
        }
    }
    return index + 1;
}
// sol10([23, 87, 65, 12, 57, 32, 99, 81], 32);

// function sol11(arr, M) {
//     const sum = arr.reduce((v, a) => v + a);
//     let min = Math.ceil(sum / 3);
//     let max = sum;
//     let size;
//
//     function isPossible(s) {
//         return true;
//     }
//     while (min <= max) {
//         size = Math.ceil((min + max) / 2);
//         if (isPossible(size)) {
//             max = size - 1;
//         } else {
//             min = size + 1;
//         }
//     }
// }
// sol11([1, 2, 3, 4, 5, 6, 7, 8 ,9], 3);