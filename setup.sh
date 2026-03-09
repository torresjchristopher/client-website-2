#!/usr/bin/env bash
# Quick setup script - run this to get started!

echo "🎨 Artist Store Setup"
echo "===================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install from https://nodejs.org"
    exit 1
fi
echo "✅ Node.js $(node -v)"

# Check Python
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Python not found. Please install from https://www.python.org"
    exit 1
fi
echo "✅ Python installed"

echo ""
echo "📝 Next steps:"
echo "1. Create a Firebase project: https://console.firebase.google.com"
echo "2. Create a Stripe account: https://stripe.com"
echo "3. Fill in your API keys:"
echo "   - Edit .env.local with Firebase credentials"
echo "   - Edit backend/.env with Stripe keys"
echo ""
echo "4. Start the backend:"
echo "   cd backend"
echo "   python -m venv venv"
echo "   source venv/bin/activate  # or venv\\Scripts\\activate on Windows"
echo "   pip install -r requirements.txt"
echo "   python app.py"
echo ""
echo "5. In a new terminal, start the frontend:"
echo "   npm run dev"
echo ""
echo "6. Visit http://localhost:3000"
echo ""
echo "📚 Read QUICK_START.md for detailed instructions"
echo "📖 Read BUILD_SUMMARY.md for what was built"
echo "🔧 Read COMPONENTS.md for technical documentation"
