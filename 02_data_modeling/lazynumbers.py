class Lazy:
    def __init__(self, value):
        self.value = value  # actual number if root node, else str containing operation between self.left and self.right
        self.left = None
        self.right = None

    def __add__(self, other):
        new_lazy = Lazy('+')
        new_lazy.left = self
        new_lazy.right = other
        return new_lazy

    def __radd__(self, other):
        new_lazy = Lazy('+')
        new_lazy.left = self
        new_lazy.right = other
        return new_lazy

    def __sub__(self, other):
        new_lazy = Lazy('-')
        new_lazy.left = self
        new_lazy.right = other
        return new_lazy

    def __rsub__(self, other):
        new_lazy = Lazy('-')
        new_lazy.left = other
        new_lazy.right = self
        return new_lazy

    def __mul__(self, other):
        new_lazy = Lazy('*')
        new_lazy.left = self
        new_lazy.right = other
        return new_lazy

    def __rmul__(self, other):
        new_lazy = Lazy('*')
        new_lazy.left = self
        new_lazy.right = other
        return new_lazy

    def __truediv__(self, other):
        new_lazy = Lazy('/')
        new_lazy.left = self
        new_lazy.right = other
        return new_lazy

    def __rtruediv__(self, other):
        new_lazy = Lazy('/')
        new_lazy.left = other
        new_lazy.right = self
        return new_lazy

    def __floordiv__(self, other):
        new_lazy = Lazy('//')
        new_lazy.left = self
        new_lazy.right = other
        return new_lazy

    def __rfloordiv__(self, other):
        new_lazy = Lazy('//')
        new_lazy.left = other
        new_lazy.right = self
        return new_lazy

    def __mod__(self, other):
        new_lazy = Lazy('%')
        new_lazy.left = self
        new_lazy.right = other
        return new_lazy

    def __rmod__(self, other):
        new_lazy = Lazy('%')
        new_lazy.left = other
        new_lazy.right = self
        return new_lazy

    def __neg__(self):
        new_lazy = Lazy('*')
        new_lazy.left = self
        new_lazy.right = Lazy(-1)
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
        if not isinstance(self.value, str):
            return self.value

        if isinstance(self.left, Lazy):
            left_value = self.left.force()
        else:
            left_value = self.left

        if isinstance(self.right, Lazy):
            right_value = self.right.force()
        else:
            right_value = self.right

        if self.value == '+':
            return left_value + right_value
        if self.value == '-':
            return left_value - right_value
        if self.value == '*':
            return left_value * right_value
        if self.value == '/':
            return left_value / right_value
        if self.value == '//':
            return left_value // right_value
        if self.value == '%':
            return left_value % right_value
