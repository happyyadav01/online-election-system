document.addEventListener('DOMContentLoaded', function() {
    // Track voters who have already voted
    const votedVoters = new Set();

    // Handle login button click
    document.getElementById('loginButton').addEventListener('click', function() {
        const voterID = document.getElementById('voterID').value.trim();
        const voterPassword = document.getElementById('voterPassword').value.trim();

        if (voterID && voterPassword) {
            // Simulate a successful login
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('electionForm').style.display = 'block';
            document.getElementById('voterName').value = `Voter ${voterID}`;
            // Reset candidate info and results
            document.getElementById('candidateInfo').style.display = 'none';
            document.getElementById('resultList').innerHTML = '';
            document.getElementById('totalVotes').innerText = '0';
            document.getElementById('votesFor1').innerText = '0';
            document.getElementById('votesFor2').innerText = '0';
            document.getElementById('votesFor3').innerText = '0';
        } else {
            alert('Please enter your Voter ID and Password');
        }
    });

    // Handle forgot password link
    document.getElementById('forgotPasswordLink').addEventListener('click', function() {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('forgotPasswordSection').style.display = 'block';
    });

    // Handle back to login from forgot password
    document.getElementById('backToLogin').addEventListener('click', function() {
        document.getElementById('forgotPasswordSection').style.display = 'none';
        document.getElementById('loginSection').style.display = 'block';
    });

    // Handle password reset button
    document.getElementById('resetPasswordButton').addEventListener('click', function() {
        const email = document.getElementById('email').value.trim();
        if (email) {
            alert('Password reset link has been sent to your email.');
            document.getElementById('forgotPasswordSection').style.display = 'none';
            document.getElementById('loginSection').style.display = 'block';
        } else {
            alert('Please enter your email.');
        }
    });

    // Handle registration button
    document.getElementById('registerButton').addEventListener('click', function() {
        const newVoterID = document.getElementById('newVoterID').value.trim();
        const newVoterPassword = document.getElementById('newVoterPassword').value.trim();
        const newVoterName = document.getElementById('newVoterName').value.trim();

        if (newVoterID && newVoterPassword && newVoterName) {
            alert('Registration successful!');
            document.getElementById('registrationSection').style.display = 'none';
            document.getElementById('loginSection').style.display = 'block';
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Handle voting form submission
    document.getElementById('electionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const voterName = document.getElementById('voterName').value;
        const candidate = document.getElementById('candidate').value;

        if (votedVoters.has(voterName)) {
            alert('You have already voted. You cannot vote again.');
            return;
        }

        const confirmation = confirm('Are you sure you want to vote for this candidate?');
        if (confirmation) {
            const resultList = document.getElementById('resultList');
            const totalVotesElement = document.getElementById('totalVotes');
            const votesFor1Element = document.getElementById('votesFor1');
            const votesFor2Element = document.getElementById('votesFor2');
            const votesFor3Element = document.getElementById('votesFor3');

            // Add vote to the results list
            const newResult = document.createElement('li');
            newResult.textContent = `${voterName} voted for ${candidate}`;
            resultList.appendChild(newResult);

            // Update vote counts
            const currentTotalVotes = parseInt(totalVotesElement.innerText);
            totalVotesElement.innerText = currentTotalVotes + 1;

            if (candidate === 'Candidate 1') {
                votesFor1Element.innerText = parseInt(votesFor1Element.innerText) + 1;
            } else if (candidate === 'Candidate 2') {
                votesFor2Element.innerText = parseInt(votesFor2Element.innerText) + 1;
            } else if (candidate === 'Candidate 3') {
                votesFor3Element.innerText = parseInt(votesFor3Element.innerText) + 1;
            }

            alert('Your vote has been submitted!');
            votedVoters.add(voterName); // Mark this voter as having voted
        }
    });

    // Example candidate info
    const candidateDetails = {
        'Candidate 1': 'Candidate 1 is known for their work in environmental sustainability.',
        'Candidate 2': 'Candidate 2 is a seasoned politician with a focus on education reform.',
        'Candidate 3': 'Candidate 3 has a background in technology and innovation.'
    };

    document.getElementById('candidate').addEventListener('change', function() {
        const selectedCandidate = this.value;
        const candidateInfoDiv = document.getElementById('candidateInfo');
        const candidateDetailsP = document.getElementById('candidateDetails');

        candidateDetailsP.innerHTML = `<p>${candidateDetails[selectedCandidate]}</p>`;
        candidateInfoDiv.style.display = 'block';
    });

    // Example election timer (1 minute countdown)
    function updateTimer() {
        const endTime = new Date().getTime() + 60000; // 1 minute from now
        const timerElement = document.getElementById('timer');

        function refreshTimer() {
            const now = new Date().getTime();
            const distance = endTime - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timerElement.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (distance < 0) {
                clearInterval(interval);
                timerElement.innerText = '00:00:00';
                alert('The election period has ended.');
            }
        }

        const interval = setInterval(refreshTimer, 1000);
        refreshTimer(); // Initial call
    }

    updateTimer();
});
