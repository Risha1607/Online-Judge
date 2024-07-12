#include <iostream>
#include <unordered_map>
#include <vector>

std::vector<int> twoSum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> num_map; // Map to store number and its index
    
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (num_map.find(complement) != num_map.end()) {
            return {num_map[complement], i}; // Return indices if complement found
        }
        num_map[nums[i]] = i; // Add current number and its index to the map
    }
    
    return {}; // Return an empty vector if no solution found
}

int main() {
    int n, target;
    std::cin >> n;
    std::vector<int> nums(n);
    
    for (int i = 0; i < n; ++i) {
        std::cin >> nums[i];
    }
    std::cin >> target;
    
    std::vector<int> result = twoSum(nums, target);
    
    if (!result.empty()) {
        std::cout << result[0] << " " << result[1] << std::endl;
    } else {
        std::cout << "No solution found" << std::endl;
    }
    
    return 0;
}
