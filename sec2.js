function s1(count, arr) {
    const result = [arr[0]]
    for (let i = 1; i < count; i++) {
        if (arr[i - 1] < arr[i]) {
            result.push(arr[i]);
        }
    }
    return result;
}

function s2(count, arr) {
    // 입력 받은 배열의 각 값이 바로 앞의 값보다 작거나 같으면 제거하여
    // 배열을 변경하고 마지막 값까지 비교하여 배열 길이로 결과 도출
    let i = 0;
    while (i < arr.length) {
        // console.log(arr);
        if (arr[i - 1] >= arr[i]) {
            arr.splice(i, 1);
        } else {
            i++;
        }
    }
    return arr.length;
}

function s3(a, b) {
    // 가위: 1 바위: 2 보: 3
    // 가위 바위 > 1 2 -1 B
    // 가위 보   > 1 3 -2 A
    // 바위 가위 > 2 1 1 A
    // 바위 보 > 2 3 -1 B
    // 보 가위 > 3 1 2 B
    // 보 바위 > 3 2 1 A
    // -2 or 1 이면 A, -1 or 2 이면 B
    const result = [];
    for (let i = 0; i < a.length; i++) {
        let c = a[i] - b[i];
        if (c === 0) {
            result.push('D');
        } else if (c === -2 || c === 1) {
            result.push('A');
        } else {
            result.push('B');
        }
    }
    return result;
}

function s4(arr) {
    let score = 1;
    let result = 0;
    for (let value of arr) {
        if (value) {
            result += score++;
        } else {
            score = 1;
        }
    }
    return result;
}

function s5(inputArr) {
    // 입력된 배열을 내림차순으로 정렬해서
    const sortedArr = [...inputArr].sort((a, b) => b - a);
    const resultArr = new Array(inputArr.length);
    let index;

    // 정렬된 값을 순서대로 원 배열에서 찾아 순번을 기록한다.
    for (let i = 0; i < sortedArr.length; i++) {
        index = inputArr.indexOf(sortedArr[i]);
        if (i && sortedArr[i] === sortedArr[i - 1]) {
            resultArr[index] = resultArr[i - 1];
        } else {
            resultArr[index] = i + 1;
        }
        inputArr[index] = 0;
    }

    // 같은 점수는 같은 등수로 처리하기 위해 정렬된 배열의 값을 한번 더 순회한다
    // let i = 0;
    // while (sortedArr[i]) {
    //     if (i && sortedArr[i] === sortedArr[i - 1]) {
    //         resultArr[i] = resultArr[i - 1];
    //     }
    //     i++;
    // }

    return resultArr;
}
s5([7, 89, 92, 100, 100]);

function s6(inputArr) {
    // 가로, 세로 대각선의 합을 result 배열에 계산해서 넣고 최대값을 찾는다
    const resultArr = [];
    let sum = 0;
    inputArr.forEach((inner) => {
        resultArr.push(inner.reduce((acc, val) => val + acc));
    });
    for (let i = 0; i < inputArr.length; i++) {
        let innerArr = inputArr[i];
        sum = 0;
        for (let j = 0; j < innerArr.length; j++) {
            sum += inputArr[j][i];
        }
        resultArr.push(sum);
    }

    sum = 0;
    for (let i = 0; i < inputArr.length; i++) {
        sum += inputArr[i][i];
    }
    resultArr.push(sum);

    sum = 0;
    for (let i = 0; i < inputArr.length; i++) {
        sum += inputArr[i][(inputArr.length - 1) - i];
    }
    resultArr.push(sum);
    return Math.max(resultArr);
}

function s7(inputArr) {
    // 2차원 배열 상하좌우에 0 패딩
    const originLength = inputArr.length;
    const resultArr = [];
    for (let i = 0; i < originLength; i++) {
        inputArr[i].unshift(0);
        inputArr[i].push(0);
    }
    inputArr.unshift(new Array(originLength + 2).fill(0));
    inputArr.push(new Array(originLength + 2).fill(0));

    // flag 배열을 모두 true 로 초기화 해서
    let innerArr;
    for (let i = 0; i < inputArr.length; i++) {
        innerArr = new Array(inputArr.length).fill(true);
        resultArr.push(innerArr);
    }

    // 조건에 맞지 않는 것들을 false 로 변경시킨뒤
    for (let i = 0; i < resultArr.length; i++) {
        for (let j = 0; j < resultArr[i].length; j++) {
            if (i === 0 || j === 0 || i === resultArr.length - 1 || j === resultArr.length - 1) {
                resultArr[i][j] = false;
                continue;
            }
            if (inputArr[i][j] < inputArr[i - 1][j]) { // 상
                resultArr[i][j] = false;
            }
            if (inputArr[i][j] < inputArr[i + 1][j]) { // 하
                resultArr[i][j] = false;
            }
            if (inputArr[i][j] < inputArr[i][j - 1]) { // 좌
                resultArr[i][j] = false;
            }
            if (inputArr[i][j] < inputArr[i][j + 1]) { // 우
                resultArr[i][j] = false;
            }
        }
    }

    // 남아있는 봉우리 갯수를 카운트
    return resultArr.reduce((acc, inner) => {
        return inner.filter(value => value).length + acc;
    }, 0);
}
