with open("sqrt3file.txt", "rb") as binary_file:
    st = binary_file.read()
    str = ' '.join(format(ord(x), 'b') for x in st)
    print(str)
