def main():
    import sys
    input = sys.stdin.read().strip().split()
    
    n = int(input[0])
    nums = list(map(int, input[1:n+1]))
    target = int(input[n+1])
    
    # Naive O(n^2) solution
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                print(i, j)
                return
    i
    
    print("No solution found")

# Generate a large input to test time limit exceeded
if __name__ == "__main__":
    main()
