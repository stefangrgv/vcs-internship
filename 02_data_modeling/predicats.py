import operator
import functools

class Predicate:
    def __init__(self, func):
        self.func = func

    def __call__(self, x):
        return self.func(x)

    def __and__(self, other):
        return lambda x: self(x) and other(x)

    def __rand__(self, other):
        return lambda x: self(x) and other(x)

    def __or__(self, other):
        return lambda x: self(x) or other(x)

    def __ror__(self, other):
        return lambda x: self(x) or other(x)

    def __invert__(self):
        return lambda x: not self(x)

    def __rshift__(self, other):
        return lambda x: not self(x) or other(x)

def gt(x):
    return Predicate(lambda n: n > x)

def lt(x):
    return Predicate(lambda n: n < x)

def eq(x):
    return Predicate(lambda n: n == x)

def oftype(x):
    return Predicate(lambda n: isinstance(n, x))

def present():
    return Predicate(lambda n: n is not None)

def pred(function):
    return Predicate(lambda n: function(n))

def for_any(*predicates):
    return functools.reduce(operator.or_, predicates)

def for_all(*predicates):
    return functools.reduce(operator.and_, predicates)
