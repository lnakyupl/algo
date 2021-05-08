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
console.log(sol4([1, 3, 1, 2, 3], 5));