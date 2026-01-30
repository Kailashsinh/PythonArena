export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  testCases: TestCase[];
  timeLimit: number; // in seconds
  starterCode: string;
}

export const problems: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    inputFormat: "First line contains n (size of array) and target separated by space.\nSecond line contains n space-separated integers.",
    outputFormat: "Two space-separated integers representing the indices (0-indexed).",
    sampleInput: "4 9\n2 7 11 15",
    sampleOutput: "0 1",
    testCases: [
      { input: "4 9\n2 7 11 15", expectedOutput: "0 1" },
      { input: "3 6\n3 2 4", expectedOutput: "1 2", isHidden: true },
      { input: "2 6\n3 3", expectedOutput: "0 1", isHidden: true },
      { input: "5 10\n1 2 3 4 6", expectedOutput: "3 4", isHidden: true },
    ],
    timeLimit: 1,
    starterCode: `def solve():
    # Read input
    first_line = input().split()
    n, target = int(first_line[0]), int(first_line[1])
    nums = list(map(int, input().split()))
    
    # Your code here
    # Find two indices i, j such that nums[i] + nums[j] == target
    
    # Print the result (two indices separated by space)
    pass

solve()`,
  },
  {
    id: "2",
    title: "Palindrome Check",
    difficulty: "Easy",
    description: `Given a string s, determine if it is a palindrome.

A string is a palindrome if it reads the same forward and backward.

Consider only alphanumeric characters and ignore case.`,
    inputFormat: "A single line containing the string s.",
    outputFormat: "Print 'True' if the string is a palindrome, 'False' otherwise.",
    sampleInput: "A man a plan a canal Panama",
    sampleOutput: "True",
    testCases: [
      { input: "A man a plan a canal Panama", expectedOutput: "True" },
      { input: "race a car", expectedOutput: "False", isHidden: true },
      { input: "Was it a car or a cat I saw", expectedOutput: "True", isHidden: true },
      { input: "hello", expectedOutput: "False", isHidden: true },
    ],
    timeLimit: 1,
    starterCode: `def solve():
    s = input()
    
    # Your code here
    # Check if s is a palindrome (ignoring case and non-alphanumeric chars)
    
    # Print True or False
    pass

solve()`,
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating",
    difficulty: "Medium",
    description: `Given a string s, find the length of the longest substring without repeating characters.

A substring is a contiguous sequence of characters within the string.`,
    inputFormat: "A single line containing the string s.",
    outputFormat: "Print the length of the longest substring without repeating characters.",
    sampleInput: "abcabcbb",
    sampleOutput: "3",
    testCases: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "bbbbb", expectedOutput: "1", isHidden: true },
      { input: "pwwkew", expectedOutput: "3", isHidden: true },
      { input: "dvdf", expectedOutput: "3", isHidden: true },
      { input: "anviaj", expectedOutput: "5", isHidden: true },
    ],
    timeLimit: 1,
    starterCode: `def solve():
    s = input()
    
    # Your code here
    # Find the length of the longest substring without repeating characters
    
    # Print the result
    pass

solve()`,
  },
  {
    id: "4",
    title: "Fibonacci Number",
    difficulty: "Easy",
    description: `Calculate the nth Fibonacci number.

The Fibonacci sequence is defined as:
- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2) for n > 1`,
    inputFormat: "A single integer n (0 ≤ n ≤ 30).",
    outputFormat: "Print the nth Fibonacci number.",
    sampleInput: "10",
    sampleOutput: "55",
    testCases: [
      { input: "10", expectedOutput: "55" },
      { input: "0", expectedOutput: "0", isHidden: true },
      { input: "1", expectedOutput: "1", isHidden: true },
      { input: "20", expectedOutput: "6765", isHidden: true },
      { input: "30", expectedOutput: "832040", isHidden: true },
    ],
    timeLimit: 1,
    starterCode: `def solve():
    n = int(input())
    
    # Your code here
    # Calculate the nth Fibonacci number
    
    # Print the result
    pass

solve()`,
  },
  {
    id: "5",
    title: "Valid Parentheses",
    difficulty: "Medium",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    inputFormat: "A single line containing the string s of brackets.",
    outputFormat: "Print 'True' if valid, 'False' otherwise.",
    sampleInput: "()[]{}", 
    sampleOutput: "True",
    testCases: [
      { input: "()[]{}", expectedOutput: "True" },
      { input: "(]", expectedOutput: "False", isHidden: true },
      { input: "{[]}", expectedOutput: "True", isHidden: true },
      { input: "([)]", expectedOutput: "False", isHidden: true },
      { input: "", expectedOutput: "True", isHidden: true },
    ],
    timeLimit: 1,
    starterCode: `def solve():
    s = input()
    
    # Your code here
    # Check if the parentheses are valid
    
    # Print True or False
    pass

solve()`,
  },
];

export function getProblemById(id: string): Problem | undefined {
  return problems.find(p => p.id === id);
}
