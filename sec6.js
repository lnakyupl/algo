function sol1(str) {
  // 입력 string 을 char 하나씩 배열 stack 에 넣는데,
  // 왼쪽 괄호는 push, 오른쪽은 pop 을 해서
  // 짝이 맞는지를 확인한다.
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
      case '(':
        stack.push(str[i]);
        break;
      case ')':
        if (stack.length === 0) {
          return 'NO';
        }
        stack.pop();
        break;
      default :
        return 'NO';
    }
  }

  return stack.length ? 'NO' : 'YES';
}
// console.log(sol1('(()(()))(()'));

function sol2(str) {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
      case ')':
        while (stack.pop() !== '(');
        break;
      default:
        stack.push(str[i]);
        break;
    }
  }

  return stack.join('');
}
// console.log(sol2('(A(BC)D)EF(G(H)(IJ)K)LM(N)'));

function sol3(board, moves) {
  // 입력받은 board 에서 element 를 뽑아오기 쉽도록 0을 제외한
  // queue 로 만들어 두고,
  // queue 에서 뽑아낸 element 를 stack 에 쌓으면서 갯수를 구한다.

  // board
  // [0,0,0,0,0]
  // [0,0,1,0,3]
  // [0,2,5,0,1]
  // [4,2,4,4,2]
  // [3,5,1,3,1]

  // queue list
  // [4, 3]
  // [2, 2, 5]
  // [1, 5, 4, 1]
  // [4, 3]
  // [3, 1, 2, 1]

  // [1,5,3,5,1,2,1,4] (moves)
  // 4 3 1 1 3 2 0 4  (queue 에서 뽑은 값)

  const queueList = [];
  for (let i = 0; i < board.length; i++) {
    const queue = [];
    for (let j = 0; j < board.length; j++) {
      const element = board[j][i];
      if (element) {
        queue.push(element);
      }
    }
    queueList.push(queue);
  }

  const result = [];
  let count = 0;
  for (const move of moves) {
    const element = queueList[move - 1].shift();
    if (element) {
      if (result[result.length - 1] === element) {
        result.pop();
        count += 2;
      } else {
        result.push(element);
      }
    }
  }
  return count;
}
// sol3([
//     [0,0,0,0,0],
//     [0,0,1,0,3],
//     [0,2,5,0,1],
//     [4,2,4,4,2],
//     [3,5,1,3,1]],
//     [1,5,3,5,1,2,1,4]);

function sol4(postfix) {
  const stack = [];
  for (const char of postfix) {
    switch (char) {
      case '+':
      case '-':
      case '*':
      case '/':
        const operand2 = stack.pop();
        const operand1 = stack.pop();
        stack.push(eval(operand1 + char + operand2));
        break;
      default:
        stack.push(char);
        break;
    }
  }
  return stack.pop();
}
// console.log(sol4('352+*9-'));
// console.log(sol4('7352-*+4+'));

function sol5() {

}
function sol6(n, k) {
  debugger;
}
sol6(8, 3);

function sol7(required, subjectList) {
  // 필수 목록과 수강 목록을 String 으로 입력 받고,
  // 필수 목록을 split 하여 array 로 만들어 queue 로 생각한다.
  // 수강 목록을 순차 순회하여 필수 목록의 첫번째 값과 같다면 필수 목록 을 shift 하여 dequeue 한다
  const rqList = required.split('');
  for (const subject of subjectList) {
    if (!rqList.length) {
      break;
    } else if (rqList[0] === subject) {
      rqList.shift();
    }
  }
  return rqList.length ? 'NO' : 'YES';
}
// sol7('CBA', 'CBDAGE');