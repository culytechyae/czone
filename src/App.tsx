import { Calculator } from './components/Calculator';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Calculator />
      </main>
      <Footer />
    </div>
  );
}

export default App;