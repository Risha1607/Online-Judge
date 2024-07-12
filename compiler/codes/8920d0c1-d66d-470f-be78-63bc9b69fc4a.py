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
    
    # Assuming the last element is the target, and the rest are numbers
    nums = list(map(int, input[:-1]))
    target = int(input[-1])
    
    result = two_sum(nums, target)
    if result:
        print(result[0], result[1])
    else:
        print("No solution found")

if __name__ == "__main__":
    main()

