#include <stdio.h>

int main() {
    int size, sent = 0, ack, I;

    printf("Enter number of frames to be transferred: ");
    scanf("%d", &size);

    while (sent < size) {
        printf("Frame %d has been transmitted\n", sent);

        while (1) {
            printf("Enter your choice:\n");
            printf("1. For ACK\n");
            printf("2. For NACK\n");
            printf("Choice: ");
            scanf("%d", &ack);

            if (ack == 1) {
                printf("The frame %d has been acknowledged\n", sent);
                break;
            }
            else if (ack == 2) {
                printf("The frame %d has not been acknowledged, retransmitting...\n", sent);
                continue;
            }
            else {
                printf("Invalid choice. Please enter your choice:\n");
                printf("1. For ACK\n");
                printf("2. For NACK\n");
            }
        }

        sent++;
    }

    printf("All frames have been transmitted and acknowledged.\n");

    return 0;
}
