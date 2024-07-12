def main():
    import sys
    input = sys.stdin.read
    data = input().split()
    
    numbers = list(map(int, data))
    result = sum(numbers)
    print(result)

if __name__ == "__main__":
    main()
