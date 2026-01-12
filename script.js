// Get URL parameters for tracking
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name) || 'direct';
}

// Get group from URL (e.g., ?group=group1)
const groupSource = getURLParameter('group');
console.log('Group Source:', groupSource);

// State management
let currentStep = 0; // Start from intro (step 0)

// DOM elements
const form = document.getElementById('surveyForm');
const successMessage = document.getElementById('successMessage');

// Step indicators
const stepIndicator0 = document.getElementById('stepIndicator0');
const stepIndicator1 = document.getElementById('stepIndicator1');
const stepIndicator2 = document.getElementById('stepIndicator2');
const stepIndicator3 = document.getElementById('stepIndicator3');

// Step 0: Intro
const step0 = document.getElementById('step0');
const startBtn = document.getElementById('startBtn');

// Step 1: Need
const step1 = document.getElementById('step1');
const prevBtn1 = document.getElementById('prevBtn1');
const nextBtn1 = document.getElementById('nextBtn1');
const needOther = document.getElementById('needOther');
const needOtherText = document.getElementById('needOtherText');

// Step 2: Channels
const step2 = document.getElementById('step2');
const prevBtn2 = document.getElementById('prevBtn2');
const nextBtn2 = document.getElementById('nextBtn2');
const channelsCheckboxes = document.querySelectorAll('input[name="channels"]');
const channelsOther = document.getElementById('channelsOther');
const channelsOtherText = document.getElementById('channelsOtherText');
const channelsError = document.getElementById('channelsError');

// Step 3: Concerns
const step3 = document.getElementById('step3');
const prevBtn3 = document.getElementById('prevBtn3');
const concernsCheckboxes = document.querySelectorAll('input[name="concerns"]');
const concernsOther = document.getElementById('concernsOther');
const concernsOtherText = document.getElementById('concernsOtherText');
const concernsError = document.getElementById('concernsError');

// Step 0: Start button
startBtn.addEventListener('click', function () {
    goToStep(1);
});

// Step 1: Need - Show/hide other input
needOther.addEventListener('change', function () {
    needOtherText.style.display = this.checked ? 'block' : 'none';
    if (!this.checked) needOtherText.value = '';
});

// Step 1: Next button
nextBtn1.addEventListener('click', function () {
    const selectedNeed = document.querySelector('input[name="need"]:checked');
    if (!selectedNeed) {
        alert('Vui lòng chọn nhu cầu của bạn');
        return;
    }
    if (selectedNeed.value === 'other' && !needOtherText.value.trim()) {
        alert('Vui lòng ghi rõ nhu cầu khác');
        needOtherText.focus();
        return;
    }
    goToStep(2);
});

// Step 1: Previous button
prevBtn1.addEventListener('click', function () {
    goToStep(0);
});

// Step 2: Channels - Show/hide other input
channelsOther.addEventListener('change', function () {
    channelsOtherText.style.display = this.checked ? 'block' : 'none';
    if (!this.checked) channelsOtherText.value = '';
});

// Step 2: Channels validation
channelsCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const checkedCount = document.querySelectorAll('input[name="channels"]:checked').length;
        if (checkedCount > 2) {
            this.checked = false;
            channelsError.style.display = 'block';
            setTimeout(() => {
                channelsError.style.display = 'none';
            }, 3000);
        }
    });
});

// Step 2: Next button
nextBtn2.addEventListener('click', function () {
    const checkedCount = document.querySelectorAll('input[name="channels"]:checked').length;
    if (checkedCount === 0) {
        alert('Vui lòng chọn ít nhất 1 kênh');
        return;
    }
    if (checkedCount > 2) {
        alert('Vui lòng chọn tối đa 2 kênh');
        return;
    }
    if (channelsOther.checked && !channelsOtherText.value.trim()) {
        alert('Vui lòng ghi rõ kênh khác');
        channelsOtherText.focus();
        return;
    }
    goToStep(3);
});

// Step 2: Previous button
prevBtn2.addEventListener('click', function () {
    goToStep(1);
});

