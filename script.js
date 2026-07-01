const display = document.getElementById('display');

// Operators to the display string
function appendValue(input) {
    if (display.value === '0' || display.value === 'Error') {
        display.value = input;
    } else {
        display.value += input;
    }
}

// Clear the entire interface output
function clearDisplay() {
    display.value = '';
}

// Remove the single last string input character (Backspace functionality)
function deleteLast() {
    display.value = display.value.toString().slice(0, -1);
}

// Evaluate arithmetic string securely
function calculateResult() {
    try {
        // Prevent evaluation if the string expression is entirely blank
        if (display.value.trim() === '') return;
        
        // Use Function instead of eval for safer parsing execution context
        let result = new Function(`return ${display.value}`)();
        
        if (result === Infinity || isNaN(result)) {
            display.value = 'Error';
        } else {
            // Keep precision neat for decimal numbers
            display.value = Number(result.toFixed(6)).toString();
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Map real physical laptop Keyboard keypresses directly into validation engine
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        appendValue(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});