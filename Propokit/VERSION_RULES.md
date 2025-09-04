# PropoKit Version Management Rules

## 📋 VERSION FORMAT
Use Semantic Versioning: X.Y.Z
- **X** = Major version (breaking changes)
- **Y** = Minor version (new features)  
- **Z** = Patch version (bug fixes)

## 🔄 UPDATE PROCESS

### 1. Before Each Commit:
- Update version number in `Propokit/js/shared/version-manager.js`
- Update `VERSION_HISTORY` array with changes
- Update `CURRENT_VERSION` constant

### 2. Commit Message Format:
```
[Version X.Y.Z] Brief description of changes

- Change 1
- Change 2
- Change 3
```

### 3. Examples:
```
[Version 1.0.1] Fix header dark mode styling

- Enable proper color changes when switching themes
- Add dark mode styles for all header elements
- Fix logo and button visibility in dark mode
```

```
[Version 1.1.0] Add version management system

- Add version display in bottom left corner
- Create version manager JavaScript module
- Add version tracking and history
```

## 📝 VERSION HISTORY TEMPLATE
```javascript
{
    version: "X.Y.Z",
    date: "YYYY-MM-DD",
    changes: [
        "Change 1",
        "Change 2",
        "Change 3"
    ]
}
```

## 🚀 RELEASE TYPES

### Patch (Z) - Bug Fixes
- Fix typos
- Fix styling issues
- Fix minor bugs
- Performance improvements

### Minor (Y) - New Features
- Add new features
- Add new pages
- Add new functionality
- Non-breaking changes

### Major (X) - Breaking Changes
- Breaking API changes
- Major UI redesigns
- Database schema changes
- Incompatible changes

## ✅ CHECKLIST
- [ ] Updated `CURRENT_VERSION` in version-manager.js
- [ ] Added entry to `VERSION_HISTORY`
- [ ] Used proper commit message format
- [ ] Tested the version display
- [ ] Committed and pushed to git
