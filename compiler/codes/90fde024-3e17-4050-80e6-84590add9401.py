# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        prev = None
        current = head
        if head is None:
            return None
        while current:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node
        
        return prev

# Helper functions to create and print the linked list
def create_linked_list(lst):
    head = ListNode(lst[0])
    current = head
    for value in lst[1:]:
        current.next = ListNode(value)
        current = current.next
    return head

def print_linked_list(head):
    current = head
    while current:
        print(current.val, end=" -> ")
        current = current.next
    print("None")

# Example usage:
if __name__ == "__main__":
    # Create a linked list [1, 2, 3, 4, 5]
    head = create_linked_list([1, 2, 3, 4, 5])
    print("Original linked list:")
    print_linked_list(head)
    
    # Reverse the linked list
    solution = Solution()
    reversed_head = solution.reverseList(head)
    
    # Print the reversed linked list
    print("Reversed linked list:")
    print_linked_list(reversed_head)
