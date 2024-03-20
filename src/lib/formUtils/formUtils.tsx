export const currencyFormatter = (value: string) => {
  let num

  if (value.includes('$')) {
    num = parseInt(value.split(' ')[1])

    const currencyOptions = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }

    const formatter = new Intl.NumberFormat('en-US', currencyOptions)

    return formatter.format(num)
  }

  return value
}

export const onlyIntegersInputValidator = () => {
  const myInput = document.querySelectorAll('input[data-value=numericInput]')

  function keyAllowed(key: number) {
    const keys = [8, 9, 13, 16, 17, 18, 19, 20, 27, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 91, 92, 93, 188, 190]
    if (key && keys.indexOf(key) === -1) return false
    else return true
  }

  myInput.forEach(function (element) {
    element.addEventListener(
      'keypress',
      function (e: any) {
        const key = !isNaN(e.charCode) ? e.charCode : e.keyCode
        if (!keyAllowed(key)) e.preventDefault()
      },
      false
    )

    // Disable pasting of non-numbers
    element.addEventListener(
      'paste',
      function (e) {
        // @ts-ignore
        const pasteData = e.clipboardData.getData('text/plain')
        if (pasteData.match(/[^0-9]/)) e.preventDefault()
      },
      false
    )
  })
}
