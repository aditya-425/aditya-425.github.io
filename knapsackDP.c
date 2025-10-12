#include <stdio.h> 
#define MAX_ITEMS 100 
#define MAX_CAPACITY 1000 
int max(int a, int b)  
{ 
    return (a > b) ? a : b; 
} 
void knapsack(int weights[], int values[], int numItems, int capacity) 
{ 
    int dp[MAX_ITEMS + 1][MAX_CAPACITY + 1],i,w; 
    for ( i = 0; i <= numItems; i++) 
    { 
        for ( w = 0; w <= capacity; w++)  
       { 
            if (i == 0 || w == 0)  
  { 
                dp[i][w] = 0;
            } else if (weights[i - 1] <= w)  
 { 
               dp[i][w] = max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]); 
            } else  
 { 
                dp[i][w] = dp[i - 1][w]; 
            } 
        } 
    } 
    printf("Maximum value in Knapsack = %d\n", dp[numItems][capacity]); 
    printf("Items included:\n"); 
    w = capacity; 
    for ( i = numItems; i > 0 && dp[i][w] > 0; i--)  
    { 
        if (dp[i][w] != dp[i - 1][w]) 
       { 
            printf("Item %d (Weight: %d, Value: %d)\n", i, weights[i - 1], values[i - 1]); 
            w -= weights[i - 1]; 
        } 
    } 
}
int main()  
{ 
    int numItems, capacity,i; 
    printf("Enter the number of items: "); 
    scanf("%d", &numItems); 
    int weights[MAX_ITEMS]; 
    int values[MAX_ITEMS]; 
    printf("Enter the weights of the items:\n"); 
    for ( i = 0; i < numItems; i++) 
    { 
        scanf("%d", &weights[i]); 
    } 
    printf("Enter the values of the items:\n"); 
    for ( i = 0; i < numItems; i++)  
    { 
        scanf("%d", &values[i]); 
    } 
    printf("Enter the capacity of the knapsack: "); 
    scanf("%d", &capacity); 
    knapsack(weights, values, numItems, capacity); 
    return 0; 
} 
