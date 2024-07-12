class Solution:
    def isValid(self, s: str) -> bool:
        # Dictionary to hold the mapping of closing and opening brackets
        bracket_map = {')': '(', '}': '{', ']': '['}
        # Stack to hold the opening brackets
        stack = []

        for char in s:
            if char in bracket_map:
                # Pop the topmost element from the stack if it's not empty, otherwise assign a dummy value
                top_element = stack.pop() if stack else '#'
                # Check if the popped element matches the corresponding opening bracket
                if bracket_map[char] != top_element:
                    return False
            else:
                # Push the current opening bracket onto the stack
                stack.append(char)

        # Return True if the stack is empty, otherwise False
        return not stack

# Example usage
if __name__ == "__main__":
    solution = Solution()