class Cons:
    def __init__(self, data, next):
        self.data = data
        self.next = next

    def get_list(self):
        data, next = self.data, self.next
        if data == nil:
            return list()

        llist = [data]
        while next != nil:
            llist.append(next.data)
            next = next.next
        return llist

    def __repr__(self):
        return '<' + ', '.join([str(s) for s in self.get_list()]) + '>'


class List:
    def __init__(self, *args):
        next_node = Cons(args[-1], nil)
        for n in range(len(args)-2, -1, -1):
            next_node = Cons(args[n], next_node)
        self.head = next_node

    def create(*args):
        return List(*args)

    def get_list(self):
        return self.head.get_list()

    def __repr__(self):
        return str(self.head)

    def __iter__(self):
        data, next = self.head.data, self.head.next
        yield data
        while next != nil:
            data, next = next.data, next.next
            yield data


    def __getitem__(self, item):
        len_llist = len(self.get_list())
        if item >= len_llist:
            raise IndexError('Index {} is out of bound for LinkedList of length {}'.format(item, len_llist))

        if item < 0:
            item = len_llist - item - 2

        current = 0
        data, next = self.head.data, self.head.next
        while current != item:
            data, next = next.data, next.next
            current += 1
        return data

nil = "?"

def make_list(*items):
    llist = Cons(items[-1], nil)
    for i in items[-2::-1]:
        llist = Cons(i, llist)
    return llist

"""
Create a linked list with idiomatic python interface

Creation
========

    >>> l = Cons(1, Cons(2, Cons(3, Cons(4, Cons(5, nil)))))
    >>> l
    <1, 2, 3, 4, 5>
    >>> l = make_list(1, 2, 3, 4, 5)
    >>> l
    <1, 2, 3, 4, 5>

Iteration
=========

    >>> [li + 1 for li in l]
    [2, 3, 4, 5, 6]

Indexing:
=========

    >>> l[1]
    2
    >>> l[-2]
    4

"""


if __name__ == "__main__":
    import doctest

    doctest.testmod()
