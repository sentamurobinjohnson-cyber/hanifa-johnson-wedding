
const rsvpForm = document.getElementById('rsvpForm');
const pledgeForm = document.getElementById('pledgeForm');
const rsvpStatus = document.getElementById('rsvpStatus');
const pledgeStatus = document.getElementById('pledgeStatus');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const interacEmail = document.getElementById('interacEmail').textContent;
const amountButtons = document.querySelectorAll('.amount-btn');
const giverAmountInput = document.getElementById('giverAmount');

copyEmailBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(interacEmail);
    copyEmailBtn.textContent = 'Copied';
    setTimeout(() => copyEmailBtn.textContent = 'Copy Email', 1800);
  } catch (err) {
    alert('Could not copy automatically. Please copy this email: ' + interacEmail);
  }
});

amountButtons.forEach(button => {
  button.addEventListener('click', () => {
    amountButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    giverAmountInput.value = button.dataset.amount;
  });
});

rsvpForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(rsvpForm).entries());

  const allRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
  allRsvps.push({
    ...formData,
    submittedAt: new Date().toISOString()
  });
  localStorage.setItem('wedding_rsvps', JSON.stringify(allRsvps));

  rsvpStatus.textContent = 'Thank you. Your RSVP has been saved on this device.';
  rsvpForm.reset();
});

pledgeForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(pledgeForm).entries());

  const allPledges = JSON.parse(localStorage.getItem('wedding_pledges') || '[]');
  allPledges.push({
    ...formData,
    submittedAt: new Date().toISOString()
  });
  localStorage.setItem('wedding_pledges', JSON.stringify(allPledges));

  pledgeStatus.textContent = 'Your pledge has been saved. Please send your Interac e-Transfer to the email above.';
  pledgeForm.reset();
  amountButtons.forEach(btn => btn.classList.remove('active'));
});
