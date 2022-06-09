import operator

class Predicate:
    def __init__(self, func, argument=()):
        self.func = func
        self.argument = argument

    def __call__(self, arg):
        return self.func(arg)

    def __and__(self, other):
        return lambda x: self.func(x) * other.func(x)

    def __or__(self, other):
        return lambda x: self.func(x) + other.func(x)

    def __invert__(self):
        return lambda x: not self.func(x)

    def __rshift__(self, other):
        return lambda x: not self.func(x) + other.func(x)

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

def constructor(f, g, op):
    return lambda x: op(f(x), g(x))

def for_any(*predicates):
    result = predicates[0]
    for pred in predicates[1:]:
        result = constructor(pred.func, result, operator.add)

    return result

def for_all(*predicates):
    result = predicates[0].func
    for pred in predicates[1:]:
        result = constructor(pred.func, result, operator.mul)

    return result
