##Jarvis Fosdick
##April, 2010
##writes a file with lines of square roots etc.
##

Sqrt5File = open('decimal-strings/sqrt7File25000.txt', "w")
from decimal import *
getcontext().prec = 25000
line = Decimal(7).sqrt()

for x in str(line):

    print >> Sqrt5File, x

Sqrt5File.close()
