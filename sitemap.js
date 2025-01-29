// Initialize Salesforce Interactions with consent management
SalesforceInteractions.init({
    cookieDomain: 'web-course-ecomerce-site.vercel.app',
    consents: new Promise((resolve) => {
        const optInButton = document.getElementById('opt-in');
        const optOutButton = document.getElementById('opt-out');

        if (optInButton) {
            optInButton.addEventListener('click', () => {
                console.log('User opted in');
                resolve([{
                    provider: 'Test Provider',
                    purpose: 'Tracking',
                    status: SalesforceInteractions.ConsentStatus.OptIn,
                }]);
                saveConsentToStorage({ status: SalesforceInteractions.ConsentStatus.OptIn });
            }, { once: true });
        }

        if (optOutButton) {
            optOutButton.addEventListener('click', () => {
                console.log('User opted out');
                resolve([{
                    provider: 'Test Provider',
                    purpose: 'Tracking',
                    status: SalesforceInteractions.ConsentStatus.OptOut,
                }]);
                saveConsentToStorage({ status: SalesforceInteractions.ConsentStatus.OptOut });
            }, { once: true });
        }
    }),
});

// Track product clicks and send data to Salesforce Interactions
const productDivs = document.querySelectorAll('.pro');
productDivs.forEach(productDiv => {
    productDiv.addEventListener('click', async () => {
        const consent = getConsentFromStorage();
        if (!consent || consent.status !== SalesforceInteractions.ConsentStatus.OptIn) {
            console.log('User has not opted in, not tracking interaction');
            return;
        }

        const productId = productDiv.id;
        const productDescription = productDiv.querySelector('.des span').textContent;
        const productTitle = productDiv.querySelector('.des h5').textContent;
        const productPrice = productDiv.querySelector('.des h4').textContent;
        console.log('User clicked on product:', {
            productId,
            productDescription,
            productTitle,
            productPrice,
        });

        try {
            const engagementResult = await SalesforceInteractions.sendEvent({
                interaction: {
                    name: "View Catalog Object",
                    catalogObject: {
                        type: "Product",
                        id: productId,
                        attributes: {
                            description: productDescription,
                            title: productTitle,
                            price: productPrice,
                        },
                    },
                },
            });

            console.log("Engagement Data Captured:", JSON.stringify(engagementResult));
        } catch (e) {
            console.error("Error capturing engagement data:", e);
        }
    });
});

// Consent Management with localStorage
function saveConsentToStorage(consentData) {
    console.log('Saving consent to localStorage:', consentData);
    localStorage.setItem('userConsent', JSON.stringify(consentData));
}

function getConsentFromStorage() {
    const consentData = localStorage.getItem('userConsent');
    console.log('Retrieving consent from localStorage:', consentData);
    return consentData ? JSON.parse(consentData) : null;
}

// Profile Data Handling (Login and Register)
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

async function captureProfileData(userDetails) {
    console.log('Preparing to capture profile data:', userDetails);
    const { email, firstName } = userDetails;

    try {
        const profileResult = await SalesforceInteractions.sendEvent({
            user: {
                attributes: {
                    email: email,
                    firstName: firstName || '',
                },
            },
        });

        console.log("Profile Data Captured:", JSON.stringify(profileResult));
    } catch (e) {
        console.error("Error capturing profile data:", e);
    }
}

// Handle login form submission
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        console.log('Login form submitted with email:', email);
        captureProfileData({ email });
    });
}

// Handle register form submission
if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('register-email').value;
        const firstName = document.getElementById('username').value;
        console.log('Register form submitted with details:', { email, firstName });
        captureProfileData({ email, firstName });
    });
}