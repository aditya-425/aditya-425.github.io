#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#define MAX_NODES 100
void bft(int graph[MAX_NODES][MAX_NODES], 
int start, int num_nodes) {
bool visited[MAX_NODES] = { false };
int queue[MAX_NODES], front = 0, rear = 0,i;
visited[start] = true;
queue[rear++] = start;
while (front < rear) {
int node = queue[front++];
printf("Visited %d\n", node);
for ( i = 0; i <num_nodes; i++) {
if (graph[node][i] == 1 && !visited[i]) { 
visited[i] = true;
queue[rear++] = i;
            }
        }
    }
}
int main() {
int graph[MAX_NODES][MAX_NODES];
int num_nodes, num_edges,i,j;
for ( i = 0; i < MAX_NODES; i++) {
for ( j = 0; j < MAX_NODES; j++) {
graph[i][j] = 0;
        }
    }
printf("Enter the number of nodes: ");
scanf("%d", &num_nodes);
printf("Enter the number of edges: ");
scanf("%d", &num_edges);
printf("Enter the edges (format: start end):\n");
for ( i = 0; i <num_edges; i++) {
int start, end;	
scanf("%d %d", &start, &end);
graph[start][end] = 1; 
graph[end][start] = 1; 
    }
int start_node;
printf("Enter the start node for BFT: ");
scanf("%d", &start_node);
printf("BFT traversal starting from node %d:\n", start_node);
bft(graph, start_node, num_nodes);
return 0;
}
