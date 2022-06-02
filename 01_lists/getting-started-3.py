def is_anagrams():
    a, b = input('Enter first word: '), input('Enter second word: ')

    return sorted(a.lower()) == sorted(b.lower())
