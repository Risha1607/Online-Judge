def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

def main():
    import sys
    input = sys.stdin.read().strip().split()
    nums = list(map(int, input[:-1]))
    target = int(input[-1])
    
    result = two_sum(nums, target)
    print(result)

if __name__ == "__main__":
    main()
