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
sol1([13, 5, 11, 7, 23, 15]);

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
sol2([13, 5, 11, 7, 23, 15]);