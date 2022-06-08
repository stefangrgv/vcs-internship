class Predicate:
    def __init__(self, func, argument=()):
        self.func = func
        self.argument = argument

    def __call__(self, arg):
        return self.func(arg)

    def __and__(self, other):
        return Predicate(func = lambda x: (self.func(x) * other.func(x)), argument=self.argument)

    def __or__(self, other):
        return Predicate(func = lambda x: (self.func(x) + other.func(x)), argument=self.argument)

    def __invert__(self):
        return Predicate(func = lambda x: not self.func(x), argument = self.argument)

    def __rshift__(self, other):
        return Predicate(func = lambda x: (not self.func(x)) + other.func(x), argument=self.argument)

def gt(x):
    return Predicate(lambda n: n > x, x)

def lt(x):
    return Predicate(lambda n: n < x, x)

def eq(x):
    return Predicate(lambda n: n == x, x)

def oftype(x):
    return Predicate(lambda n: isinstance(n, x), x)

def present():
    return Predicate(lambda n: n is not None)

def pred(function):
    return Predicate(lambda n: bool(function(n)))

def for_any(*predicates):
    result = predicates[0]
    for pred in predicates[1:]:
        result = result | pred

    return result

def for_all(*predicates):
    result = predicates[0]
    for pred in predicates[1:]:
        result = result & pred

    return result