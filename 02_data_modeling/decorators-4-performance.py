from datetime import datetime as dt

def performance(file_name):
    def decorator_outer(fn):
        def decorator_inner():
            time_start = dt.now()
            function_result = fn()
            execution_time = (dt.now() - time_start).total_seconds()
            with open(file_name, 'a') as f:
                f.write('function {} was called and took {} seconds to complete\n'.format(fn.__name__, execution_time))
            return function_result
        return decorator_inner
    return decorator_outer
