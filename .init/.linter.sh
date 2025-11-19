#!/bin/bash
cd /home/kavia/workspace/code-generation/personal-notes-manager-44117-44126/frontend_notes_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

