for blockY in range(3): 
    for blockX in range(3): 
        print("<table class = 'block'>") 
        for Y in range(3): 
            print("    <tr>") 
            for X in range(3): 
                print("        <td id={}{}{}{} class='box'></div>".format(blockY, blockX, Y, X)) 
            print("    </tr>")     
        print("</table>")
