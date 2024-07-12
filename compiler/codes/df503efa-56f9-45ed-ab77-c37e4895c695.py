# memory_exceeding_function.py

def memory_exceeding_function():
    large_list = []
    while True:
        large_list.append('a' * 10*7)  # Append 1 million characters to the list

if __name__ == "__main__":
    memory_exceeding_function()


