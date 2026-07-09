export interface Problem {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  slug: string;
}

export const CATEGORIES = [
  "Arrays + Hashing",
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Linked List",
  "Trees",
  "Graphs",
  "Heap",
  "Intervals",
  "Greedy",
  "Backtracking",
  "DP"
] as const;

export const PROBLEMS: Problem[] = [
  // --- Arrays + Hashing ---
  { id: "two-sum", name: "Two Sum", difficulty: "Easy", category: "Arrays + Hashing", slug: "two-sum" },
  { id: "contains-duplicate", name: "Contains Duplicate", difficulty: "Easy", category: "Arrays + Hashing", slug: "contains-duplicate" },
  { id: "valid-anagram", name: "Valid Anagram", difficulty: "Easy", category: "Arrays + Hashing", slug: "valid-anagram" },
  { id: "group-anagrams", name: "Group Anagrams", difficulty: "Medium", category: "Arrays + Hashing", slug: "group-anagrams" },
  { id: "top-k-frequent-elements", name: "Top K Frequent Elements", difficulty: "Medium", category: "Arrays + Hashing", slug: "top-k-frequent-elements" },
  { id: "product-except-self", name: "Product Except Self", difficulty: "Medium", category: "Arrays + Hashing", slug: "product-of-array-except-self" },
  { id: "longest-consecutive-sequence", name: "Longest Consecutive Sequence", difficulty: "Medium", category: "Arrays + Hashing", slug: "longest-consecutive-sequence" },
  { id: "majority-element", name: "Majority Element", difficulty: "Easy", category: "Arrays + Hashing", slug: "majority-element" },
  { id: "subarray-sum-equals-k", name: "Subarray Sum Equals K", difficulty: "Medium", category: "Arrays + Hashing", slug: "subarray-sum-equals-k" },
  { id: "continuous-subarray-sum", name: "Continuous Subarray Sum", difficulty: "Medium", category: "Arrays + Hashing", slug: "continuous-subarray-sum" },
  { id: "first-missing-positive", name: "First Missing Positive", difficulty: "Hard", category: "Arrays + Hashing", slug: "first-missing-positive" },
  { id: "set-matrix-zeroes", name: "Set Matrix Zeroes", difficulty: "Medium", category: "Arrays + Hashing", slug: "set-matrix-zeroes" },
  { id: "spiral-matrix", name: "Spiral Matrix", difficulty: "Medium", category: "Arrays + Hashing", slug: "spiral-matrix" },
  { id: "rotate-image", name: "Rotate Image", difficulty: "Medium", category: "Arrays + Hashing", slug: "rotate-image" },
  { id: "encode-decode-strings", name: "Encode Decode Strings", difficulty: "Medium", category: "Arrays + Hashing", slug: "encode-and-decode-strings" },

  // --- Two Pointers ---
  { id: "valid-palindrome", name: "Valid Palindrome", difficulty: "Easy", category: "Two Pointers", slug: "valid-palindrome" },
  { id: "two-sum-ii", name: "Two Sum II", difficulty: "Medium", category: "Two Pointers", slug: "two-sum-ii-input-array-is-sorted" },
  { id: "3sum", name: "3Sum", difficulty: "Medium", category: "Two Pointers", slug: "3sum" },
  { id: "container-with-most-water", name: "Container With Most Water", difficulty: "Medium", category: "Two Pointers", slug: "container-with-most-water" },
  { id: "trapping-rain-water", name: "Trapping Rain Water", difficulty: "Hard", category: "Two Pointers", slug: "trapping-rain-water" },
  { id: "sort-colors", name: "Sort Colors", difficulty: "Medium", category: "Two Pointers", slug: "sort-colors" },
  { id: "move-zeroes", name: "Move Zeroes", difficulty: "Easy", category: "Two Pointers", slug: "move-zeroes" },
  { id: "backspace-string-compare", name: "Backspace String Compare", difficulty: "Easy", category: "Two Pointers", slug: "backspace-string-compare" },
  { id: "boats-to-save-people", name: "Boats to Save People", difficulty: "Medium", category: "Two Pointers", slug: "boats-to-save-people" },
  { id: "partition-labels-two-pointers", name: "Partition Labels", difficulty: "Medium", category: "Two Pointers", slug: "partition-labels" },

  // --- Sliding Window ---
  { id: "longest-substring-without-repeating-characters", name: "Longest Substring Without Repeating Characters", difficulty: "Medium", category: "Sliding Window", slug: "longest-substring-without-repeating-characters" },
  { id: "longest-repeating-character-replacement", name: "Longest Repeating Character Replacement", difficulty: "Medium", category: "Sliding Window", slug: "longest-repeating-character-replacement" },
  { id: "permutation-in-string", name: "Permutation in String", difficulty: "Medium", category: "Sliding Window", slug: "permutation-in-string" },
  { id: "minimum-window-substring", name: "Minimum Window Substring", difficulty: "Hard", category: "Sliding Window", slug: "minimum-window-substring" },
  { id: "sliding-window-maximum", name: "Sliding Window Maximum", difficulty: "Hard", category: "Sliding Window", slug: "sliding-window-maximum" },
  { id: "maximum-average-subarray", name: "Maximum Average Subarray", difficulty: "Easy", category: "Sliding Window", slug: "maximum-average-subarray-i" },
  { id: "fruits-into-baskets", name: "Fruits Into Baskets", difficulty: "Medium", category: "Sliding Window", slug: "fruit-into-baskets" },
  { id: "find-all-anagrams", name: "Find All Anagrams", difficulty: "Medium", category: "Sliding Window", slug: "find-all-anagrams-in-a-string" },
  { id: "maximum-erasure-value", name: "Maximum Erasure Value", difficulty: "Medium", category: "Sliding Window", slug: "maximum-erasure-value" },
  { id: "subarrays-with-k-distinct", name: "Subarrays With K Distinct", difficulty: "Hard", category: "Sliding Window", slug: "subarrays-with-k-different-integers" },

  // --- Binary Search ---
  { id: "binary-search", name: "Binary Search", difficulty: "Easy", category: "Binary Search", slug: "binary-search" },
  { id: "search-insert-position", name: "Search Insert Position", difficulty: "Easy", category: "Binary Search", slug: "search-insert-position" },
  { id: "search-rotated-array", name: "Search Rotated Array", difficulty: "Medium", category: "Binary Search", slug: "search-in-rotated-sorted-array" },
  { id: "find-minimum-rotated-array", name: "Find Minimum Rotated Array", difficulty: "Medium", category: "Binary Search", slug: "find-minimum-in-rotated-sorted-array" },
  { id: "koko-eating-bananas", name: "Koko Eating Bananas", difficulty: "Medium", category: "Binary Search", slug: "koko-eating-bananas" },
  { id: "capacity-to-ship-packages", name: "Capacity To Ship Packages", difficulty: "Medium", category: "Binary Search", slug: "capacity-to-ship-packages-within-d-days" },
  { id: "time-based-key-value-store", name: "Time Based Key Value Store", difficulty: "Medium", category: "Binary Search", slug: "time-based-key-value-store" },
  { id: "peak-element", name: "Peak Element", difficulty: "Medium", category: "Binary Search", slug: "find-peak-element" },
  { id: "median-of-two-sorted-arrays", name: "Median of Two Sorted Arrays", difficulty: "Hard", category: "Binary Search", slug: "median-of-two-sorted-arrays" },
  { id: "split-array-largest-sum", name: "Split Array Largest Sum", difficulty: "Hard", category: "Binary Search", slug: "split-array-largest-sum" },

  // --- Linked List ---
  { id: "reverse-linked-list", name: "Reverse Linked List", difficulty: "Easy", category: "Linked List", slug: "reverse-linked-list" },
  { id: "merge-two-sorted-lists", name: "Merge Two Sorted Lists", difficulty: "Easy", category: "Linked List", slug: "merge-two-sorted-lists" },
  { id: "linked-list-cycle", name: "Linked List Cycle", difficulty: "Easy", category: "Linked List", slug: "linked-list-cycle" },
  { id: "remove-nth-node", name: "Remove Nth Node", difficulty: "Medium", category: "Linked List", slug: "remove-nth-node-from-end-of-list" },
  { id: "reorder-list", name: "Reorder List", difficulty: "Medium", category: "Linked List", slug: "reorder-list" },
  { id: "add-two-numbers", name: "Add Two Numbers", difficulty: "Medium", category: "Linked List", slug: "add-two-numbers" },
  { id: "copy-random-pointer", name: "Copy Random Pointer", difficulty: "Medium", category: "Linked List", slug: "copy-list-with-random-pointer" },
  { id: "reverse-k-group", name: "Reverse K Group", difficulty: "Hard", category: "Linked List", slug: "reverse-nodes-in-k-group" },
  { id: "merge-k-lists-linked-list", name: "Merge K Lists", difficulty: "Hard", category: "Linked List", slug: "merge-k-sorted-lists" },
  { id: "lru-cache", name: "LRU Cache", difficulty: "Medium", category: "Linked List", slug: "lru-cache" },

  // --- Trees ---
  { id: "max-depth", name: "Max Depth", difficulty: "Easy", category: "Trees", slug: "maximum-depth-of-binary-tree" },
  { id: "diameter", name: "Diameter", difficulty: "Easy", category: "Trees", slug: "diameter-of-binary-tree" },
  { id: "balanced-tree", name: "Balanced Tree", difficulty: "Easy", category: "Trees", slug: "balanced-binary-tree" },
  { id: "same-tree", name: "Same Tree", difficulty: "Easy", category: "Trees", slug: "same-tree" },
  { id: "subtree", name: "Subtree", difficulty: "Easy", category: "Trees", slug: "subtree-of-another-tree" },
  { id: "invert-tree", name: "Invert Tree", difficulty: "Easy", category: "Trees", slug: "invert-binary-tree" },
  { id: "level-order", name: "Level Order", difficulty: "Medium", category: "Trees", slug: "binary-tree-level-order-traversal" },
  { id: "right-side-view", name: "Right Side View", difficulty: "Medium", category: "Trees", slug: "binary-tree-right-side-view" },
  { id: "validate-bst", name: "Validate BST", difficulty: "Medium", category: "Trees", slug: "validate-binary-search-tree" },
  { id: "kth-smallest-bst", name: "Kth Smallest BST", difficulty: "Medium", category: "Trees", slug: "kth-smallest-element-in-a-bst" },
  { id: "lca-bst", name: "LCA BST", difficulty: "Medium", category: "Trees", slug: "lowest-common-ancestor-of-a-binary-search-tree" },
  { id: "lca-binary-tree", name: "LCA Binary Tree", difficulty: "Medium", category: "Trees", slug: "lowest-common-ancestor-of-a-binary-tree" },
  { id: "path-sum", name: "Path Sum", difficulty: "Easy", category: "Trees", slug: "path-sum" },
  { id: "construct-tree", name: "Construct Tree", difficulty: "Medium", category: "Trees", slug: "construct-binary-tree-from-preorder-and-inorder-traversal" },
  { id: "serialize-deserialize-tree", name: "Serialize Deserialize Tree", difficulty: "Hard", category: "Trees", slug: "serialize-and-deserialize-binary-tree" },

  // --- Graphs ---
  { id: "number-of-islands", name: "Number of Islands", difficulty: "Medium", category: "Graphs", slug: "number-of-islands" },
  { id: "max-area-island", name: "Max Area Island", difficulty: "Medium", category: "Graphs", slug: "max-area-of-island" },
  { id: "clone-graph", name: "Clone Graph", difficulty: "Medium", category: "Graphs", slug: "clone-graph" },
  { id: "course-schedule", name: "Course Schedule", difficulty: "Medium", category: "Graphs", slug: "course-schedule" },
  { id: "course-schedule-ii", name: "Course Schedule II", difficulty: "Medium", category: "Graphs", slug: "course-schedule-ii" },
  { id: "pacific-atlantic", name: "Pacific Atlantic", difficulty: "Medium", category: "Graphs", slug: "pacific-atlantic-water-flow" },
  { id: "rotting-oranges", name: "Rotting Oranges", difficulty: "Medium", category: "Graphs", slug: "rotting-oranges" },
  { id: "surrounded-regions", name: "Surrounded Regions", difficulty: "Medium", category: "Graphs", slug: "surrounded-regions" },
  { id: "graph-valid-tree", name: "Graph Valid Tree", difficulty: "Medium", category: "Graphs", slug: "graph-valid-tree" },
  { id: "connected-components", name: "Connected Components", difficulty: "Medium", category: "Graphs", slug: "number-of-connected-components-in-an-undirected-graph" },
  { id: "word-ladder", name: "Word Ladder", difficulty: "Hard", category: "Graphs", slug: "word-ladder" },
  { id: "open-lock", name: "Open Lock", difficulty: "Medium", category: "Graphs", slug: "open-the-lock" },
  { id: "alien-dictionary", name: "Alien Dictionary", difficulty: "Hard", category: "Graphs", slug: "alien-dictionary" },
  { id: "reconstruct-itinerary", name: "Reconstruct Itinerary", difficulty: "Hard", category: "Graphs", slug: "reconstruct-itinerary" },
  { id: "network-delay-time", name: "Network Delay Time", difficulty: "Medium", category: "Graphs", slug: "network-delay-time" },

  // --- Heap ---
  { id: "kth-largest", name: "Kth Largest", difficulty: "Medium", category: "Heap", slug: "kth-largest-element-in-an-array" },
  { id: "top-k-frequent-heap", name: "Top K Frequent", difficulty: "Medium", category: "Heap", slug: "top-k-frequent-elements" },
  { id: "find-median-stream", name: "Find Median Stream", difficulty: "Hard", category: "Heap", slug: "find-median-from-data-stream" },
  { id: "k-closest-points", name: "K Closest Points", difficulty: "Medium", category: "Heap", slug: "k-closest-points-to-origin" },
  { id: "merge-k-lists-heap", name: "Merge K Lists", difficulty: "Hard", category: "Heap", slug: "merge-k-sorted-lists" },
  { id: "task-scheduler", name: "Task Scheduler", difficulty: "Medium", category: "Heap", slug: "task-scheduler" },
  { id: "reorganize-string", name: "Reorganize String", difficulty: "Medium", category: "Heap", slug: "reorganize-string" },
  { id: "meeting-rooms-ii-heap", name: "Meeting Rooms II", difficulty: "Medium", category: "Heap", slug: "meeting-rooms-ii" },
  { id: "ipo", name: "IPO", difficulty: "Hard", category: "Heap", slug: "ipo" },
  { id: "smallest-range", name: "Smallest Range", difficulty: "Hard", category: "Heap", slug: "smallest-range-covering-elements-from-k-lists" },

  // --- Intervals ---
  { id: "merge-intervals", name: "Merge Intervals", difficulty: "Medium", category: "Intervals", slug: "merge-intervals" },
  { id: "insert-interval", name: "Insert Interval", difficulty: "Medium", category: "Intervals", slug: "insert-interval" },
  { id: "meeting-rooms", name: "Meeting Rooms", difficulty: "Easy", category: "Intervals", slug: "meeting-rooms" },
  { id: "meeting-rooms-ii-intervals", name: "Meeting Rooms II", difficulty: "Medium", category: "Intervals", slug: "meeting-rooms-ii" },
  { id: "non-overlapping-intervals", name: "Non Overlapping Intervals", difficulty: "Medium", category: "Intervals", slug: "non-overlapping-intervals" },
  { id: "minimum-arrows", name: "Minimum Arrows", difficulty: "Medium", category: "Intervals", slug: "minimum-number-of-arrows-to-burst-balloons" },
  { id: "employee-free-time", name: "Employee Free Time", difficulty: "Hard", category: "Intervals", slug: "employee-free-time" },
  { id: "interval-intersection", name: "Interval Intersection", difficulty: "Medium", category: "Intervals", slug: "interval-list-intersections" },

  // --- Greedy ---
  { id: "jump-game", name: "Jump Game", difficulty: "Medium", category: "Greedy", slug: "jump-game" },
  { id: "jump-game-ii", name: "Jump Game II", difficulty: "Medium", category: "Greedy", slug: "jump-game-ii" },
  { id: "gas-station", name: "Gas Station", difficulty: "Medium", category: "Greedy", slug: "gas-station" },
  { id: "candy", name: "Candy", difficulty: "Hard", category: "Greedy", slug: "candy" },
  { id: "hand-of-straights", name: "Hand of Straights", difficulty: "Medium", category: "Greedy", slug: "hand-of-straights" },
  { id: "merge-triplets", name: "Merge Triplets", difficulty: "Medium", category: "Greedy", slug: "merge-triplets-to-form-target-triplet" },
  { id: "partition-labels-greedy", name: "Partition Labels", difficulty: "Medium", category: "Greedy", slug: "partition-labels" },
  { id: "valid-parenthesis-string", name: "Valid Parenthesis String", difficulty: "Medium", category: "Greedy", slug: "valid-parenthesis-string" },

  // --- Backtracking ---
  { id: "subsets", name: "Subsets", difficulty: "Medium", category: "Backtracking", slug: "subsets" },
  { id: "subsets-ii", name: "Subsets II", difficulty: "Medium", category: "Backtracking", slug: "subsets-ii" },
  { id: "permutations", name: "Permutations", difficulty: "Medium", category: "Backtracking", slug: "permutations" },
  { id: "combination-sum", name: "Combination Sum", difficulty: "Medium", category: "Backtracking", slug: "combination-sum" },
  { id: "combination-sum-ii", name: "Combination Sum II", difficulty: "Medium", category: "Backtracking", slug: "combination-sum-ii" },
  { id: "generate-parentheses", name: "Generate Parentheses", difficulty: "Medium", category: "Backtracking", slug: "generate-parentheses" },
  { id: "word-search", name: "Word Search", difficulty: "Medium", category: "Backtracking", slug: "word-search" },
  { id: "palindrome-partitioning", name: "Palindrome Partitioning", difficulty: "Medium", category: "Backtracking", slug: "palindrome-partitioning" },
  { id: "n-queens", name: "N Queens", difficulty: "Hard", category: "Backtracking", slug: "n-queens" },

  // --- DP ---
  { id: "climbing-stairs", name: "Climbing Stairs", difficulty: "Easy", category: "DP", slug: "climbing-stairs" },
  { id: "house-robber", name: "House Robber", difficulty: "Medium", category: "DP", slug: "house-robber" },
  { id: "house-robber-ii", name: "House Robber II", difficulty: "Medium", category: "DP", slug: "house-robber-ii" },
  { id: "coin-change", name: "Coin Change", difficulty: "Medium", category: "DP", slug: "coin-change" },
  { id: "decode-ways", name: "Decode Ways", difficulty: "Medium", category: "DP", slug: "decode-ways" },
  { id: "longest-increasing-subsequence", name: "Longest Increasing Subsequence", difficulty: "Medium", category: "DP", slug: "longest-increasing-subsequence" },
  { id: "partition-equal-subset-sum", name: "Partition Equal Subset Sum", difficulty: "Medium", category: "DP", slug: "partition-equal-subset-sum" },
  { id: "target-sum", name: "Target Sum", difficulty: "Medium", category: "DP", slug: "target-sum" },
  { id: "unique-paths", name: "Unique Paths", difficulty: "Medium", category: "DP", slug: "unique-paths" },
  { id: "longest-common-subsequence", name: "Longest Common Subsequence", difficulty: "Medium", category: "DP", slug: "longest-common-subsequence" },
  { id: "maximum-product-subarray", name: "Maximum Product Subarray", difficulty: "Medium", category: "DP", slug: "maximum-product-subarray" },
  { id: "word-break", name: "Word Break", difficulty: "Medium", category: "DP", slug: "word-break" },
  { id: "best-time-to-buy-stock-with-cooldown", name: "Best Time To Buy Stock With Cooldown", difficulty: "Medium", category: "DP", slug: "best-time-to-buy-and-sell-stock-with-cooldown" },
  { id: "combination-sum-iv", name: "Combination Sum IV", difficulty: "Medium", category: "DP", slug: "combination-sum-iv" },
  { id: "min-cost-climbing-stairs", name: "Min Cost Climbing Stairs", difficulty: "Easy", category: "DP", slug: "min-cost-climbing-stairs" }
];
