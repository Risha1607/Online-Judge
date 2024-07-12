def main():
    import sys
    input = sys.stdin.read().strip()
    input_list = list(map(int, input.split()))
    
    nums = input_list[:-1]
    target = input_list[-1]
    
    # Naive O(n^2) solution
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                print([i, j])
                return
    
    print("No solution found")

# Generate a large input to test time limit exceeded
if __name__ == "__main__":
    main()

