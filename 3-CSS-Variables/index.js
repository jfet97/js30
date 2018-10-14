const inputs = document.querySelectorAll('.controls input');


function handleUpdate() {
    // this point to the current input
    // this.value -> chosen value
    // this.dataset -> object containing data attributes
    // console.log(this.dataset.sizing);
    // this.name -> value of name attribute

    const suffix = this.dataset.sizing;
    const newValue = suffix ? `${this.value}${suffix}` : `${this.value}`;
    // console.log(newValue);

    // insert the property in <html> style attribute
    // it has greater priority than those declared in :root in the CSS fikle
    // so other elements using them will take updated values
    document.documentElement.style.setProperty(`--${this.name}`, newValue);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));