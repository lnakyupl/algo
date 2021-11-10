function solution(price, money, count) {
    var result = (price + price * count) / 2 * count;
    return result > money ? result - money : 0;
}

function solution(sizes) {
    const swapedArr = sizes.map(([w, h]) => w > h ? [w, h] : [h, w]);

    let maxWidth = Math.max(...swapedArr.map(([w, h]) => w));
    let maxHeight = Math.max(...swapedArr.map(([w, h]) => h));

    return maxWidth * maxHeight;
}

function solution(n, wires) {
    const resultArr = wires.map((wire, idx) => {
        const [left] = wire;
        const groupA = [left];

        const e = wires.filter((w, i) => i !== idx);
        while (true) {
            const k = e.findIndex(([a, b]) => groupA.includes(a) || groupA.includes(b));
            if (k > -1) {
                if (groupA.includes(e[k][0])) {
                    groupA.push(e[k][1]);
                } else {
                    groupA.push(e[k][0]);
                }
                e.splice(k, 1);
            } else {
                break;
            }
        }


        const r = n - groupA.length;
        return Math.abs(groupA.length - r);
    });

    return Math.min(...resultArr);
}

function solution(line) {
    const dots = [];
    for (let i = 0; i < line.length; i++) {
        for (let j = i + 1; j < line.length; j++) {
            const [a, b, e] = line[i];
            const [c, d, f] = line[j];

            const x = (b * f - e * d) / (a * d - b * c);
            const y = (e * c - a * f) / (a * d - b * c);

            if (Number.isInteger(x) && Number.isInteger(y)) {
                dots.push([x, y]);
            }
        }
    }
    const xList = dots.map(([x]) => x);
    const yList = dots.map(([, y]) => y);

    const maxX = Math.max(...xList);
    const maxY = Math.max(...yList);
    const minX = Math.min(...xList);
    const minY = Math.min(...yList);

    const width = maxX - minX;
    const height = maxY - minY;

    const movedDots = dots.map(([x, y]) => [x - minX, y - minY]);

    const matrix = Array(height + 1).fill(null)
        .map(() => Array(width + 1).fill('.'));

    movedDots.forEach(([x, y]) => {
        matrix[y][x] = '*';
    });

    const answer = matrix.map(arr => arr.join(''));
    return answer.reverse();
}

// 로또의 최고 순위와 최저 순위
function solution(lottos, win_nums) {
    const fixed = lottos.filter(num => num !== 0);
    const wins = win_nums.filter(num => fixed.includes(num));

    const min = wins.length;
    const max = min + lottos.filter(num => num === 0).length;

    const rank = [6, 6, 5, 4, 3, 2, 1];

    return [rank[max], rank[min]];
}

// 신규 아이디 추천
function solution(new_id) {
    new_id = new_id.toLocaleLowerCase();
    new_id = new_id.replace(/[^a-z._-\d]/g, '');
    new_id = new_id.replace(/\.+/g, '.');
    new_id = new_id.replace(/^\./g, '');
    new_id = new_id.replace(/\.$/g, '');
    new_id = new_id || 'a';
    new_id = new_id.length > 15 ? new_id.substr(0, 15) : new_id;
    if (new_id.charAt(14) === '.') {
        new_id = new_id.substr(0, 14);
    }
    while (true) {
        if (new_id.length > 2) {
            break;
        } else {
            new_id += new_id.charAt(new_id.length - 1);
        }
    }

    return new_id;
}

// 문자열 압축

// 오픈채팅방
function solution(record) {
    const idTable = new Map();
    const answer = [];

    record.forEach((row) => {
        const [command, id, name] = row.split(' ');
        switch (command) {
            case 'Enter':
            case 'Change':
                idTable.set(id, name);
                break;
            case 'Leave':
                break;
        }
    });

    record.forEach((row) => {
        const [command, id, name] = row.split(' ');
        switch (command) {
            case 'Enter':
                answer.push(`${idTable.get(id)}님이 들어왔습니다.`);
                break;
            case 'Leave':
                answer.push(`${idTable.get(id)}님이 나갔습니다.`);
                break;
        }
    });

    return answer;
}

// 숫자 문자열과 영단어
function solution(s) {
    const map = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    while (Number.isNaN(Number(s))) {
        map.forEach((str, idx) => {
            s = s.replace(str,idx);
        });
    }
    return Number(s);
}

// 키패드 누르기
function solution(numbers, hand) {
    let answer = '';
    let num;
    let left = '*';
    let right = '#';

    function calc(cur, target) {
        let n;
        const map = [3, 0, 0, 0, 1, 1, 1, 2, 2, 2];
        map['*'] = 3;
        map['#'] = 3;

        switch (cur) {
            case 2:
            case 5:
            case 8:
            case 0:
                n = Math.abs(map[cur] - map[target]);
                break;
            default:
                n = Math.abs(map[cur] - map[target]) + 1;
                break;
        }
        return n;
    }

    while (Number.isInteger(num = numbers.shift())) {
        switch (num) {
            case 1:
            case 4:
            case 7:
                answer += 'L';
                left = num;
                break;
            case 3:
            case 6:
            case 9:
                answer += 'R';
                right = num;
                break;
            default:
                const distL = calc(left, num);
                const distR = calc(right, num);

                if (distL === distR) {
                    if (hand === 'left') {
                        answer += 'L';
                        left = num;
                    } else {
                        answer += 'R';
                        right = num;
                    }
                } else if (distL < distR) {
                    answer += 'L';
                    left = num;
                } else {
                    answer += 'R';
                    right = num;
                }
                break;
        }
    }
    return answer;
}
