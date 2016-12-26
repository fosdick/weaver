##Jarvis Fosdick
##April, 2010
##writes a file with lines of square roots etc.
##

Sqrt5File = open('decimal-strings/sqrt31File.txt', "w")
from decimal import *
getcontext().prec = 2500
line = Decimal(31).sqrt()

for x in str(line):

    print >> Sqrt5File, x

Sqrt5File.close()
