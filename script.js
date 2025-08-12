document.getElementById("year").textContent = new Date().getFullYear();

const email = "you@example.com";
const btn = document.getElementById("copyEmail");
const note = document.getElementById("copied");
btn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    note.textContent = "Email copied to clipboard.";
    setTimeout(()=> note.textContent = "", 1800);
  } catch {
    note.textContent = email;
  }
});
