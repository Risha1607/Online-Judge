#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> num_to_index;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (num_to_index.find(complement) != num_to_index.end()) {
            return {num_to_index[complement], i};
        }
        num_to_index[nums[i]] = i;
    }
    return {};
}

int main() {
    int n, target;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    cin >> target;
    vector<int> result = twoSum(nums, target);
    if (!result.empty()) {
        cout << result[0] << " " << result[1] << endl;
    }
    return 0;
}
