/**
 * Math Quest — question generator (addition through squares, chains, missing addends).
 */

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {number} level 1–10+
 * @returns {{ text: string, answer: number }}
 */
export function generateMathQuestQuestion(level) {
  const maxNum = Math.min(10 + level * 2, 50);
  const minNum = level > 5 ? 5 : 1;
  const smallCap = Math.min(8 + level, 20);
  const multCap = Math.min(12, level + 5);

  const operations = ['add', 'subtract'];
  if (level >= 2) {
    operations.push('add3', 'missing_addend');
  }
  if (level >= 3) {
    operations.push('multiply', 'double');
  }
  if (level >= 4) {
    operations.push('chain_add_sub');
  }
  if (level >= 5) {
    operations.push('half');
  }
  if (level >= 6) {
    operations.push('divide');
  }
  if (level >= 7) {
    operations.push('square');
  }

  const operation = pick(operations);

  let num1;
  let num2;
  let num3;
  let answer;
  let text;

  switch (operation) {
    case 'add': {
      num1 = randInt(minNum, maxNum);
      num2 = randInt(minNum, maxNum);
      answer = num1 + num2;
      text = `${num1} + ${num2} = ?`;
      break;
    }
    case 'subtract': {
      num1 = randInt(minNum, maxNum);
      num2 = randInt(1, num1);
      answer = num1 - num2;
      text = `${num1} - ${num2} = ?`;
      break;
    }
    case 'add3': {
      num1 = randInt(1, smallCap);
      num2 = randInt(1, smallCap);
      num3 = randInt(1, smallCap);
      answer = num1 + num2 + num3;
      text = `${num1} + ${num2} + ${num3} = ?`;
      break;
    }
    case 'missing_addend': {
      const sum = randInt(Math.max(8, minNum + 5), Math.min(maxNum + maxNum, 40 + level * 3));
      num1 = randInt(1, sum - 1);
      answer = sum - num1;
      if (Math.random() < 0.5) {
        text = `? + ${num1} = ${sum}`;
      } else {
        text = `${num1} + ? = ${sum}`;
      }
      break;
    }
    case 'multiply': {
      num1 = randInt(1, multCap);
      num2 = randInt(1, Math.min(12, level + 3));
      answer = num1 * num2;
      text = `${num1} × ${num2} = ?`;
      break;
    }
    case 'double': {
      num1 = randInt(1, Math.min(15, 6 + level));
      answer = num1 * 2;
      text = `Double ${num1} = ?`;
      break;
    }
    case 'chain_add_sub': {
      num1 = randInt(2, smallCap);
      num2 = randInt(2, smallCap);
      const maxC = Math.min(num1 + num2 - 1, smallCap);
      num3 = randInt(1, Math.max(1, maxC));
      answer = num1 + num2 - num3;
      text = `${num1} + ${num2} - ${num3} = ?`;
      break;
    }
    case 'half': {
      answer = randInt(2, Math.min(12, 4 + level));
      num1 = answer * 2;
      text = `Half of ${num1} = ?`;
      break;
    }
    case 'divide': {
      num2 = randInt(2, 10);
      answer = randInt(1, 10);
      num1 = num2 * answer;
      text = `${num1} ÷ ${num2} = ?`;
      break;
    }
    case 'square': {
      num1 = randInt(2, Math.min(12, 5 + Math.floor(level / 2)));
      answer = num1 * num1;
      text = `${num1}² = ?`;
      break;
    }
    default: {
      num1 = randInt(1, 10);
      num2 = randInt(1, 10);
      answer = num1 + num2;
      text = `${num1} + ${num2} = ?`;
    }
  }

  return { text, answer };
}

/**
 * Four multiple-choice options including the correct answer.
 * @param {number} answer
 * @returns {number[]}
 */
export function generateMathQuestOptions(answer) {
  const options = new Set([answer]);
  const spread = Math.max(6, Math.min(20, Math.ceil(Math.abs(answer) * 0.12) + 4));

  let guard = 0;
  while (options.size < 4 && guard < 80) {
    guard += 1;
    const offset = Math.floor(Math.random() * (spread * 2 + 1)) - spread;
    const wrong = answer + offset;
    if (wrong >= 0 && wrong !== answer) {
      options.add(wrong);
    }
  }

  while (options.size < 4) {
    const fallback = answer + options.size + 1;
    if (fallback !== answer) options.add(fallback);
    else options.add(Math.max(0, answer - options.size - 1));
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
}
