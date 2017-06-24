##Jarvis Fosdick
##April, 2010
##writes a file with lines of square roots etc.
##

Sqrt5File = open('decimal-strings/sqrt5File75000.txt', "w")
from decimal import *
getcontext().prec = 75000
line = Decimal(5).sqrt()

for x in str(line):

    print >> Sqrt5File, x

Sqrt5File.close()
