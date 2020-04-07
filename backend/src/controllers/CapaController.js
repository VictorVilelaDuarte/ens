import bd from '../../config/database';

class CapaController {
  insere(req, res) {
    const { filename: path } = req.file;
    const { galeria } = req.body;
    const final_path = `${process.env.APP_URL}/files-capa/${path}`;
    bd.query(
      `INSERT INTO ens_foto_capa (Capa_Path, Capa_Galeria) values ('${final_path}', '${galeria}')`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar a capa.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Capa alterada com sucesso!',
        });
      }
    );
  }

  altera(req, res) {
    const { id } = req.params;
    const { data, hora, local, equipe, descricao, historico, tipo } = req.body;
    bd.query(
      `UPDATE ens_evento SET Evento_Data='${data}', Evento_Horario='${hora}', Evento_Local='${local}', Evento_TipoID='${tipo}', Evento_EquipeResp='${equipe}', Evento_Descricao='${descricao}', Evento_Historico='${historico}' WHERE Evento_ID='${id}'`,
      (err) => {
        if (err) {
          return res.status(400).json({
            staus: false,
            message: 'Não foi possível salvar o evento.',
          });
        }
        return res.status(200).json({
          status: true,
          message: 'Evento atualizado com sucesso!',
        });
      }
    );
  }
}

export default new CapaController();
