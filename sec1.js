function solution2(a, b, c) {
    let answer = 'NO';
    const arr = [a, b, c];
    arr.sort();
    // 입력 갯수가 작기 때문에 정렬을 하지 않고 비교 연산 여러번을 하는 것과
    // 정렬해서 비교를 한번 하는 것 과의 오버헤드 차이가 크지 않다 생각함
    if ( arr[0] + arr[1] > arr[2]) {
        answer = 'YES';
    }
    return answer;
}
function solution3(n) {
    // 올림
    return Math.ceil(n / 12);
}
function solution4(n) {
    // 공차 1 인 등차 수열의 합
    return ( n + 1 ) * ( n / 2 );
}
function solution5() {
    let min = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] < min) {
            min = arguments[i];
        }
    }
    return min;
    // ... 연산자와 min 함수를 사용하면 더 쉽군..
}
function solution6(arr) {
    const odd = arr.filter(value => value % 2 === 1);
    return [odd.reduce((a, v) => a += v), Math.min(...odd)];
    // filter, reduce, min 함수 쓰는것 까지는 쉽게 떠오르지만, reduce 파라미터를 계속 잘못 넣어서 디버거를 한참 쓰게됨..
}
function solution7(date, arr) {
    return arr.filter(v => v % 10 === date).length;
}
function solution8(origin) {
    // 9 명 중에 2명이 짭이므로 2중 포문을 돌면서 제외할 2개를 선택하고,
    // splice 로 두개를 제외하여 합이 100인 것을 찾아 return 한다
    let copy;
    for (let i = 0; i < origin.length; i++) {
        for (let j = i + 1; j < origin.length; j++) {
            copy = origin.slice(0);
            copy.splice(i, 1);
            copy.splice(j - 1, 1);
            if (copy.reduce((a,v) => a += v) === 100) {
                return copy;
            }
        }
    }
}
function solution9(text) {
    return text.replaceAll(/A/g,'#');
}
function solution10(text, char) {
    // 정규식으로 text에 포함된 char 를 추출 할수 있다면 편할거 같은데
    // 잘 안되므로 text 를 배열로 나눠서 배열에 포함된 char 를 필터링 해서 길이를 찾는다
    return text.split('').filter(c => c === char).length;
}
function solution11(text) {
    // 입력 문자열을 배열로 바꿔서 각 문자를 정규식 exec 로 검사한다
    // for of 구문은 거의 사용을 안해서 생각 못했는데 split 에 반복문 들어가면 저게 더 편해 보인다
    return text.split('').filter(char => /[A-Z]/.exec(char)).length;
}
function solution12(text) {
    return text.toUpperCase();
} // fromCharCode
function solution13(text) {
    // regex 로 알파벳인지 판별해서, 문자의 아스키코드로 대소문자 판별을 한뒤, case 스위칭
    let result = '';
    for (let char of text) {
        if (/[A-Za-z]/.exec(char)) {
            result += char.charCodeAt() < 91 ? char.toLowerCase() : char.toUpperCase();
        }
    }
    return result;
}
function solution14(count, inputArray) {
    // c 나 java 일때는 input 처리를 위해서 입력될 갯수를 받는게 필요했는데 js 에는 필요한가?
    let maximumText = '';
    for (let i = 0; i < count; i++) {
        if (maximumText.length < inputArray[i].length) {
            maximumText = maximumText[i];
        }
    }
    return maximumText;
}
function solution15(text) {
    // substr 의 인자로  들어가도
    return text.length % 2 === 0 ? text.substr((text.length / 2) - 1, 2) : text.substr((text.length / 2) - 1, 1);
}
function solution16(text) {
    // 중복 제거를 위해 object를 썻는데 indexOf 를 쓰면 그냥 result 에다가 해도 될거 같다
    const obj = {};
    let result = '';
    for (let char of text) {
        if (!obj[char]) {
            obj[char] = true;
            result += char;
        }
    }
    return result;
}
function solution17(arr) {
    const result = [];
    for (let str of arr) {
        if (!result.includes(str)) {
            result.push(str);
        }
    }
    return result;
}
