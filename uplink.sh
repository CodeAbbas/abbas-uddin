#!/bin/bash

# --- THEME COLORS ---
CYAN='\033[0,36m'
RED='\033[0,31m'
GREEN='\033[0,32m'
NC='\033[0m' 

echo -e "${CYAN}🚀 Initializing Unified Uplink...${NC}"

# Check for changes
if [ -z "$(git status --porcelain)" ]; then 
    echo -e "${RED}❌ No changes detected. Terminal idle.${NC}"
    exit 1
fi

# Stage and Commit
echo -e "${CYAN}📦 Staging transmissions...${NC}"
git add .
echo -e "${CYAN}📝 Opening editor for commit...${NC}"
git commit

# Push
echo -e "${CYAN}🛰️  Pushing to GitHub...${NC}"
git push origin main

# --- NEW: POST-DEPLOYMENT STATUS CHECK ---
echo -e "${CYAN}📡 Waiting for Render to sync (10s)...${NC}"
sleep 10

echo -e "${CYAN}🔍 Pinging Server: https://abbas-chat-server.onrender.com ${NC}"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://abbas-chat-server.onrender.com)

if [ "$STATUS" -eq 200 ]; then
    echo -e "${GREEN}✅ Uplink Verified. Server is AWAKE (HTTP 200).${NC}"
else
    echo -e "${RED}⚠️  Server returned status $STATUS. It might still be booting up.${NC}"
fi

echo -e "${CYAN}✨ Deployment Sequence Complete.${NC}"