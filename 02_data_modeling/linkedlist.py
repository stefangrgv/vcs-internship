class Iterator:
    def __init__(self, head):
        self.current = head

    def __iter__(self):
        return self

    def __next__(self):
        if self.current == nil:
            raise StopIteration
        else:
            item = self.current.data
            self.current = self.current.next
            return item

class Cons:
    def __init__(self, data, next):
        self.data = data
        self.next = next

    def __iter__(self):
        return Iterator(self)

    def get_list(self):
        return [d for d in self]

    def __repr__(self):
        return '<' + ', '.join([str(s) for s in self.get_list()]) + '>'


class List:
    def __init__(self, *args):
        llist_length = 1
        next_node = Cons(args[-1], nil)
        for node in list(reversed(args))[1:]:
            llist_length += 1
            next_node = Cons(node, next_node)
        self.head = next_node
        self.length = llist_length

    def create(*args):
        return List(*args)

    def get_list(self):
        return self.head.get_list()

    def __repr__(self):
        return '<'+ ', '.join([str(d) if (self.length > 1) else '' for d in self]) + '>'

    def __iter__(self):
        self.n = 0
        return self

    def __next__(self):
        try:
            result = self[self.n]
        except IndexError:
            raise StopIteration
        self.n += 1
        return result


    def __getitem__(self, item):
        if item >= self.length:
            raise IndexError('Index {} is out of bounds for LinkedList of length {}'.format(item, self.length))

        if item < 0:
            if -item > self.length:
                raise IndexError(
                    'Index {} is out of bounds for LinkedList of length {}'.format(item, self.length))
            else:
                item = self.length + item

        current = 0
        data = self.head.data
        next = self.head.next
        while current != item:
            data = next.data
            next = next.next
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
