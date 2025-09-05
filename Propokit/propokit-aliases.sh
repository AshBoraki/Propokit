# PropoKit Development Aliases
# Add these to your ~/.zshrc or ~/.bashrc file

# Quick version check for PropoKit
alias propokit-version="cd /Users/ashb/Desktop/Propokit && ./check-version-rules.sh"

# PropoKit commit helper
propokit-commit() {
    cd /Users/ashb/Desktop/Propokit
    echo "🔍 Running version rules check..."
    ./check-version-rules.sh
    echo ""
    echo "📝 Ready to commit? Run:"
    echo "git add ."
    echo "git commit -m \"[Version X.Y.Z] Your description\""
}

# PropoKit full workflow
propokit-push() {
    cd /Users/ashb/Desktop/Propokit
    echo "🔍 Checking version rules..."
    ./check-version-rules.sh
    echo ""
    read -p "Continue with git add, commit, and push? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        echo "📝 Enter your commit message (following [Version X.Y.Z] format):"
        read commit_msg
        git commit -m "$commit_msg"
        git push
        echo "✅ Changes pushed successfully!"
    else
        echo "❌ Cancelled"
    fi
}
