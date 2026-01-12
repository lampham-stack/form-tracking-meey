// Get URL parameters for tracking
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name) || 'direct';
}

// Get group from URL (e.g., ?group=group1)
const groupSource = getURLParameter('group');
console.log('Group Source:', groupSource);

// State management
let currentStep = 1;
let selectedNeed = ''; // 'MUA' or 'BÁN'

// DOM elements
const form = document.getElementById('surveyForm');
const successMessage = document.getElementById('successMessage');

// Step 1 elements
const step1 = document.getElementById('step1');
const choiceBtns = document.querySelectorAll('.choice-btn');

// Step 2 elements
const step2 = document.getElementById('step2');
const prevBtn2 = document.getElementById('prevBtn2');
const nextBtn2 = document.getElementById('nextBtn2');
const channelsCheckboxes = document.querySelectorAll('input[name="channels"]');
const channelsError = document.getElementById('channelsError');

// Step 3 elements
const step3Mua = document.getElementById('step3Mua');
const step3Ban = document.getElementById('step3Ban');
const prevBtn3Mua = document.getElementById('prevBtn3Mua');
const prevBtn3Ban = document.getElementById('prevBtn3Ban');
const concernsMuaCheckboxes = document.querySelectorAll('input[name="concernsMua"]');
const concernsBanCheckboxes = document.querySelectorAll('input[name="concernsBan"]');
const concernsErrorMua = document.getElementById('concernsErrorMua');
const concernsErrorBan = document.getElementById('concernsErrorBan');

// Step indicators
const stepIndicator1 = document.getElementById('stepIndicator1');
const stepIndicator2 = document.getElementById('stepIndicator2');
const stepIndicator3 = document.getElementById('stepIndicator3');

// Step 1: Choice buttons (MUA/BÁN)
choiceBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove selected class from all buttons
        choiceBtns.forEach(b => b.classList.remove('selected'));

        // Add selected class to clicked button
        this.classList.add('selected');

        // Store selection
        selectedNeed = this.dataset.value;

        // Auto-advance to next step after short delay
        setTimeout(() => {
            goToStep(2);
        }, 300);
    });
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
    goToStep(3);
});

// Step 2: Previous button
prevBtn2.addEventListener('click', function () {
    goToStep(1);
});

// Step 3: Concerns validation (MUA)
concernsMuaCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const checkedCount = document.querySelectorAll('input[name="concernsMua"]:checked').length;
        if (checkedCount > 3) {
            this.checked = false;
            concernsErrorMua.style.display = 'block';
            setTimeout(() => {
                concernsErrorMua.style.display = 'none';
            }, 3000);
        }
    });
});

// Step 3: Concerns validation (BÁN)
concernsBanCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const checkedCount = document.querySelectorAll('input[name="concernsBan"]:checked').length;
        if (checkedCount > 3) {
            this.checked = false;
            concernsErrorBan.style.display = 'block';
            setTimeout(() => {
                concernsErrorBan.style.display = 'none';
            }, 3000);
        }
    });
});

// Step 3: Previous buttons
prevBtn3Mua.addEventListener('click', function () {
    goToStep(2);
});

prevBtn3Ban.addEventListener('click', function () {
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
    if (stepNumber === 1) {
        step1.classList.add('active');
        stepIndicator1.classList.add('active');
        currentStep = 1;
    } else if (stepNumber === 2) {
        step2.classList.add('active');
        stepIndicator1.classList.add('completed');
        stepIndicator2.classList.add('active');
        currentStep = 2;
    } else if (stepNumber === 3) {
        // Show MUA or BÁN version based on selection
        if (selectedNeed === 'MUA') {
            step3Mua.classList.add('active');
        } else {
            step3Ban.classList.add('active');
        }
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
    let concernsValues = '';
    if (selectedNeed === 'MUA') {
        const selectedConcerns = document.querySelectorAll('input[name="concernsMua"]:checked');
        if (selectedConcerns.length === 0) {
            alert('Vui lòng chọn ít nhất 1 vấn đề quan tâm');
            return;
        }
        if (selectedConcerns.length > 3) {
            alert('Vui lòng chọn tối đa 3 vấn đề quan tâm');
            return;
        }
        concernsValues = Array.from(selectedConcerns).map(cb => cb.value).join(', ');
    } else {
        const selectedConcerns = document.querySelectorAll('input[name="concernsBan"]:checked');
        if (selectedConcerns.length === 0) {
            alert('Vui lòng chọn ít nhất 1 vấn đề quan tâm');
            return;
        }
        if (selectedConcerns.length > 3) {
            alert('Vui lòng chọn tối đa 3 vấn đề quan tâm');
            return;
        }
        concernsValues = Array.from(selectedConcerns).map(cb => cb.value).join(', ');
    }

    // Collect channels
    const selectedChannels = document.querySelectorAll('input[name="channels"]:checked');
    const channelsValues = Array.from(selectedChannels).map(cb => cb.value).join(', ');

    // Prepare form data
    const formData = {
        timestamp: new Date().toISOString(),
        group: groupSource,
        need: selectedNeed,
        channels: channelsValues,
        concerns: concernsValues
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
    // TODO: Replace with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwVWaUD4838JEhV7IHTbhQ2RyhZ67r-OGCQ0n5OIr-kLMU85XKfut0AtUi89KmAQjKoLA/exec';

    // For demo purposes, we'll just log to console
    console.log('Form Data:', data);
    console.log('---');
    console.log('Group:', data.group);
    console.log('Nhu cầu:', data.need);
    console.log('Kênh:', data.channels);
    console.log('Vấn đề quan tâm:', data.concerns);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Uncomment this when you have your Google Apps Script URL
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

