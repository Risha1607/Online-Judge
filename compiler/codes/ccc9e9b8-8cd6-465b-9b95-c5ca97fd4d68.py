def two_sum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []

def main():
    import sys
    input = sys.stdin.read().strip().split()
    
    n = int(input[0])  # Size of the array
    nums = list(map(int, input[1:n+1]))  # Array elements
    target = int(input[n+1])  # Target
    
    result = two_sum(nums, target)
    if result:
        print(result[0], result[1])
    else:
        print("No solution found")

if __name__ == "__main__":
    main()
