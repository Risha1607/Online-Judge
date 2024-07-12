class Solution:
    def reverseList(self, lst):
        return lst[::-1]

if __name__ == "__main__":
    import sys
    input = sys.stdin.read().strip()
    if input:
        input_list = list(map(int, input.split()))
    else:
        input_list = []
    
    solution = Solution()
    reversed_list = solution.reverseList(input_list)
    print(" ".join(map(str, reversed_list)))
