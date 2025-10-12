#include <stdio.h> 
#include <stdlib.h> 
#include <limits.h> 
#define MAX 100 
typedef struct { 
    int vertices; 
    int adj[MAX][MAX]; 
} Graph; 
int disc[MAX], low[MAX], parent[MAX], time; 
int bccCount = 0; 
void initGraph(Graph *g, int v)  
{ 
    g->vertices = v; 
    int i,j; 
    for ( i = 0; i < v; i++) 
        for ( j = 0; j < v; j++) 
            g->adj[i][j] = 0; 
} 
void addEdge(Graph *g, int u, int v)  
{ 
    g->adj[u][v] = 1; 
    g->adj[v][u] = 1; 
}  
void bccUtil(Graph *g, int u)  
{ 
    disc[u] = low[u] = ++time; 
    int children = 0,v,i; 
    for ( v = 0; v < g->vertices; v++)  
{ 
        if (g->adj[u][v]) { 
            if (disc[v] == -1)  
{       
                parent[v] = u; 
                children++; 
                bccUtil(g, v); 
                  low[u] = (low[u] < low[v]) ? low[u] : low[v]; 
                if ((parent[u] == -1 && children > 1) || (parent[u] != -1 && low[v] >= disc[u]))  
{ 
                    bccCount++; 
                    printf("Biconnected Component %d: ", bccCount); 
                    for ( i = 0; i < g->vertices; i++) { 
                        if (low[i] == low[v] || low[i] == low[u])  
{ 
                            printf("%d ", i); 
                        } 
                    } 
                    printf("\n"); 
                } 
            } else if (v != parent[u]) { 
                low[u] = (low[u] < disc[v]) ? low[u] : disc[v]; 
            } 
        } 
    } 
} 
void findBiconnectedComponents(Graph *g)  
{ 
    time = 0; 
    int i; 
    for (i = 0; i < g->vertices; i++)  
   { 
        disc[i] = -1; 
        low[i] = -1; 
        parent[i] = -1; 
    } 
    for ( i = 0; i < g->vertices; i++)  
   { 
        if (disc[i] == -1)  
       { 
            bccUtil(g, i); 
        } 
    } 
} 
int main()  
 { 
    Graph g; 
    initGraph(&g, 5); 
    addEdge(&g, 0, 1); 
    addEdge(&g, 1, 2);
     addEdge(&g, 2, 0); 
    addEdge(&g, 1, 3); 
    addEdge(&g, 3, 4); 
    printf("Biconnected Components in the given graph:\n"); 
    findBiconnectedComponents(&g); 
    return 0; 
}
