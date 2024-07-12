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
    input = sys.stdin.read
    data = input().split()
    
    nums = list(map(int, data[:-1]))  # All elements except the last one are nums
    target = int(data[-1])            # The last element is the target
    
    result = two_sum(nums, target)
    print(result[0], result[1])  # Output the indices of the two numbers

if __name__ == "__main__":
    main()
