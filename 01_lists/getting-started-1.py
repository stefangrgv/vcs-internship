def triangle_type(a, b, c):
    if a == b == c:
        return("equilateral")
    elif a == b or a == c or b == c:
        return("isosceles")
    else:
        return("multifaceted")
