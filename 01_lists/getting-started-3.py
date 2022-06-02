def test_anagrams(a, b):
    if sorted(a.lower()) == sorted(b.lower()):
        return 'ANAGRAMS'
    else:
        return 'NOT ANAGRAMS'

