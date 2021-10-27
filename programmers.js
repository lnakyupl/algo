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
