def events_counter(input_list):
    even_numbers = 0
    for a in input_list:
        if not isinstance(a, int):
            raise TypeError('%s is not an integer!'%(a))
        if a%2 == 0:
            even_numbers += 1
    return even_numbers