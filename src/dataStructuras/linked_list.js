class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    header = null;
    tail = null;
    uppend(data) {
        if(this.header === null) {
            const node = new Node(data);
            this.header = node;
            this.tail = node;
            return this;
        }

        const node = new Node(data, data);
        this.tail.next = node;
        this.tail = node;
        return this;
    }

    prepend(data) {
        if(this.header === null) {
            const node = new Node(data);
            this.header = node;
            this.tail = node;
            return this;
        }

        const node = new Node(data, data);
        this.tail.next = node;
        this.tail = node;
        return this;
    }
}
