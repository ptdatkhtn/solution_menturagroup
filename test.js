/**
 * README.MD
 * I define the string pattern can be: '?c+def*g'
 * it means that 'c' character includes '?' mark (match any one character)
 * it means that 'def' character includes '+' mark (match more one characters)
 * it means that 'g' character includes '+' mark (match zero or more characters)
 * it is still be right syntax even the string pattern has '\' mark to escape or not
 * if any mark occur more than one time, it is wrong syntax, return 'no match'
 * 
 * HOW TO RUN
 * run the function stringMatchPattern() with 2 params
 * then console log to see the result
 * run the command line: node + `file name`.js
 * example: node test.js
 * I also add some cases can happen to check the result:
 * console.log(stringMatchPattern('abcdef', '?c+def*ef'))
 * console.log(stringMatchPattern('abcdef', '?c+def*f'))
 * console.log(stringMatchPattern('abcdef', '??c+def*'))
 * console.log(stringMatchPattern('abcdef', '?c+def*\gg'))
 * console.log(stringMatchPattern('abcdef', '?cc+def*'))
 * console.log(stringMatchPattern('abcdef', '?c+def*'))
 * console.log(stringMatchPattern('abcdef', '?c+def*g'))
 */

/**
 * function used to evaluate if a string matches a pattern
 * it matches any one character
 * @param str the string used to compare
 * @param pattern the pattern for checking string
 */
const stringMatchPattern = (str, pattern) => {

    // an array to contain a pattern object 
    let tempArr = []

    // trim the pattern and slice the pattern from begining to escape mark if exist
    const lastPattern = pattern.indexOf('\\') !== -1
                            ? pattern.trim().slice(0, pattern.indexOf('\\'))
                            : pattern.trim()

    let match = true

    // if any mark occurs more than 1 time in pattern, return 'no match' because it is wrong syntax 
    if(countOccurences(lastPattern, '?') > 1
        || countOccurences(lastPattern, '+') > 1
        || countOccurences(lastPattern, '*') > 1) {
            return 'no match'
    }

    pushNameAndPostionPatternToArr('questionMark', lastPattern.indexOf('?'), tempArr)
    pushNameAndPostionPatternToArr('plusMark', lastPattern.indexOf('+'), tempArr)
    pushNameAndPostionPatternToArr('multipleMark', lastPattern.indexOf('*'), tempArr)
    
    // sort the array with position to get last index of every marks easier
    tempArr.sort((i,j) => i.position - j.position)
    
    tempArr.some((singlePattern, index) => {
        // check next element exist or not, then get it
        const nextElement = index < tempArr.length && tempArr[index + 1] !== null ? tempArr[index + 1] : null

        // get string pattern of this mark
        const sliceTrimPattern = nextElement != null
                            ? lastPattern.slice(singlePattern.position + 1, nextElement.position) 
                            : lastPattern.slice(singlePattern.position + 1)
        
        switch(singlePattern.name) {
            case 'questionMark':
                match = checkQuestionMark(str, sliceTrimPattern)
                break

            case 'plusMark':
                match = checkPlusMark(str, sliceTrimPattern)
                break
            
            case 'multipleMark':
                match = checkMultipleMark(str, sliceTrimPattern)
                break
        }
        if(!match) {
            return true
        }
    })

    return match ? 'match' : 'no match'
}
/**
 * check function for question mark
 * it matches any one character
 * @param str the string used to compare
 * @param sliceTrimPattern the string is sliced from initial pattern
 */
const checkQuestionMark = (str, sliceTrimPattern) => {
    return sliceTrimPattern.length == 1 && str.includes(sliceTrimPattern) ? true : false
}

/**
 * function check for plus mark
 * it matches one or more characters
 * @param str the string used to compare
 * @param sliceTrimPattern the string is sliced from initial pattern
 */
const checkPlusMark = (str, sliceTrimPattern) => {
    return sliceTrimPattern.length >= 1 && str.includes(sliceTrimPattern) ? true : false
}

/**
 * function check for multiple mark
 * it matches zero or more character
 * @param str the string used to compare
 * @param sliceTrimPattern the string is sliced from initial pattern
 */
const checkMultipleMark = (str, sliceTrimPattern) => {
    return sliceTrimPattern.length == 1 && str.includes(sliceTrimPattern) ? false : true
}

/**
 * function push pattern object
 * it matches zero or more character
 * @param name the name of pattern mark
 * @param position the begining position of this pattern in initial pattern
 * @param arr array to contain pattern objects
 * tempArr = [
 *     {
 *         name: 'questionMark',
 *         position: 6
 *     }
 * ]
 */
const pushNameAndPostionPatternToArr = (name, position, arr) => {
    if(position > -1) {
        arr.push({
            name,
            position
        })
    }
}

/**
 * function check how many times a mark occur in pattern
 * @param string the string pattern
 * @param mark the mark should be checked
 */
const countOccurences = (string, mark) => {
    return string.split(mark).length - 1;
 }
