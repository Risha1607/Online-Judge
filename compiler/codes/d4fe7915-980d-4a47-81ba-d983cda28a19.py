import time

def run_indefinitely():
    start_time = time.time()
    while True:
        if time.time() - start_time > 60:  # Ensure it runs for more than 60 seconds
            break

run_indefinitely()

