#include<stdio.h>
#include<stdlib.h>
#define MAX_SIZE 100
void maxHeapify(int arr[], int n, int i);
void insertMaxHeap(int arr[], int* size, int value);
void deleteMaxHeap(int arr[],int* size);
void displayHeap(int arr[], int size);
void maxHeapify(int arr[], int n, int i)
{
    int largest = i;
    int left = 2*i + 1;
    int right = 2*i + 2;
    if (left < n && arr[left] > arr[largest])
        largest = left;
    if (right < n && arr[right] > arr[largest])
        largest = right;
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        maxHeapify(arr, n, largest);
    }
}
void insertMaxHeap(int arr[], int* size, int value) 
{
    if (*size >= MAX_SIZE) 
	{
        printf("Heap is full!\n");
        return;
    }
    int i = (*size)++;
    arr[i] = value;
    while (i != 0 && arr[(i - 1) / 2] < arr[i]) 
	{
        int temp = arr[i];
        arr[i] = arr[(i - 1) / 2];
        arr[(i - 1) / 2] = temp;
        i = (i - 1) / 2;
    }
}
void deleteMaxHeap(int arr[], int* size) 
{
    if (*size <= 0)
	{
        printf("Heap is empty!\n");
        return;
    }
    if (*size == 1) 
	{
        (*size)--;
        return;
    }
    arr[0] = arr[--(*size)];
    maxHeapify(arr, *size, 0);
}
void displayHeap(int arr[], int size)
{
	int i;
    for (i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\n");
}
    int main() {
    int heap[MAX_SIZE];
    int size = 0;
    insertMaxHeap(heap, &size,10);
    insertMaxHeap(heap, &size,5);
    insertMaxHeap(heap, &size,20);
    insertMaxHeap(heap, &size,15);
    insertMaxHeap(heap, &size,30);
    insertMaxHeap(heap, &size,2); 
    insertMaxHeap(heap, &size,18); 
    insertMaxHeap(heap, &size,80);
    insertMaxHeap(heap, &size,55);
    insertMaxHeap(heap, &size,44);
    insertMaxHeap(heap, &size,22);
    printf("Max-Heap content:\n");
    displayHeap(heap, size);
    deleteMaxHeap(heap,&size);
    printf("Max-Heap after deletion:\n");
    displayHeap(heap,size);
    return 0;
}
