class CodeProcessor
{
  constructor()
  {
    this._array = [];
    this._lastTime = null;
  }

/**
 * Used to translate a letter of the alphabet into the tap code
 * @param  {string} char    A singular letter
 * @return {object}         An object containing a row and col property that is
 *                          indicative of the position in the code table
 */
  static char2Code(char) {
    switch(char) {
      case "a": return {row: 1, col: 3}; break;
      case "b": return  {row: 5, col: 2}; break;
      case "c": return  {row: 2, col: 5}; break;
      case "d": return  {row: 1, col: 5}; break;
      case "e": return  {row: 1, col: 1}; break;
      case "f": return  {row: 3, col: 4}; break;
      case "g": return  {row: 4, col: 3}; break;
      case "h": return  {row: 3, col: 2}; break;
      case "i": return  {row: 2, col: 2}; break;
      case "j": return  {row: 1, col: 1}; break;
      //debug
      //case "j": return  {row: 4, col: 5}; break;
      case "l": return  {row: 4, col: 1}; break;
      case "m": return  {row: 3, col: 3}; break;
      case "n": return  {row: 1, col: 4}; break;
      case "o": return  {row: 2, col: 1}; break;
      case "p": return  {row: 3, col: 5}; break;
      case "q": return  {row: 5, col: 4}; break;
      case "r": return  {row: 2, col: 3}; break;
      case "s": return  {row: 3, col: 1}; break;
      case "t": return  {row: 1, col: 2}; break;
      case "u": return  {row: 2, col: 4}; break;
      case "v": return  {row: 4, col: 4}; break;
      case "w": return  {row: 5, col: 1}; break;
      case "x": return  {row: 5, col: 3}; break;
      case "y": return  {row: 4, col: 2}; break;
      case "z": return  {row: 5, col: 5}; break;

      // Bad inputs will errors to the console
      case "k": console.error("'k' does not exist in the dictonary"); break;
      case " ": console.error("Spacebar does not exist in the dictonary"); break;
      default: console.error("Invalid input");
    }
  }

/**
 * Translates plain text to an array of * and spaces.
 * @param  {string} string  Plain text to be translated
 * @return {string}         Array of * and spaces that represents the tap code
 */
  text2Code(string)
  {
    let charArray = "";

    // Formats the original string to replace the spaces and "k" as required.
    // Uses regex expressions in order to select all instances.
    let stringAfterFormat = string.toLowerCase();
    stringAfterFormat = string.replace(/k/g, "qc");
    stringAfterFormat = stringAfterFormat.replace(/\s/g, "wuw");

    // Scans through every letter
    for(var character of stringAfterFormat)
    {
      // Look it up in the code table
      let char = CodeProcessor.char2Code(character);

      // Print out groups of * based on rows and columns.
      for(let i = 0; i < char.row; i++)
        charArray += "*";

      charArray += " ";

      for(var i = 0; i < char.col; i++)
        charArray += "*";

      charArray += " ";
    }

    return charArray;
  }

}