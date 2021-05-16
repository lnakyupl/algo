function sol1(arr1, arr2) {
    let j = 0;
    let result = [];

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] > arr2[j]) {
            for (; arr1[i] > arr2[j]; j++) {
                result.push(arr2[j]);
            }
        }
        result.push(arr1[i]);
    }
    for (let i = j; i < arr2.length; i++) {
        result.push(arr2[i]);
    }
    return result;
}
// console.log(sol1([1, 3, 5, 9, 10], [2, 3, 6, 7, 9]));

function sol2(arr1, arr2) {
    function compare(a, b) {
        return a - b;
    }
    arr1.sort(compare);
    arr2.sort(compare);

    let j = 0;
    let result = [];
    for (let i = 0; i < arr1.length; i++) {
        for (; arr1[i] >= arr2[j]; j++) {
            if (arr1[i] === arr2[j]) {
                result.push(arr1[i]);
            }
        }
    }
    return result;
}
// console.log(sol2([1, 3, 9, 5, 2], [3, 2, 5, 7, 8]));

function sol3(arr, m) {
    // let count = 0;
    // for (let i = 0; i < arr.length; i++) {
    //     for (let j = i; j < arr.length; j++) {
    //         if (arr.slice(i,j+1).reduce((a, v) => a + v) === sum) {
    //             // console.log(arr.slice(i,j+1));
    //             count++;
    //         }
    //     }
    // }
    // return count;

    let count = 0;
    let i = 0, j = 0;
    let sum = 0;
    while(true) {
        if (sum >= m) {
            sum -= arr[i++];
        } else if (j > arr.length - 1) {
            break;
        } else {
            sum += arr[j++];
        }
        if (sum === m) {
            count++
        }
        // console.log(arr.slice(i,j));
    }
    return count;
}
// console.log(sol3([1, 2, 1, 3, 1, 1, 1, 2], 6));

function sol4(arr, m) {
    // let count = 0;
    // for (let i = 0; i < arr.length; i++) {
    //     for (let j = i; j < arr.length; j++) {
    //         if (arr.slice(i,j+1).reduce((a, v) => a + v) <= sum) {
    //             // console.log(arr.slice(i,j+1));
    //             count++;
    //         }
    //     }
    // }
    // return count;

    let count = 0;
    let i = 0, j = 0;
    let sum = 0;
    while(true) {
        if (sum >= m) {
            sum = arr[++i];
            j = i + 1;
        } else {
            sum += arr[j++];
        }
        if (!sum) {
            break;
        }
        if (sum <= m) {
            count++
        }
        console.log(arr.slice(i,j));
    }
    return count;
}
// console.log(sol4([1, 3, 1, 2, 3], 5));

function sol5(n, k, arr) {
    // 부분 수열의 합이 가장 큰 것을 찾아야 하므로
    // 전체를 탐색하는 것 (각 부분합을 구함)은 어쩔수 없지만
    // 합을 구하기 위해 같은 수를 여러번 더하는 로직은
    // sliding window 를 이용해 횟수를 줄일수 있을듯 하다.
    let sum = 0;

    for (let i = 0; i < k; i++) {
        sum += arr[i];
    }
    let max = sum;

    for (let i = 0; i + k < n; i++) {
        sum -= arr[i];
        sum += arr[i + k];
        if (sum > max) {
            max = sum;
        }
    }
    return max;
}
// sol5(10, 3, [12, 15, 11, 20, 25, 10, 20, 19, 13, 15]);

function sol6(n, str) {
    // object 를 이용해서 key - value 에 각 문자와 문자의 갯수를 저장한다.
    // 문자열을 순회하면서 각 문자의 갯수를 증가시키며, 최대값을 갖는 문자를 저장해서 결과를 도출
    const obj = {};
    let maxChar = str[0];
    let char;
    for (let i = 0; i < n; i++) {
        char = str[i];
        if (!obj[char]) {
            obj[char] = 1;
        } else {
            obj[char]++;
            if (obj[char] > obj[maxChar]) {
                maxChar = char;
            }
        }
    }
    return maxChar;
}
// sol6(15, 'BACBACCACCBDEDE')

function sol7(str, anagram) {
    // 6번과 같은 방식으로 object 에 key value 를 저장하되
    // 두 문자열에서 value 를 증가, 감소 시켜
    // 문자열의 length 만큼 수행했을 때 object 에 등록된 값들이 모두 0 이면 아나그램으로 판별

    const obj = {};
    let char;
    for (let i = 0; i < str.length; i++) {
        char = str[i];
        if (!obj[char]) {
            obj[char] = 1;
        } else {
            obj[char]++;
        }

        char = anagram[i];
        if (!obj[char]) {
            obj[char] = -1;
        } else {
            obj[char]--;
        }
    }
    return Object.keys(obj).every(key => obj[key] === 0) ?
        'YES' : 'NO';
}
// sol7('AbaAeCe', 'baeeACA');

function sol8(str, anagram) {
    // sliding window 를 위한 object 하나와 비교를 위한 object 하나를 만들어서
    // 각 objet 에 문자의 갯수를 카운팅시키고
    // JSON.stringify 함수로 두 object 를 비교하여 결과를 도출한다.

    const obj = {};
    let char;

    for (char of str) {
        obj[char] = 0;
    }
    const anagramObj = {...obj};

    for (let i = 0; i < anagram.length; i++) {
        char = str[i];
        obj[char]++;

        char = anagram[i];
        anagramObj[char]++;
    }

    let result = JSON.stringify(obj) === JSON.stringify(anagramObj) ? 1 : 0;

    for (let i = 0; i + anagram.length < str.length; i++) {
        char = str[i];
        obj[char]--;

        char = str[i + anagram.length];
        obj[char]++;

        if (JSON.stringify(obj) === JSON.stringify(anagramObj)) {
            result++;
        }
    }
    return result;
}
sol8('bacaAacba', 'abc');