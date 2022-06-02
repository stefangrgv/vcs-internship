### _> triangle_type
Напишете функция triangle_type, която приема като аргумент страните на триъгълник и връща като разултат типа на триъгълника:

- равностранен
- равнобедрен
- разностранен

```python
def triangle_type(a, b, c):
    if a == b and b == c:
        return "equilateral"
    elif a == b or a == c or b == c:
        return "isosceles"
    else:
        return "multifaceted"
```

### _> Палиндроми
Да се напише функция, която приема 2 думи и проверява дали са палиндроми. Палиндром е дума, която прочетена от ляво на дясно и от дясно на ляво са еднакви.
Думата "невен" е палиндром.

```python
def test_palindromes(a, b):
    reversed_a = a[::-1]
    if reversed_a.lower() == b.lower():
        print('PALINDROMES')
    else:
        print('NOT PALINDROMES')
```

### _> Are two words anagrams?

For anagrams, check here - https://en.wikipedia.org/wiki/Anagram

For example, `listen` and `silent` are anagrams.

The program should read two words from the standard input and output:

* `ANAGRAMS` if the words are anagrams of each other
* `NOT ANAGRAMS` if the two words are not anagrams of each other

**Consider lowering the case of the two words since the case does not matter. `SILENT` and `listen` are also anagrams.**

***примери***
---

Input:

```
TOP_CODER COTO_PRODE
```

Output:

```
NOT ANAGRAMS
```

---

Input:

```
kilata cvetelina_yaneva
```

Output:

```
NOT ANAGRAMS
```

Also, should not make songs together.

---

Input:

```
BRADE BEARD
```

Output:

```
ANAGRAMS
```

```python
def test_anagrams(a, b):
    if sorted(a.lower()) == sorted(b.lower()):
        print('ANAGRAMS')
    else:
        print('NOT ANAGRAMS')
```


### _>  Броят на четните числа от всички в даден списък
Дефинирайте функция `evens_count`, която приема като аргумент списък от цели числа и връща като резултат броя четни числа в него.

```python
def events_counter(input_list):
    even_numbers = 0
    for a in input_list:
        if not isinstance(a, int):
            print('Error: %s is not an integer!'%(a))
            return
        if a%2 == 0:
            even_numbers += 1
    print(even_numbers)
```

### _> Брой на срещания на дадена дума в списък от думи
Дефинирайте функция `words_count`, която приема като аргумент списък от думи и дума, и връща колко пъти се среща думата в списъка.

```python
def words_count(input_list, word):
    occurences = 0
    for current_word in input_list:
        if current_word.lower() == word.lower():
           occurences += 1
    print(occurences)
```

### _> Counting substrings


Implement the function `count_substrings(haystack, needle)`. It returns the count of occurrences of the string `needle` in the string `haystack`.

__Don't count overlapped substings and take case into consideration!__
For overlapping substrings, check the "baba" example below.

```python
def count_substrings(haystack, needle):
    occurences = 0

    current_position = 0
    while current_position + len(needle) <= len(haystack):
        if haystack[current_position : current_position + len(needle)] == needle:
            occurences += 1
            current_position += len(needle)
        else:
            current_position += 1

    print(occurences)
```

***Test examples***

```python
>>> count_substrings("This is a test string", "is")
2
>>> count_substrings("babababa", "baba")
2
>>> count_substrings("Python is an awesome language to program in!", "o")
4
>>> count_substrings("We have nothing in common!", "really?")
0
>>> count_substrings("This is this and that is this", "this")  # "This" != "this"
2
```
