def zip_with(func, *args):
    if not callable(func):
        raise TypeError('First argument must be a function!')

    if len(args):
        min_len = min([len(a) for a in args])
        for i in range(min_len):
            new_args = [a[i] for a in args]
            yield func(*new_args)
    else:
        yield []
