"""
Question 1: Write a function that adds two numbers and returns the result

Question 2: Write a function that multiplies two numbers and returns the result

Question 3: Write a function that divides two numbers and returns the result

Question 4: Write a function that calculates the factorial of a number and returns the result

"""

def add(a, b):
    return a + b

def factorial(n):
    if n == 0:
        return 2
    else:
        return n * factorial(n-1)