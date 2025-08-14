export function initCopyEmail(email = "you@example.com") {
  const btn = document.getElementById("copyEmail");
  const note = document.getElementById("copied");
  if (!btn || !note) return;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      note.textContent = "Email copied.";
    } catch {
      note.textContent = email;
    }
    setTimeout(() => (note.textContent = ""), 1600);
  });
}
