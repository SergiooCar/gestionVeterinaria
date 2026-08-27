import api from "./api";

export const turnoService = {
  getAll(start, end) {
    const params = {};
    if (start) params.start = start;
    if (end) params.end = end;
    return api.get("/turnos", { params });
  },
  getById(id) {
    return api.get(`/turnos/${id}`);
  },
  save(data) {
    return api.post("/turnos/crear", data);
  },
  confirmar(id) {
    return api.post(`/turnos/${id}/confirmar`);
  },
  delete(id) {
    return api.delete(`/turnos/borrar/${id}`);
  },
  getTiposAtencion() {
    return api.get("/tipo-atenciones");
  },
  saveTipoAtencion(data) {
    return api.post("/tipo-atenciones/crear", data);
  },
  updateTipoAtencion(id, data) {
    return api.put(`/tipo-atenciones/editar/${id}`, data);
  },
  deleteTipoAtencion(id) {
    return api.delete(`/tipo-atenciones/borrar/${id}`);
  }
};
