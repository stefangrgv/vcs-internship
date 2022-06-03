def double(x):
    return 2 * x

def iterate(func):
    def identity(x):
        return x

    def run_nested_function(x):
        result = func(x)
        for n in range(1, i):
            result = func(result)
        return result

    i = 0
    while True:
        if i == 0:
            yield identity
        else:
            yield run_nested_function
        i += 1

i = iterate(double)
f = next(i)
print(f(3))
f = next(i)
print(f(3))
f = next(i)
print(f(3))
f = next(i)
print(f(3))