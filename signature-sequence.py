import math
i = 1
j = 1
R = math.sqrt(2)
#R = (1+math.sqrt(5))/2
#R= math.e
#R=math.pi
S = []
D = []
SigFile = open('decimal-strings/sig26.txt', "w")

for i in range(1, 27):
    for j in range(1, 27):
        S.append((i, i+(j*R)))



S.sort(key=lambda x: x[1])
for i in S:
    D.append(i[0])
    print >> SigFile, i[0]


SigFile.close()
