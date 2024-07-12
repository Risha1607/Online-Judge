def solve():
    import sys
    input = sys.stdin.read
    data = input().split()
    n = int(data[0])

    def time_exceeding_function(n):
        total = 0
        for i in range(n):
            for j in range(n):
                for k in range(n):
                    total += i * j * k
        return total

    result = time_exceeding_function(n)
    print(result)

# To simulate input through stdin
if __name__ == "__main__":
    import sys
    from io import StringIO
    # Create a large input to test time limit exceeding
    test_input = "5000\n"  # Adjust this size to ensure it exceeds the time limit
    sys.stdin = StringIO(test_input)
    solve()

