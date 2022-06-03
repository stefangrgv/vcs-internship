def encrypt(step_key):
    if not isinstance(step_key, int):
        raise TypeError('Step key must be of type integer!')

    def decorator_outer(fn):
        def decorator_inner():
            txt = fn()
            result = ''
            for i in range(len(txt)):
                char = txt[i]
                #uppercase
                if char == ' ':
                    result += ' '
                elif char.isupper():
                    result += chr((ord(char) + step_key - 65) % 26 + 65)
                #lowercase
                else:
                    result += chr((ord(char) + step_key - 97) % 26 + 97)
            return result
        return decorator_inner
    return decorator_outer
