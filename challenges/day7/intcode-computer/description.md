# Opcodes

1 - [a][b][c] - add two numbers (from pos a and b) and write them to pos c
    a) read position one
    b) read position two
    c) write position
2 - [a][b][c] - multiply two numbers (from pos a and b) and write them to pos c
3 - [a] - save input value in position a
4 - [a] - output the value stored in position a
5 - [a][b] - if value of first parameter is non-zero, sets the pointer to the value from second parameter
6 - [a][b] - if value of first parameter is zero, sets the pointer to the value from second parameter
7 - [a][b][c] - if first parameter is less than the second parameter, stores 1 at position in third parameter; otherwise 0
8 - [a][b][c] - if first parameter is equal to the second parameter, stores 1 at position in third parameter; otherwise 0
99 - finish


computer has a memory (the input values)

instruction
instruction parameters
instruction pointer (address of current instruction)



parameter mode: reads right to left; rightmost 2 digits are opcode, next digits are modes of parameters, read right to left
ex: 1002 (same as 01002, but initial zeroes are omitted): 02 is opcode 2, modes of parameters read right to left are 010

```
ABCDE
 1002

DE - two-digit opcode,      02 == opcode 2
 C - mode of 1st parameter,  0 == position mode
 B - mode of 2nd parameter,  1 == immediate mode
 A - mode of 3rd parameter,  0 == position mode,
                                  omitted due to being a leading zero
```
