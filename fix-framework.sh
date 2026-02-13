#!/bin/bash

# ========================================
# Playwright Framework Auto-Fix Script
# ========================================

echo "🔧 Starting framework fixes..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create backup
echo "📦 Creating backup..."
BACKUP_DIR="tests_backup_$(date +%Y%m%d_%H%M%S)"
cp -r tests "$BACKUP_DIR"
echo "✅ Backup created: $BACKUP_DIR"
echo ""

# Fix 1: dataDriven.spec.ts
echo "🔧 Fixing tests/datadriven/dataDriven.spec.ts..."
if [ -f "tests/datadriven/dataDriven.spec.ts" ]; then
    sed -i '' "s|from '../src/fixtures/authFixtures'|from '@fixtures/authFixtures'|g" tests/datadriven/dataDriven.spec.ts
    sed -i '' "s|from '../src/utils/dataReader'|from '@utils/dataReader'|g" tests/datadriven/dataDriven.spec.ts
    sed -i '' "s|from '../src/enums/Enums'|from '@enums/Enums'|g" tests/datadriven/dataDriven.spec.ts
    sed -i '' "s|from '../src/utils/logger'|from '@utils/logger'|g" tests/datadriven/dataDriven.spec.ts
    sed -i '' "s|from '../src/types'|from '@types/index'|g" tests/datadriven/dataDriven.spec.ts
    echo "✅ Fixed dataDriven.spec.ts"
else
    echo "${YELLOW}⚠️  File not found: tests/datadriven/dataDriven.spec.ts${NC}"
fi
echo ""

# Fix 2: week1foundation.spec.ts
echo "🔧 Fixing tests/programs/week1foundation.spec.ts..."
if [ -f "tests/programs/week1foundation.spec.ts" ]; then
    sed -i '' "s|from '../../src/fixtures/authFixtures'|from '@fixtures/authFixtures'|g" tests/programs/week1foundation.spec.ts
    sed -i '' "s|from '../../src/pages/programs/ProgramsPage'|from '@pages/programs/ProgramsPage'|g" tests/programs/week1foundation.spec.ts
    sed -i '' "s|from '../../src/pages/programs/AddProgramPage'|from '@pages/programs/AddProgramPage'|g" tests/programs/week1foundation.spec.ts
    sed -i '' "s|from '../../src/pages/programs/EditProgramPage'|from '@pages/programs/EditProgramPage'|g" tests/programs/week1foundation.spec.ts
    sed -i '' "s|from '../../src/utils/testDataFactory'|from '@utils/factories/ProgramFactory'|g" tests/programs/week1foundation.spec.ts
    sed -i '' "s|from '../../src/utils/TestDataFactory'|from '@utils/factories/ProgramFactory'|g" tests/programs/week1foundation.spec.ts
    sed -i '' 's/TestDataFactory/ProgramFactory/g' tests/programs/week1foundation.spec.ts
    sed -i '' 's/generateProgramData/generateBasicInfo/g' tests/programs/week1foundation.spec.ts
    sed -i '' "s|from '../../src/utils/logger'|from '@utils/logger'|g" tests/programs/week1foundation.spec.ts
    sed -i '' "s|from '../../src/utils/assertions'|from '@utils/assertions'|g" tests/programs/week1foundation.spec.ts
    echo "✅ Fixed week1foundation.spec.ts"
else
    echo "${YELLOW}⚠️  File not found: tests/programs/week1foundation.spec.ts${NC}"
fi
echo ""

# Fix 3: week2positive.spec.ts
echo "🔧 Fixing tests/programs/week2positive.spec.ts..."
if [ -f "tests/programs/week2positive.spec.ts" ]; then
    sed -i '' "s|from '../../src/fixtures/authFixtures'|from '@fixtures/authFixtures'|g" tests/programs/week2positive.spec.ts
    sed -i '' "s|from '../../src/pages/programs/ProgramsPage'|from '@pages/programs/ProgramsPage'|g" tests/programs/week2positive.spec.ts
    sed -i '' "s|from '../../src/pages/programs/AddProgramPage'|from '@pages/programs/AddProgramPage'|g" tests/programs/week2positive.spec.ts
    sed -i '' "s|from '../../src/pages/programs/EditProgramPage'|from '@pages/programs/EditProgramPage'|g" tests/programs/week2positive.spec.ts
    sed -i '' "s|from '../../src/utils/testDataFactory'|from '@utils/factories/ProgramFactory'|g" tests/programs/week2positive.spec.ts
    sed -i '' "s|from '../../src/utils/TestDataFactory'|from '@utils/factories/ProgramFactory'|g" tests/programs/week2positive.spec.ts
    sed -i '' 's/TestDataFactory/ProgramFactory/g' tests/programs/week2positive.spec.ts
    sed -i '' 's/generateProgramData/generateBasicInfo/g' tests/programs/week2positive.spec.ts
    sed -i '' "s|from '../../src/utils/logger'|from '@utils/logger'|g" tests/programs/week2positive.spec.ts
    sed -i '' "s|from '../../src/utils/assertions'|from '@utils/assertions'|g" tests/programs/week2positive.spec.ts
    echo "✅ Fixed week2positive.spec.ts"
