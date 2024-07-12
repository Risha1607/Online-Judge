def two_sum(nums, target):
    num_to_index = {}
    for i, num in enumerate(nums):
        if target - num in num_to_index:
            return num_to_index[target - num], i
        num_to_index[num] = i
    return None

def main():
    n = int(input())
    nums = list(map(int, input().split()))
    target = int(input())
    result = two_sum(nums, target)
    if result:
        print(result[0], result[1])
    else:
        print("No solution found")

if __name__ == "__main__":
    main();
