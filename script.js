document.getElementById('submitBtn').addEventListener('click', function () {
    const name = document.getElementById('nameInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');

    // normalized variations
    const targets = ['parmin', 'parmin farahani'];
    // simple fuzzy match: substring or small edit distance
    let isMatch = false;
    for (let t of targets) {
        if (name.includes(t) || similarity(name, t) > 0.8) {
            isMatch = true;
            break;
        }
    }

    if (isMatch) {
        resultDiv.textContent = "you ma bish, grow a dih🥀";
    } else {
        resultDiv.textContent = "youre gay";
    }
});

// quick ratio-based string similarity
function similarity(a, b) {
    let longer = a.length > b.length ? a : b;
    let shorter = a.length > b.length ? b : a;
    let longerLength = longer.length;
    if (longerLength === 0) return 1.0;
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}
