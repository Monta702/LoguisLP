import React, { useState, useEffect } from "react";
import { getAddresses, createAddress } from "../services/AddressService";

export default function ShipmentForm({ onCreate, onClose }) {
  const [form, setForm] = useState({
    dni_remitente: "",
    dni_destinatario: "",
    descripcion: "",
    peso: 0,
    empleado_id: 1,
    direccion_destino_id: 0,
  });

  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    calle: "",
    numero: "",
    ciudad: "",
    provincia: "",
    codigo_postal: "",
    pais: "",
  });
  const [showAddressForm, setShowAddressForm] = useState(false);

  const loadAddresses = async () => {
    const data = await getAddresses();
    setAddresses(data);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAddressChange = (e) => setNewAddress({ ...newAddress, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.direccion_destino_id === 0) {
      alert("Selecciona o crea una dirección primero");
      return;
    }
    onCreate(form);
    setForm({ ...form, dni_remitente: "", dni_destinatario: "", descripcion: "", peso: 0 });
  };

  const handleAddAddress = async () => {
    const created = await createAddress(newAddress);
    setAddresses((prev) => [...prev, created]);
    setForm({ ...form, direccion_destino_id: created.id });
    setNewAddress({ calle: "", numero: "", ciudad: "", provincia: "", codigo_postal: "", pais: "" });
    setShowAddressForm(false);
  };

  return (
    <div className="form-card">
      <h3>Nuevo Envío</h3>
      <form onSubmit={handleSubmit} className="form-grid">
        <input name="dni_remitente" placeholder="DNI Remitente" value={form.dni_remitente} onChange={handleChange} required />
        <input name="dni_destinatario" placeholder="DNI Destinatario" value={form.dni_destinatario} onChange={handleChange} required />
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        <input name="peso" type="number" placeholder="Peso" value={form.peso} onChange={handleChange} />

        <select name="direccion_destino_id" value={form.direccion_destino_id} onChange={handleChange} required>
          <option value={0}>Selecciona una dirección</option>
          {addresses.map((addr) => (
            <option key={addr.id} value={addr.id}>
              {addr.calle} {addr.numero}, {addr.ciudad} - {addr.pais}
            </option>
          ))}
        </select>

        <div className="form-buttons">
          <button type="button" onClick={() => setShowAddressForm(!showAddressForm)} className="secondary-btn">
            {showAddressForm ? "Cancelar Dirección" : "Agregar Dirección"}
          </button>
          <button type="submit" className="primary-btn">Guardar Envío</button>
          <button type="button" onClick={onClose} className="secondary-btn">Cerrar</button>
        </div>
      </form>

      {showAddressForm && (
        <div className="form-card">
          <h4>Nueva Dirección</h4>
          <div className="form-grid">
            <input name="calle" placeholder="Calle" value={newAddress.calle} onChange={handleAddressChange} />
            <input name="numero" placeholder="Número" value={newAddress.numero} onChange={handleAddressChange} />
            <input name="ciudad" placeholder="Ciudad" value={newAddress.ciudad} onChange={handleAddressChange} />
            <input name="provincia" placeholder="Provincia" value={newAddress.provincia} onChange={handleAddressChange} />
            <input name="codigo_postal" placeholder="Código Postal" value={newAddress.codigo_postal} onChange={handleAddressChange} />
            <input name="pais" placeholder="País" value={newAddress.pais} onChange={handleAddressChange} />
            <button type="button" onClick={handleAddAddress} className="primary-btn">Guardar Dirección</button>
          </div>
        </div>
      )}
    </div>
  );
}
