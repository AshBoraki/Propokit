# PropoKit Version Management System

## 🚀 Quick Start

### Before Every Commit:
1. **Run the version check**: `./check-version-rules.sh`
2. **Update version**: Edit `src/js/version-manager.js`
3. **Commit with proper format**: `[Version X.Y.Z] Description`

## 📋 Available Tools

### 1. Version Rules Checker
```bash
./check-version-rules.sh
```
Shows current version and reminds you of the rules.

### 2. Git Pre-Commit Hook
Automatically checks commit message format before allowing commits.
- Located: `.git/hooks/pre-commit`
- Ensures proper `[Version X.Y.Z]` format

### 3. Shell Aliases (Optional)
Add to your `~/.zshrc` or `~/.bashrc`:
```bash
source /Users/ashb/Desktop/Propokit/scripts/propokit-aliases.sh
```

Then use:
- `propokit-version` - Quick version check
- `propokit-commit` - Interactive commit helper
- `propokit-push` - Full workflow (check → commit → push)

## 📖 Full Documentation
See `docs/VERSION_RULES.md` for complete rules and examples.

## 🔧 How It Works

1. **Version Display**: Shows current version in the app's sidebar
2. **Version History**: Tracks all changes in `VERSION_HISTORY` array
3. **Automatic Checks**: Pre-commit hook prevents invalid commits
4. **Console Logging**: Displays version info in browser console

## ✅ Success Indicators
- Version number increments properly
- Commit messages follow format
- Version displays correctly in app
- No pre-commit hook errors
