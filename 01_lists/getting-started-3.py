def is_anagrams():
    a = input('Enter first word: ')
    b = input('Enter second word: ')

    if sorted(a.lower()) == sorted(b.lower()):
        return True
    else:
        return False
