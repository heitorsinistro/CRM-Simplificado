import Joi from 'joi';
import { listUsuarios as listFromModel, deleteUsuario as deleteFromModel } from '../models/usuariosModel.js';

export async function listUsuarios() {
  return await listFromModel();
}

export async function deleteUsuario(id) {
  await deleteFromModel(id);
}
