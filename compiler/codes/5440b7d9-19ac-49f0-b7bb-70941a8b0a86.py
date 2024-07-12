def coinChange(coins, amount):
    # Create an array dp where dp[i] will be storing the minimum number of coins required for i value
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # Base case: If amount is 0, then 0 coins are required

    # Compute minimum coins required for all values from 1 to amount
    for coin in coins:
        for i in range(coin, amount + 1):
            if dp[i - coin] != float('inf'):
                dp[i] = min(dp[i], dp[i - coin] + 1)

    # If dp[amount] is still inf, it means we cannot make the amount with given coins
    return dp[amount] if dp[amount] != float('inf') else -1

def main():
    # Read the input
    n = int(input().strip())
    coins = list(map(int, input().strip().split()))
    amount = int(input().strip())
    
    # Get the result from coinChange function
    result = coinChange(coins, amount)
    
    # Print the result
    print(result)

if __name__ == "__main__":
    main()
