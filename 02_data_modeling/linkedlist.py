class Cons:
    def __init__(self, data, next):
        self.data = data
        self.next = next

    def to_list(self):
        data, next = self.data, self.next
        as_list = [data]
        while next != nil:
            as_list.append(next.data)
            next = next.next
        return as_list

    def __repr__(self):
        as_list = self.to_list()
        str_repr = '<'
        for n, item in enumerate(as_list):
            if n < len(as_list)-1:
                str_repr += '{}, '.format(item)
            else:
                str_repr += '{}>'.format(item)
        return str_repr

    def __iter__(self):
        as_list = self.to_list()
        for i in range(len(as_list)):
            yield as_list[i]

    def __getitem__(self, item):
        as_list = self.to_list()
        return as_list[item]

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
