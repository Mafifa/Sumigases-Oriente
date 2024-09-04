import React, { useState, useEffect } from 'react';
import { Ship, Plus, Minus, Trash2 } from "lucide-react";

const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className, ...props }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  )
});

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
));

const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, { activeTab, setActiveTab })
          : child
      )}
    </div>
  );
};

const TabsList = ({ children }) => (
  <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
    {children}
  </div>
);

const TabsTrigger = ({ children, value, activeTab, setActiveTab }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === value
      ? 'bg-background text-foreground shadow-sm'
      : 'hover:bg-muted hover:text-muted-foreground'
      }`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab }) => (
  activeTab === value ? <div>{children}</div> : null
);

const menuItems = {
  "Entradas": [
    { id: 1, name: "Ceviche de Camarón", price: 12.99 },
    { id: 2, name: "Carpaccio de Pulpo", price: 14.99 },
    { id: 3, name: "Ensalada del Mar", price: 10.99 },
  ],
  "Platos Principales": [
    { id: 4, name: "Paella Marinera", price: 24.99 },
    { id: 5, name: "Filete de Salmón a la Parrilla", price: 22.99 },
    { id: 6, name: "Risotto de Mariscos", price: 20.99 },
  ],
  "Postres": [
    { id: 7, name: "Tarta de Limón", price: 6.99 },
    { id: 8, name: "Mousse de Chocolate", price: 7.99 },
    { id: 9, name: "Helado Artesanal", price: 5.99 },
  ],
};

export default function PedidoPage () {
  const [orderItems, setOrderItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "" });

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sections');
        if (!response.ok) {
          throw new Error('Error fetching sections');
        }
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSections();
  }, []);

  const addToOrder = (item) => {
    const existingItem = orderItems.find((orderItem) => orderItem.id === item.id);
    if (existingItem) {
      setOrderItems(
        orderItems.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromOrder = (itemId) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromOrder(itemId);
    } else {
      setOrderItems(
        orderItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Pedido:", { customerInfo, orderItems, total });
    alert("Pedido enviado con éxito!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-sky-50/30">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-sky-700 text-white">
        <a href="/" className="flex items-center justify-center">
          <Ship className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">El Navegante</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Inicio
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/menu">
            Menú
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/pedido">
            Hacer Pedido
          </a>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:-mt-20 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-8 text-sky-800 text-center">
            Hacer Pedido
          </h1>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-sky-800">Menú</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="Entradas">
                  <TabsList>
                    {Object.keys(menuItems).map((category) => (
                      <TabsTrigger key={category} value={category}>
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {Object.entries(menuItems).map(([category, items]) => (
                    <TabsContent key={category} value={category}>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-sky-800">{item.name}</p>
                              <p className="text-sm text-sky-600">${item.price.toFixed(2)}</p>
                            </div>
                            <Button
                              onClick={() => addToOrder(item)}
                              className="bg-sky-600 hover:bg-sky-700 text-white p-2"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Agregar
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-sky-800">Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  {orderItems.length === 0 ? (
                    <p className="text-sky-600">No hay items en tu pedido aún.</p>
                  ) : (
                    <div className="space-y-4">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sky-800">{item.name}</p>
                            <p className="text-sm text-sky-600">${item.price.toFixed(2)} x {item.quantity}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 rounded-full p-0 bg-sky-100 text-sky-700"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-sky-800">{item.quantity}</span>
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 rounded-full p-0 bg-sky-100 text-sky-700"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => removeFromOrder(item.id)}
                              className="h-8 w-8 rounded-full p-0 bg-red-100 text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-sky-200">
                        <div className="flex justify-between font-bold text-sky-800">
                          <span>Total:</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-sky-800">Información de Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sky-700">Nombre</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        required
                        className="border-sky-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sky-700">Teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        required
                        className="border-sky-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sky-700">Dirección</Label>
                      <Input
                        id="address"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        required
                        className="border-sky-200 focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white p-2"
                      disabled={orderItems.length === 0}
                    >
                      Enviar Pedido
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}