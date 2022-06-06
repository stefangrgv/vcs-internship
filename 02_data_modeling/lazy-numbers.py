class Lazy:
    def __init__(self, value, left=None, right=None, operator=None, opposite=False):
        self.value = value
        self.left = left
        self.right = right
        self.operator = operator
        self.opposite = opposite

    def __add__(self, other):
        return Lazy(value=None, left=self, right=other, operator='+')

    def __sub__(self, other):
        return Lazy(value=None, left=self, right=other, operator='-')

    def __mul__(self, other):
        return Lazy(value=None, left=self, right=other, operator='*')

    def __truediv__(self, other):
        return Lazy(value=None, left=self, right=other, operator='/')

    def __floordiv__(self, other):
        return Lazy(value=None, left=self, right=other, operator='//')

    def __mod__(self, other):
        return Lazy(value=None, left=self, right=other, operator='%')

    def __neg__(self):
        new_opposite = not self.opposite
        return Lazy(value=self.value, left=self.left, right=self.right, operator=self.operator, opposite=new_opposite)

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


lazy_int_1 = Lazy(1)
lazy_int_2 = Lazy(2)

# testing binary operators
# lazy number and normal number
mix_lazy_add = lazy_int_1 + 3
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

