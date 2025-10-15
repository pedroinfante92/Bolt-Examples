import { Droplet } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Droplet size={32} className="animate-pulse" />
            <div>
              <h1 className="text-3xl font-bold">AquaBeat</h1>
              <p className="text-blue-100 text-sm">Monitoreo Inteligente de Agua en Barcelona</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Última actualización</p>
            <p className="font-semibold">{new Date().toLocaleTimeString('es-ES')}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
