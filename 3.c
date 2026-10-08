#include<stdio.h>
#include<conio.h>
int a[20][20], q[20], visited[20], n, i, j, f = 0, r = -1;
// BFS function to traverse the graph starting from vertex `v`
void bfs(int v) {
// Mark the current vertex as visited
visited[v] = 1;
q[++r] = v;
// Perform BFS traversal
while (f <= r) {
v = q[f++]; // Get the front of the queue and increment the front index
// Explore all adjacent vertices of the dequeued vertex
for (i = 1; i <= n; i++){
// If an adjacent vertex is found and it is not visited
if (a[v][i] == 1 && !visited[i])
{
q[++r] = i; // Add adjacent vertex to the queue
visited[i] = 1; // Mark it as visited
}  }  }  }
int main() {
int v;
// clrscr();
// Input: number of vertices
printf("\nEnter the number of vertices:");
scanf("%d", &n);
for (i = 1; i <= n; i++)  {
q[i] = 0; // Initialize the queue array
visited[i] = 0; // Mark all vertices as not visited  }
printf("\nEnter graph data in matrix form:\n");
for (i = 1; i <= n; i++) {
for (j = 1; j <= n; j++) {
scanf("%d", &a[i][j]);
}  }
printf("\nEnter the starting vertex:");
scanf("%d", &v);
bfs(v);
printf("\nThe nodes which are reachable are:\n");
for (i = 1; i <= n; i++) {
if (visited[i])  {
printf("%d\t", i);
}  }
if (r == -1)  {
printf("\nBFS is not possible.");  }
getch();  }
