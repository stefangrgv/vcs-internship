class Lazy:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
        self.operator = None
        self.opposite = False

    def __add__(self, other):
        new_lazy = Lazy(None)
        new_lazy.left = self
        new_lazy.right = other
        new_lazy.operator = '+'
        return new_lazy

    def __radd__(self, other):
        new_lazy = Lazy(None)
        new_lazy.left = self
        new_lazy.right = other
        new_lazy.operator = '+'
        return new_lazy

    def __sub__(self, other):
        new_lazy = Lazy(None)
        new_lazy.left = self
        new_lazy.right = other
        new_lazy.operator = '-'
        return new_lazy

    def __rsub__(self, other):
        new_lazy = Lazy(None)
        new_lazy.left = other
        new_lazy.right = self
        new_lazy.operator = '-'
        return new_lazy

    def __mul__(self, other):
        new_lazy = Lazy(None)
        new_lazy.left = self
        new_lazy.right = other
        new_lazy.operator = '*'
        return new_lazy

    def __rmul__(self, other):
        new_lazy = Lazy(None)
        new_lazy.left = self
        new_lazy.right = other
        new_lazy.operator = '*'
        return new_lazy

    def __truediv__(self, other):
        new_lazy = Lazy(None)
        new_lazy.left = self
        new_lazy.right = other
        new_lazy.operator = '/'
        return new_lazy

    def __rtruediv__(self, other):
        new_lazy = Lazy(None)
        new_lazy.left = other
        new_lazy.right = self
        new_lazy.operator = '/'
        return new_lazy

    def __floordiv__(self, other):
        new_lazy = Lazy(None)
        new_lazy.left = self
        new_lazy.right = other
        new_lazy.operator = '//'
        return new_lazy

    def __rfloordiv__(self, other):
        new_lazy = Lazy(None)
        new_lazy.left = other
        new_lazy.right = self
        new_lazy.operator = '//'
        return new_lazy

    def __mod__(self, other):
        new_lazy = Lazy(None)
        new_lazy.left = self
        new_lazy.right = other
        new_lazy.operator = '%'
        return new_lazy

    def __rmod__(self, other):
        new_lazy = Lazy(None)
        new_lazy.left = other
        new_lazy.right = self
        new_lazy.operator = '%'
        return new_lazy

    def __neg__(self):
        new_lazy = Lazy(self.value)
        new_lazy.left = self.left
        new_lazy.right = self.right
        new_lazy.operator = self.opposite
        new_lazy.opposite = not self.opposite
        return new_lazy

    def __pos__(self):
        return self

    def __bool__(self):
        return bool(self.force())

    def __str__(self):
        return str(self.force())

    def __float__(self):
        return float(self.force())

    def __int__(self):
        return int(self.force())

    def force(self):
        if self.value is not None:
            result = self.value
            if self.opposite:
                result *= -1
            return result

        if isinstance(self.left, Lazy):
            left_value = self.left.force()
            if self.left.opposite:
                left_value *= -1
        else:
            left_value = self.left

        if isinstance(self.right, Lazy):
            right_value = self.right.force()
            if self.right.opposite:
                right_value *= -1
        else:
            right_value = self.right

        if self.operator == '+':
            return left_value + right_value
        if self.operator == '-':
            return left_value - right_value
        if self.operator == '*':
            return left_value * right_value
        if self.operator == '/':
            return left_value / right_value
        if self.operator == '//':
            return left_value // right_value
        if self.operator == '%':
            return left_value % right_value

'''
lazy_int_1 = Lazy(1)
lazy_int_2 = Lazy(2)

# testing binary operators
# lazy number and normal number
mix_lazy_add = lazy_int_1 + 3
assert mix_lazy_add.force() == 4, 'Error in adding a lazy number and an int'

mix_lazy_add = 3 + lazy_int_1
assert mix_lazy_add.force() == 4, 'Error in adding a lazy number and an int'

# lazy numbers of lazy numbers
lazy_add = lazy_int_1 + lazy_int_2
assert lazy_add.force() == 3, 'Error in lazy +'

lazy_sub = lazy_int_1 - lazy_int_2
assert lazy_sub.force() == -1, 'Error in lazy -'

lazy_mul = lazy_int_1 * lazy_int_2
assert lazy_mul.force() == 2, 'Error in lazy *'

lazy_div = lazy_int_1 / lazy_int_2
assert lazy_div.force() == 0.5, 'Error in lazy /'

lazy_floor_div = lazy_int_1 // lazy_int_2
assert lazy_floor_div.force() == 0, 'Error in lazy //'

lazy_mod = lazy_int_1 % lazy_int_2
assert lazy_mod.force() == 1, 'Error in lazy %'

# a lazy number of lazy numbers of lazy numbers
lazy_mul_of_add = lazy_mul * lazy_add
assert lazy_mul_of_add.force() == 6, 'Error in operations of lazy numbers of lazy numbers'

# testing unary operators
lazy_neg = -lazy_int_1
assert lazy_neg.force() == -1, 'Error in unary -'

lazy_pos = +lazy_int_1
assert lazy_pos.force() == 1, 'Error in unary +'

#testing bool, float, str, int
lazy_zero = Lazy(0)
assert bool(lazy_int_1) == True, 'Error in bool method!'
assert bool(lazy_zero) == False, 'Error in bool method!'
assert str(lazy_int_1) == '1', 'Error in str method!'
assert float(lazy_int_1) == 1.0, 'Error in float method!'
assert int(lazy_int_1) == 1, 'Error in int method!'
'''