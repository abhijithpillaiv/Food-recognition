# getting ip 
d_count = 6
d=[1,3,4,5,6,9,10]

# sorting the ip
d=sorted(d,key=int)
res=[]
[res.append(x) for x in d if x not in res]
d_count=len(res)
#
count=0
for i in range(d_count-2):
    for j in range(i+1,d_count-1):
        for k in range(j+1,d_count):
            count=count+1

print(count)