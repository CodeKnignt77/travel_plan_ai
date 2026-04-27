<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Vagabond AI - Smart Itinerary Builder ⚡

Vagabond AI is a world-class travel companion that leverages Gemini's multi-modal intelligence to curate perfectly tailored travel experiences. From Kyoto's hidden temples to Paris's secret bistros, Vagabond AI helps you plan, visualize, and track your adventures with ease.

## 🌟 Key Features

- **🚀 AI-Powered Itinerary Generation**: Bespoke travel plans tailored to your origin, destination, duration, budget, and interests using Gemini-3-Flash.
- **🖼️ Multi-Modal Visualization**: High-quality AI-generated images of your destinations to inspire your journey using Gemini-2.5-Flash-Image.
- **🌐 Real-Time Information**: Stay updated with current weather and upcoming major events for your destination via real-time grounding.
- **💰 Smart Expense Tracker**: Keep your travel budget in check with an integrated expense tracker and real-time AI-powered currency conversion.
- **📊 Interactive Dashboard**: Browse through your past explorations and saved itineraries in a beautiful glassmorphism interface.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **AI Intelligence**: [Google Gemini API](https://ai.google.dev/gemini-api) (`gemini-3-flash-preview` and `gemini-2.5-flash-image`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom Glassmorphism effects
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Language**: [TypeScript 5.8](https://www.typescriptlang.org/)

## ⚡ Performance & Optimization

Vagabond AI follows the **Bolt** philosophy: speed is a feature.

- **Parallel AI Execution**: We use `Promise.all` to execute itinerary generation and destination image creation concurrently, reducing total critical path latency by up to 50%.
- **Efficient Data Handling**: Large AI responses are handled with custom JSON repair logic to ensure reliability even under token limit constraints.
- **Memoized Analytics**: Expense tracking and budget visualizations are memoized to ensure a stutter-free experience during data entry.

## 🚀 Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/)

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd vagabond-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 🔑 Obtaining a Gemini API Key

To use Vagabond AI, you'll need an API key from Google AI Studio:

1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click on **"Get API key"** in the sidebar.
4. Click **"Create API key in new project"**.
5. Copy the generated key and add it to your `.env.local` file.

## 🌐 View in AI Studio

You can also view and interact with the app directly in AI Studio:
[Vagabond AI on AI Studio](https://ai.studio/apps/drive/1bnXRRvvwB_br_T4PxKKvaqFnY0k8cbuw)
