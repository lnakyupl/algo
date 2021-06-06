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

function sol7(arr) {
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
sol7([120, 130, 150, 150, 130, 150]);