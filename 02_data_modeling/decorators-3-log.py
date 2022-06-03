from datetime import datetime as dt

def log(file_name):
    def decorator_outer(fn):
        def decorator_inner():
            with open(file_name, 'a') as f:
                f.write('function {} was called at {}\n'.format(fn.__name__, dt.now()))
            return fn()
        return decorator_inner
    return decorator_outer
