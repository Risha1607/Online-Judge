import time

def time_exceeding_function(n):
    total = 0
    for i in range(n):
        for j in range(n):
            for k in range(n):
                total += i * j * k
    return total

# Simulate input through stdin
if __name__ == "__main__":
    import sys
    input = sys.stdin.read
    n = int(input().strip())
    result = time_exceeding_function(n)
    print(result)


