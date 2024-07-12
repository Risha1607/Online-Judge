def simple_test():
    try:
        for i in range(1000000):  # Adjust this number
            if i % 100000 == 0:
                print(i)
    except Exception as e:
        print(f"Error occurred: {e}")

simple_test()
