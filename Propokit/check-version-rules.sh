#!/bin/bash

# PropoKit Version Rules Reminder
# Run this script before making commits to ensure you follow the rules

echo "📋 PROPOKIT VERSION RULES REMINDER"
echo "=================================="
echo ""

# Display current version
if [ -f "Propokit/js/shared/version-manager.js" ]; then
    CURRENT_VERSION=$(grep -o 'const CURRENT_VERSION = "[^"]*"' Propokit/js/shared/version-manager.js | cut -d'"' -f2)
    echo "🔢 Current Version: $CURRENT_VERSION"
else
    echo "❌ version-manager.js not found!"
fi

echo ""
echo "📝 BEFORE EACH COMMIT, YOU MUST:"
echo "1. Update CURRENT_VERSION in Propokit/js/shared/version-manager.js"
echo "2. Add new entry to VERSION_HISTORY array"
echo "3. Use proper commit message format:"
echo ""
echo "   [Version X.Y.Z] Brief description"
echo ""
echo "   - Change 1"
echo "   - Change 2"
echo "   - Change 3"
echo ""
echo "📊 VERSION TYPES:"
echo "• Patch (Z): Bug fixes, styling issues, minor improvements"
echo "• Minor (Y): New features, new pages, non-breaking changes"
echo "• Major (X): Breaking changes, major redesigns"
echo ""
echo "📖 Full rules available in: Propokit/VERSION_RULES.md"
echo ""
echo "✅ Checklist:"
echo "□ Updated CURRENT_VERSION"
echo "□ Added VERSION_HISTORY entry"
echo "□ Used proper commit message format"
echo "□ Tested changes"
echo "□ Ready to commit"
