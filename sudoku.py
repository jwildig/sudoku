import numpy as np
import copy
import time


block_size = 3
max_number = block_size ** 2



class Square:
    def __init__(self):
        self.number = None

    def fill(self, number):
        self.number = number

    def clear(self):
        self.number = None

    def empty(self):
        return self.number is None

class Block:
    def __init__(self):
        self.squares = [[Square() for _ in range(block_size)] for _ in range(block_size)]


class Board:
    def __init__(self):
        self.blocks = [[Block() for _ in range(block_size)] for _ in range(block_size)]

    #@classmethod
    #def f(cls, brd):
    #    self.blocks = brd.blocks

    def __str__(self):
        return '\n'.join([
            ' '.join([str(s.number) if s.number else " " for block in block_row for s in block.squares[SR]]) 
            for block_row in self.blocks for SR in range(block_size)])

    def clear_at_random(self):

        s = Square() # A new square is always empty:

        while s.empty(): # Run until s is not empty
            BR, BC, SR, SC = np.random.randint(block_size, size = 4)
            s = self.blocks[BR][BC].squares[SR][SC]

        print(f"clearing {BR} {BC} {SR} {SC}")
        s.clear()

    def place_number(self, BR, BC, SR, SC, n):
        self.blocks[BR][BC].squares[SR][SC].fill(n)

    def empty_square(self, BR, BC, SR, SC):
        self.blocks[BR][BC].squares[SR][SC].empty()


    def fill_at_random(self):

        first_block = self.blocks[0][0]
        to_place = np.random.permutation(max_number) + 1
        for SR, square_row in enumerate(first_block.squares):
            for SC, square in enumerate(square_row):
                square.fill(to_place[SR * block_size + SC])

        
        self.blocks = self.solve(count = False).board.blocks



    def solve(self, count = True):
        global nsols
        global solution
        global finished

        if count:
            nsols = 0
        else:
            nsols = None

        solution = None
        finished = False

        global times
        times = []

        def backtrack():
            global solution
            global finished
            global nsols

            global times
            global board

            print(board)

            for BR, block_row in enumerate(board.blocks):
                for BC, block in enumerate(block_row):
                    for SR, square_row in enumerate(block.squares):
                        for SC, square in enumerate(square_row):
                            if square.empty():

                                adjacent =  [s.number for sr in block.squares for s in sr if not s.empty()] + \
                                            [s.number for block in block_row for s in block.squares[SR] if not s.empty()] + \
                                            [s.number for block_row in board.blocks for square_row in block_row[BC].squares for s in [square_row[SC]] if not s.empty()]
                                for number in np.random.permutation(max_number) + 1:
                                    # [Numbers in same Block] + [Numbers in same Row] + [Numbers in same Column]
                                    if not number in adjacent:
                                        #start = time.time()
                                        #new_board = copy.deepcopy(board)
                                        #end = time.time()
                                        #times.append(end - start)
                                        board.place_number(BR, BC, SR, SC, number)
                                        backtrack()
                                        board.empty_square(BR, BC, SR, SC)
                                        if finished: return
                                return
            solution = board
            if count: # Continue finding solutions
                nsols += 1
            else: # One solution is enough
                finished = True

        global board

        board = self

        backtrack()
        print(np.mean(times), len(times), np.sum(times))
        return Solution(solution, nsols)


class Solution:
    def __init__(self, board, nsols):
        self.board = board
        self.nsols = nsols


class Puzzle:

    def __init__(self):

        b = Board()
        b.fill_at_random()

        print(b)
        while b.solve(count = True).nsols == 1: # We want a puzzle with a unique solution
        #for _ in range(2):
            self.board = copy.deepcopy(b)
            b.clear_at_random()


    def __str__(self):
        return str(self.board)

if __name__ == '__main__':

    np.random.seed(2)
    p = Puzzle()

    print(p)