else
    echo "${YELLOW}⚠️  File not found: tests/programs/week2positive.spec.ts${NC}"
fi
echo ""

# Fix 4: week3negative.spec.ts
echo "🔧 Fixing tests/programs/week3negative.spec.ts..."
if [ -f "tests/programs/week3negative.spec.ts" ]; then
    sed -i '' "s|from '../../src/fixtures/authFixtures'|from '@fixtures/authFixtures'|g" tests/programs/week3negative.spec.ts
    sed -i '' "s|from '../../src/pages/programs/ProgramsPage'|from '@pages/programs/ProgramsPage'|g" tests/programs/week3negative.spec.ts
    sed -i '' "s|from '../../src/pages/programs/AddProgramPage'|from '@pages/programs/AddProgramPage'|g" tests/programs/week3negative.spec.ts
    sed -i '' "s|from '../../src/utils/testDataFactory'|from '@utils/factories/ProgramFactory'|g" tests/programs/week3negative.spec.ts
    sed -i '' "s|from '../../src/utils/TestDataFactory'|from '@utils/factories/ProgramFactory'|g" tests/programs/week3negative.spec.ts
    sed -i '' 's/TestDataFactory/ProgramFactory/g' tests/programs/week3negative.spec.ts
    sed -i '' 's/generateProgramData/generateBasicInfo/g' tests/programs/week3negative.spec.ts
    sed -i '' "s|from '../../src/utils/logger'|from '@utils/logger'|g" tests/programs/week3negative.spec.ts
    echo "✅ Fixed week3negative.spec.ts"
else
    echo "${YELLOW}⚠️  File not found: tests/programs/week3negative.spec.ts${NC}"
fi
echo ""

# Fix 5: program.spec.ts - Remove and recreate
echo "🔧 Fixing tests/programs/program.spec.ts..."
if [ -f "tests/programs/program.spec.ts" ]; then
    # Check for the syntax error character
    if grep -q "̀" tests/programs/program.spec.ts 2>/dev/null; then
        echo "${RED}⚠️  Found invisible character in program.spec.ts${NC}"
        echo "   Recommend: Delete and use the clean template"
    fi
    
    # Fix imports anyway
    sed -i '' "s|from \"src/fixture/AuthFixtures\"|from '@fixtures/authFixtures'|g" tests/programs/program.spec.ts
    sed -i '' "s|from \"src/fixture/authFixtures\"|from '@fixtures/authFixtures'|g" tests/programs/program.spec.ts
    sed -i '' 's|from "src/fixture/authFixtures"|from "@fixtures/authFixtures"|g' tests/programs/program.spec.ts
    sed -i '' "s|from '@utils/testDataFactory'|from '@utils/factories/ProgramFactory'|g" tests/programs/program.spec.ts
    sed -i '' 's/TestDataFactory/ProgramFactory/g' tests/programs/program.spec.ts
    sed -i '' 's/generateProgramData/generateBasicInfo/g' tests/programs/program.spec.ts
    
    echo "✅ Fixed imports in program.spec.ts"
    echo "${YELLOW}⚠️  If tests still fail, replace with the clean template${NC}"
else
    echo "${YELLOW}⚠️  File not found: tests/programs/program.spec.ts${NC}"
fi
echo ""

# Verification
echo "🔍 Verifying fixes..."
echo ""

# Check for remaining issues
echo "Checking for TestDataFactory references..."
TESTDATA_COUNT=$(grep -r "TestDataFactory" tests/ 2>/dev/null | wc -l | tr -d ' ')
if [ "$TESTDATA_COUNT" -eq "0" ]; then
    echo "${GREEN}✅ No TestDataFactory references found${NC}"
else
    echo "${RED}⚠️  Found $TESTDATA_COUNT TestDataFactory references still present${NC}"
    grep -rn "TestDataFactory" tests/
fi
echo ""

echo "Checking for relative imports going up directories..."
RELATIVE_COUNT=$(grep -r "from '\.\./\.\./src" tests/ 2>/dev/null | wc -l | tr -d ' ')
if [ "$RELATIVE_COUNT" -eq "0" ]; then
    echo "${GREEN}✅ All imports use path aliases${NC}"
else
    echo "${YELLOW}⚠️  Found $RELATIVE_COUNT files still using relative imports${NC}"
    grep -rn "from '\.\./\.\./src" tests/
fi
echo ""

# Summary
echo "================================"
echo "✅ Auto-fix completed!"
echo "================================"
echo ""
echo "📋 Next steps:"
echo "1. Review changes: git diff"
echo "2. Run tests: npm test"
echo "3. If issues remain, check: tests/programs/program.spec.ts"
echo ""
echo "💾 Backup location: $BACKUP_DIR"
echo ""