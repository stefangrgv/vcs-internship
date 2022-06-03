def double(x):
    return 2 * x

def iterate(func):
    i = 0
    def run_nested_function(*args):
        if i == 0:
            return args[0]
        else:
            result = func(*args)
            for n in range(1, i):
                result = func(result)
            return result

    while True:
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