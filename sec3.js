function s1(inputString) {
    // 입력 문자열을 먼저 대문자로 변경한뒤에
    // 원문, 회문 배열에 각 문자를 넣고, 값이 같은지를 비교
    inputString = inputString.toUpperCase();
    const originArr = inputString.split('');
    const reverseArr = inputString.split('').reverse();
    let flag = 'YES';
    for (let i = 0; i < inputString.length; i++) {
        if (originArr[i] !== reverseArr[i]) {
            flag = 'NO';
        }
    }
    return flag;
}

function s2(inputString) {
    // 알파벳을 대문자로 변환하여 정규식으로 대문자만 남기고 원문과 회문을 비교
    inputString = inputString.toUpperCase();
    inputString = inputString.replace(/[^A-Z]/g, '');

    const originArr = inputString.split('');
    const reverseArr = inputString.split('').reverse();
    let flag = 'YES';
    for (let i = 0; i < inputString.length; i++) {
        if (originArr[i] !== reverseArr[i]) {
            flag = 'NO';
        }
    }
    return flag;
}

function s3(inputString) {
    // 정규식으로 숫자만 남기고, parseInt로 맨앞의 0 문자 제거
    return Number.parseInt(inputString.replace(/[^\d]/g, ''));
}

function s4(inputString, char) {
    const result = [];
    const max = inputString.length;

    // 각문자 마다 앞 문자열, 뒷 문자열을 잘라내고 앞 문자열은 뒤집어 놓는다
    // 두 문자열에서 찾는 문자의 index를 이용해 거리를 계산한다.
    for (let i = 0; i < inputString.length; i++) {
        let left = inputString.slice(0, i).split('').reverse().join('');
        let right = inputString.slice(i+1, inputString.length);
        if (inputString[i] === char) {
            result.push(0);
        } else {
            left = left.indexOf(char) != -1 ? left.indexOf(char) : max;
            right = right.indexOf(char) != -1 ? right.indexOf(char) : max;
            result.push(Math.min(left, right) + 1);
        }
    }
    return result;
}

function s5(inputString) {
    let count = 1;
    let beforeChar = '';
    let result = '';
    for (let i = 0; i < inputString.length; i++) {
        if (beforeChar !== inputString[i]) {
            result += inputString[i];
            count = 1;
        } else {
            count++;
        }
        beforeChar = inputString[i];
    }
    return result;
}
