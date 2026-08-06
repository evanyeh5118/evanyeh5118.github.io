EXPECTED_USER="evanyeh5118"; ACTUAL_USER="$(gh api user --jq '.login')" && \
git remote get-url origin | grep -qE '^https://github\.com/' && \
[ "$ACTUAL_USER" = "$EXPECTED_USER" ] && \
gh auth setup-git >/dev/null && \
git push origin HEAD || {
  echo "PUSH ABORTED: expected '$EXPECTED_USER', active account is '${ACTUAL_USER:-unknown}', or origin is not HTTPS GitHub."
  exit 1
}