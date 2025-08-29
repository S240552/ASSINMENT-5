  let coins = 100;
        let heartCount = 0;
        let copyCount = 0;

        // UI Element references
        const heartCountEl = document.getElementById('heart-count');
        const coinBalanceEl = document.getElementById('coin-balance');
        const copyCountEl = document.getElementById('copy-count');
        const serviceCardsContainer = document.getElementById('service-cards-container');
        const callHistoryList = document.getElementById('call-history-list');
        const clearHistoryBtn = document.getElementById('clear-history-btn');
        const messageBoxContainer = document.getElementById('message-box-container');
        const messageBoxTitle = document.getElementById('message-box-title');
        const messageBoxText = document.getElementById('message-box-text');
        const messageBoxCloseBtn = document.getElementById('message-box-close');

        // =================================================================
        // Data for Service Cards
        // =================================================================
        const services = [
            {
                name: "National Emergency Number",
                name_en: "National Emergency",
                number: "999",
                category: "All",
                iconSrc: "/new-assin/assets/emergency.png",
                color: "bg-blue-500"
            },
            {
                name: "Police Helpline Number",
                name_en: "Police",
                number: "999",
                category: "Police",
                iconSrc: "/new-assin/assets/police.png",
                color: "bg-blue-500"
            },
            {
                name: "Fire Service Number",
                name_en: "Fire Service",
                number: "999",
                category: "Fire",
                iconSrc: "/new-assin/assets/fire-service.png",
                color: "bg-blue-500"
            },
            {
                name: "Ambulance Service",
                name_en: "Ambulance",
                number: "1994-999999",
                category: "Health",
                iconSrc: "/new-assin/assets/ambulance.png",
                color: "bg-blue-500"
            },
            {
                name: "Women & Child Helpline",
                name_en: "Women & Child Helpline",
                number: "109",
                category: "Help",
                iconSrc: "/new-assin/assets/emergency.png",
                color: "bg-blue-500"
            },
            {
                name: "Anti-Corruption Helpline",
                name_en: "Anti-Corruption",
                number: "106",
                category: "Govt",
                iconSrc: "/new-assin/assets/emergency.png",
                color: "bg-blue-500"
            },
            {
                name: "Electricity Helpline",
                name_en: "Electricity Outage",
                number: "16216",
                category: "Electricity",
                iconSrc: "/new-assin/assets/emergency.png",
                color: "bg-blue-500"
            },
            {
                name: "Brac Helpline",
                name_en: "Brac",
                number: "16445",
                category: "NGO",
                iconSrc: "/new-assin/assets/emergency.png",
                color: "bg-blue-500"
            },
            {
                name: "Bangladesh Railway Helpline ",
                name_en: "Bangladesh Railway",
                number: "163",
                category: "Travel",
                iconSrc: "/new-assin/assets/emergency.png",
                color: "bg-blue-500"
            }
        ];

        // =================================================================
        // Helper Functions for UI and Logic
        // =================================================================
        
        // Function to update the coin balance display
        const updateCoinBalance = () => {
            coinBalanceEl.textContent = coins;
        };

        // Function to update the heart count display
        const updateHeartCount = () => {
            heartCountEl.textContent = heartCount;
        };

        // Function to update the copy count display
        const updateCopyCount = () => {
            copyCountEl.textContent = copyCount;
        };

        // Function to show the custom message box
        const showMessageBox = (title, message) => {
            messageBoxTitle.textContent = title;
            messageBoxText.textContent = message;
            messageBoxContainer.classList.remove('scale-95', 'opacity-0', 'pointer-events-none');
        };

        // Function to hide the custom message box
        const hideMessageBox = () => {
            messageBoxContainer.classList.add('scale-95', 'opacity-0', 'pointer-events-none');
        };
        
        // Function to format the current date and time
        const getCurrentTime = () => {
            const now = new Date();
            const options = { 
                hour: 'numeric', 
                minute: 'numeric', 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
            };
            return now.toLocaleDateString('en-US', options);
        };

        // Function to add a new entry to the call history
        const addCallToHistory = (serviceName, serviceNumber) => {
            const time = getCurrentTime();
            const historyItem = document.createElement('li');
            historyItem.className = "flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm";
            historyItem.innerHTML = `
                <div>
                    <span class="font-bold text-gray-800">${serviceName}</span>
                    <span class="text-sm text-gray-500 block">📞 ${serviceNumber}</span>
                </div>
                <div class="text-right text-xs text-gray-400">
                    <p>Called at:</p>
                    <p>${time}</p>
                </div>
            `;
            callHistoryList.prepend(historyItem); // Add to the top of the list
        };

        // =================================================================
        // Main Logic and Event Listeners
        // =================================================================

        // Generate and insert service cards into the DOM
        const generateCards = () => {
            services.forEach((service, index) => {
                const card = document.createElement('div');
                card.className = "bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between";
                card.innerHTML = `
                    <div class="flex items-start justify-between">
                        <div class="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${service.color} bg-opacity-10">
                            <img src="${service.iconSrc}" alt="${service.name} icon" class="w-8 h-8">
                        </div>
                        <button class="heart-icon-btn btn-ghost btn-circle text-gray-400 hover:text-pink-500 transition-colors">
                            <i class="fa-regular fa-heart"></i>
                        </button>
                    </div>
                    
                    <div class="mt-4">
                        <h4 class="text-lg font-bold text-gray-800">${service.name}</h4>
                        <p class="text-sm text-gray-500">${service.name_en}</p>
                        <p class="text-xl font-bold text-gray-700 mt-2">${service.number}</p>
                        <span class="badge badge-outline badge-sm mt-2">${service.category}</span>
                    </div>

                    <div class="mt-6 flex gap-3">
                        <!-- Swapped positions and updated class for the Copy button -->
                        <button class="copy-button btn btn-sm rounded-full bg-white text-[#5c5c5c] flex-grow border border-gray-300 hover:bg-gray-100" 
                                data-service-number="${service.number}">
                            <i class="fa-solid fa-copy"></i> Copy
                        </button>
                        <!-- Swapped positions and updated class for the Call button -->
                        <button class="call-button btn btn-sm rounded-full bg-[#00a63e] text-white flex-grow" 
                                data-service-name="${service.name}" 
                                data-service-number="${service.number}">
                            <i class="fa-solid fa-phone"></i> Call
                        </button>
                    </div>
                `;
                serviceCardsContainer.appendChild(card);
            });

            // Attach listeners to all newly created buttons
            attachButtonListeners();
        };

        // Attach event listeners to all buttons on the cards
        const attachButtonListeners = () => {
            // Heart button functionality
            document.querySelectorAll('.heart-icon-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    heartCount++;
                    updateHeartCount();
                    btn.querySelector('i').classList.remove('fa-regular');
                    btn.querySelector('i').classList.add('fa-solid');
                    btn.classList.add('text-pink-500');
                });
            });

            // Call button functionality
            document.querySelectorAll('.call-button').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (coins < 20) {
                        showMessageBox("Insufficient Coins!", "You need at least 20 coins to make a call.");
                        return;
                    }
                    
                    coins -= 20;
                    updateCoinBalance();

                    const serviceName = btn.dataset.serviceName;
                    const serviceNumber = btn.dataset.serviceNumber;

                    showMessageBox("Emergency-service-notify-app says", `Calling ${serviceName} at ${serviceNumber}.`);
                    addCallToHistory(serviceName, serviceNumber);
                });
            });

            // Copy button functionality
            document.querySelectorAll('.copy-button').forEach(btn => {
                btn.addEventListener('click', () => {
                    const numberToCopy = btn.dataset.serviceNumber;
                    
                    try {
                        const tempInput = document.createElement("textarea");
                        tempInput.value = numberToCopy;
                        document.body.appendChild(tempInput);
                        tempInput.select();
                        document.execCommand('copy');
                        document.body.removeChild(tempInput);

                        copyCount++;
                        updateCopyCount();
                        showMessageBox("Emergency-service-notify-app says Copied!", `Number ${numberToCopy} has been copied to your clipboard.`);
                    } catch (err) {
                        showMessageBox("Error!", "Could not copy number. Please try again.");
                        console.error('Failed to copy text:', err);
                    }
                });
            });
        };

        // Clear history button functionality
        clearHistoryBtn.addEventListener('click', () => {
            callHistoryList.innerHTML = '';
            showMessageBox("History Cleared!", "Your call history has been successfully cleared.");
        });

        // Event listener to close the message box
        messageBoxCloseBtn.addEventListener('click', hideMessageBox);

        // Initial app setup
        generateCards();
        updateCoinBalance();
        updateHeartCount();
        updateCopyCount();