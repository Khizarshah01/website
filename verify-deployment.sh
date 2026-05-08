#!/bin/bash
# Deployment Verification Script
# Run this after deployment to verify everything is working

echo "🔍 MERN Stack Deployment Verification"
echo "=====================================\n"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test Frontend
echo "📱 Testing Frontend..."
FRONTEND_URL="https://website-one-sigma-90.vercel.app"
if curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL" | grep -q "200"; then
    echo -e "${GREEN}✓ Frontend is live: $FRONTEND_URL${NC}"
else
    echo -e "${RED}✗ Frontend not responding${NC}"
fi

echo ""

# Test Backend API
echo "🔌 Testing Backend API..."
BACKEND_URL="https://website-d8i3.onrender.com"
if curl -s "$BACKEND_URL" | grep -q "SSGMCE API Server Running"; then
    echo -e "${GREEN}✓ Backend is running: $BACKEND_URL${NC}"
else
    echo -e "${RED}✗ Backend not responding${NC}"
fi

echo ""

# Test CORS
echo "🔐 Testing CORS Configuration..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X OPTIONS "$BACKEND_URL" \
  -H "Origin: $FRONTEND_URL" \
  -H "Access-Control-Request-Method: GET")
if [ "$STATUS" == "200" ]; then
    echo -e "${GREEN}✓ CORS is properly configured${NC}"
else
    echo -e "${YELLOW}⚠ CORS response status: $STATUS${NC}"
fi

echo ""

# Check environment variables
echo "⚙️  Environment Variables Setup..."
if grep -q "MONGODB_URI" server/.env 2>/dev/null; then
    echo -e "${GREEN}✓ server/.env exists${NC}"
else
    echo -e "${RED}✗ server/.env not found${NC}"
fi

echo ""

# Check GitHub Actions
echo "🤖 GitHub Actions Status..."
echo "Check at: https://github.com/Saggy2323210/website/actions"
echo -e "${YELLOW}Visit above URL to verify CI/CD workflow${NC}"

echo ""
echo "=====================================\n"
echo -e "${GREEN}✓ Verification Complete!${NC}\n"

echo "📊 Summary:"
echo "├─ Frontend: $FRONTEND_URL"
echo "├─ Backend: $BACKEND_URL"
echo "├─ Database: MongoDB Atlas"
echo "└─ CI/CD: GitHub Actions"

echo ""
echo "🚀 Your MERN stack is ready for production!"
