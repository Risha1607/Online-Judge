def two_sum(nums, target):
    num_to_index = {}
    for index, num in enumerate(nums):
        complement = target - num
        if complement in num_to_index:
            return [num_to_index[complement], index]
        num_to_index[num] = index
    return []

if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    data = input().split('\n')

    n = int(data[0].strip())  # First line: integer n
    nums = list(map(int, data[1].strip().split()))  # Second line: n integers
    target = int(data[2].strip())  # Third line: integer target

    result = two_sum(nums, target)
    print(' '.join(map(str, result)))
