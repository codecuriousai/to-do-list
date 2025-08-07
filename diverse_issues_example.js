let counter = 0;

function incrementCounter() {
  setTimeout(() => {
    const current = counter;
    counter = current + 1;
    console.log("Counter incremented to:", counter);
  }, Math.random() * 100);
}

for (let i = 0; i < 5; i++) {
  incrementCounter();
}

function createLeak() {
  const hugeArray = [];
  for (let i = 0; i < 1000000; i++) {
    hugeArray.push(new Array(1000).fill('leak'));
  }
  return () => hugeArray;
}

const leakyFunction = createLeak();

const unsafeString = "a string with spaces & symbols!";
const escapedString = escape(unsafeString);

console.log("Escaped string (deprecated escape()):", escapedString);

const array = [1, 2, 3, 4, 5];
const duplicates = [];

for (let i = 0; i < array.length; i++) {
  for (let j = i + 1; j < array.length; j++) {
    if (array[i] === array[j]) {
      duplicates.push(array[i]);
    }
  }
}

console.log("Duplicates found:", duplicates);

const jsonString = '{"name":"John", "age":30}';

const parsed = JSON.parse(jsonString);

console.log("Parsed JSON:", parsed);
