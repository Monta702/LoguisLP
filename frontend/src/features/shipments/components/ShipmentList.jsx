import React, { useState } from "react";
import TrackingForm from "./TrackingForm";
import Swal from "sweetalert2";

export default function ShipmentList({ shipments, onDelete, onUpdate }) {
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [detailShipment, setDetailShipment] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás deshacer esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onDelete(id);
          Swal.fire('Eliminado!', 'El envío ha sido eliminado.', 'success');
        } catch (err) {
          Swal.fire('Error', 'No se pudo eliminar el envío', 'error');
        }
      }
    });
  };

  const handleEditClick = (shipment) => {
    setEditForm({
      id: shipment.id,
      dni_remitente: shipment.dni_remitente,
      dni_destinatario: shipment.dni_destinatario,
      descripcion: shipment.descripcion,
      peso: shipment.peso,
      direccion_destino: { ...shipment.direccion_destino },
    });
  };

  const handleSaveChanges = async () => {
    try {
      await onUpdate(editForm.id, editForm);
      Swal.fire("Éxito", "Envío actualizado correctamente", "success");
      setEditForm(null);
      setDetailShipment(null);
    } catch {
      Swal.fire("Error", "No se pudo actualizar el envío", "error");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h3 className="text-2xl font-semibold text-center mb-4">Lista de Envíos</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">DNI Remitente</th>
              <th className="px-4 py-2 text-left">DNI Destinatario</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {shipments.map((s) => {
              const ultimoEstado =
                s.tracking?.length > 0
                  ? s.tracking[s.tracking.length - 1].estado
                  : "pendiente";
              return (
                <tr key={s.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{s.id}</td>
                  <td className="px-4 py-2">{s.dni_remitente}</td>
                  <td className="px-4 py-2">{s.dni_destinatario}</td>
                  <td className="px-4 py-2">{ultimoEstado.replace("_", " ")}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => setSelectedShipment(s)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Tracking
                    </button>
                    <button
                      onClick={() => setDetailShipment(s)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
                    >
                      ℹ️
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Tracking */}
      {selectedShipment && (
        <div className="bg-gray-50 border border-gray-300 rounded-md p-4 mt-4">
          <h4 className="text-lg font-semibold mb-2">
            Agregar Tracking para envío #{selectedShipment.id}
          </h4>
          <TrackingForm
            shipmentId={selectedShipment.id}
            onCreated={(newTracking) => {
              selectedShipment.tracking = [
                ...(selectedShipment.tracking || []),
                newTracking,
              ];
              setSelectedShipment(null);
            }}
          />
        </div>
      )}

      {/* Modal Detalle / Edit */}
      {detailShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
            <button
              onClick={() => {
                setDetailShipment(null);
                setEditForm(null);
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>

            {!editForm && (
              <>
                <h4 className="text-xl font-semibold mb-4">
                  Detalle Envío #{detailShipment.id}
                </h4>
                <div className="space-y-2">
                  <p><strong>DNI Remitente:</strong> {detailShipment.dni_remitente}</p>
                  <p><strong>DNI Destinatario:</strong> {detailShipment.dni_destinatario}</p>
                  <p><strong>Descripción:</strong> {detailShipment.descripcion}</p>
                  <p><strong>Peso:</strong> {detailShipment.peso} kg</p>
                  <p><strong>Dirección:</strong> {detailShipment.direccion_destino?.calle} {detailShipment.direccion_destino?.numero}, {detailShipment.direccion_destino?.ciudad} - {detailShipment.direccion_destino?.pais}</p>
                  <button
                    onClick={() => handleEditClick(detailShipment)}
                    className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition"
                  >
                    Modificar
                  </button>
                </div>
              </>
            )}

            {editForm && (
              <>
                <h4 className="text-xl font-semibold mb-4">Editar Envío #{editForm.id}</h4>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editForm.dni_remitente}
                    onChange={(e) => setEditForm({...editForm, dni_remitente: e.target.value})}
                    className="w-full border px-2 py-1 rounded"
                    placeholder="DNI Remitente"
                  />
                  <input
                    type="text"
                    value={editForm.dni_destinatario}
                    onChange={(e) => setEditForm({...editForm, dni_destinatario: e.target.value})}
                    className="w-full border px-2 py-1 rounded"
                    placeholder="DNI Destinatario"
                  />
                  <input
                    type="text"
                    value={editForm.descripcion}
                    onChange={(e) => setEditForm({...editForm, descripcion: e.target.value})}
                    className="w-full border px-2 py-1 rounded"
                    placeholder="Descripción"
                  />
                  <input
                    type="number"
                    value={editForm.peso}
                    onChange={(e) => setEditForm({...editForm, peso: e.target.value})}
                    className="w-full border px-2 py-1 rounded"
                    placeholder="Peso"
                  />
                  <input
                    type="text"
                    value={editForm.direccion_destino.calle}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      direccion_destino: {...editForm.direccion_destino, calle: e.target.value}
                    })}
                    className="w-full border px-2 py-1 rounded"
                    placeholder="Calle"
                  />
                  <input
                    type="text"
                    value={editForm.direccion_destino.numero}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      direccion_destino: {...editForm.direccion_destino, numero: e.target.value}
                    })}
                    className="w-full border px-2 py-1 rounded"
                    placeholder="Número"
                  />
                  <input
                    type="text"
                    value={editForm.direccion_destino.ciudad}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      direccion_destino: {...editForm.direccion_destino, ciudad: e.target.value}
                    })}
                    className="w-full border px-2 py-1 rounded"
                    placeholder="Ciudad"
                  />
                  <input
                    type="text"
                    value={editForm.direccion_destino.pais}
                    onChange={(e) => setEditForm({
                      ...editForm,
                      direccion_destino: {...editForm.direccion_destino, pais: e.target.value}
                    })}
                    className="w-full border px-2 py-1 rounded"
                    placeholder="País"
                  />
                  <button
                    onClick={handleSaveChanges}
                    className="mt-4 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition w-full"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