// Step 3: Concerns - Show/hide other input
concernsOther.addEventListener('change', function () {
    concernsOtherText.style.display = this.checked ? 'block' : 'none';
    if (!this.checked) concernsOtherText.value = '';
});

// Step 3: Concerns validation
concernsCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const checkedCount = document.querySelectorAll('input[name="concerns"]:checked').length;
        if (checkedCount > 3) {
            this.checked = false;
            concernsError.style.display = 'block';
            setTimeout(() => {
                concernsError.style.display = 'none';
            }, 3000);
        }
    });
});

// Step 3: Previous button
prevBtn3.addEventListener('click', function () {
    goToStep(2);
});

// Navigation function
function goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(step => {
        step.classList.remove('active');
    });

    // Update step indicators
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active', 'completed');
    });

    // Show appropriate step
    if (stepNumber === 0) {
        step0.classList.add('active');
        stepIndicator0.classList.add('active');
        currentStep = 0;
    } else if (stepNumber === 1) {
        step1.classList.add('active');
        stepIndicator0.classList.add('completed');
        stepIndicator1.classList.add('active');
        currentStep = 1;
    } else if (stepNumber === 2) {
        step2.classList.add('active');
        stepIndicator0.classList.add('completed');
        stepIndicator1.classList.add('completed');
        stepIndicator2.classList.add('active');
        currentStep = 2;
    } else if (stepNumber === 3) {
        step3.classList.add('active');
        stepIndicator0.classList.add('completed');
        stepIndicator1.classList.add('completed');
        stepIndicator2.classList.add('completed');
        stepIndicator3.classList.add('active');
        currentStep = 3;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Form submission
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Validate step 3
    const selectedConcerns = document.querySelectorAll('input[name="concerns"]:checked');
    if (selectedConcerns.length === 0) {
        alert('Vui lòng chọn ít nhất 1 vấn đề quan tâm');
        return;
    }
    if (selectedConcerns.length > 3) {
        alert('Vui lòng chọn tối đa 3 vấn đề quan tâm');
        return;
    }
    if (concernsOther.checked && !concernsOtherText.value.trim()) {
        alert('Vui lòng ghi rõ vấn đề khác');
        concernsOtherText.focus();
        return;
    }

    // Collect need
    const selectedNeed = document.querySelector('input[name="need"]:checked');
    let needValue = selectedNeed.value;
    if (needValue === 'other') {
        needValue = 'Khác: ' + needOtherText.value.trim();
    }

    // Collect channels
    const selectedChannels = Array.from(document.querySelectorAll('input[name="channels"]:checked'));
    const channelsValues = selectedChannels.map(cb => {
        if (cb.value === 'other') {
            return 'Khác: ' + channelsOtherText.value.trim();
        }
        return cb.value;
    }).join(', ');

    // Collect concerns
    const concernsValues = Array.from(selectedConcerns).map(cb => {
        if (cb.value === 'other') {
            return 'Khác: ' + concernsOtherText.value.trim();
        }
        return cb.value;
    }).join(', ');

    // Prepare form data
    const formData = {
        timestamp: new Date().toISOString(),
        need: needValue,
        channels: channelsValues,
        concerns: concernsValues,
        group: groupSource
    };

    // Disable submit button
    const submitBtn = e.submitter;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Đang gửi...';

    try {
        // Send to Google Sheets
        await sendToGoogleSheets(formData);

        // Show success message
        document.querySelector('.form-wrapper form').style.display = 'none';
        successMessage.style.display = 'block';
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Có lỗi xảy ra khi gửi form. Vui lòng thử lại!');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Gửi Khảo Sát ✓';
    }
});

// Function to send data to Google Sheets
async function sendToGoogleSheets(data) {
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwVWaUD4838JEhV7IHTbhQ2RyhZ67r-OGCQ0n5OIr-kLMU85XKfut0AtUi89KmAQjKoLA/exec';

    // Log to console
    console.log('Form Data:', data);
    console.log('---');
    console.log('Nhu cầu:', data.need);
    console.log('Kênh:', data.channels);
    console.log('Vấn đề quan tâm:', data.concerns);
    console.log('Nguồn:', data.group);

    // Send to Google Sheets
    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return true;
}
